from django.db import transaction

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from accounts.permissions import IsDonor, IsNGO
from donations.models import Donation

from .models import Reservation
from .serializers import ReservationSerializer


class ReservationViewSet(viewsets.ModelViewSet):

    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    # =========================================================
    # PERMISSIONS
    # =========================================================

    def get_permissions(self):

        if self.action == "create":
            return [
                IsAuthenticated(),
                IsNGO(),
            ]

        if self.action in [
            "confirm",
            "reject",
        ]:
            return [
                IsAuthenticated(),
                IsDonor(),
            ]

        if self.action in [
            "cancel",
            "complete",
        ]:
            return [
                IsAuthenticated(),
                IsNGO(),
            ]

        return [
            IsAuthenticated()
        ]

    # =========================================================
    # QUERYSET
    # =========================================================

    def get_queryset(self):

        if getattr(
            self,
            "swagger_fake_view",
            False,
        ):
            return Reservation.objects.none()

        user = self.request.user

        # -----------------------------------------------------
        # DONOR
        # -----------------------------------------------------

        if getattr(
            user,
            "role",
            None,
        ) == "DONOR":

            return (
                Reservation.objects
                .filter(
                    donation__donor=user
                )
                .select_related(
                    "donation",
                    "ngo",
                )
                .order_by(
                    "-reserved_at"
                )
            )

        # -----------------------------------------------------
        # NGO
        # -----------------------------------------------------

        if getattr(
            user,
            "role",
            None,
        ) == "NGO":

            return (
                Reservation.objects
                .filter(
                    ngo=user
                )
                .select_related(
                    "donation",
                    "ngo",
                )
                .order_by(
                    "-reserved_at"
                )
            )

        return Reservation.objects.none()

    # =========================================================
    # CREATE / RE-RESERVE
    # NGO ONLY
    # =========================================================

    @transaction.atomic
    def perform_create(self, serializer):

        donation = serializer.validated_data["donation"]

        # -----------------------------------------------------
        # CHECK WHETHER A RESERVATION ALREADY EXISTS
        # -----------------------------------------------------

        try:
            reservation = donation.reservation
        except Reservation.DoesNotExist:

            reservation = None

        # -----------------------------------------------------
        # CASE 1:
        # NO OLD RESERVATION
        # -----------------------------------------------------

        if reservation is None:

            reservation = serializer.save(
                ngo=self.request.user
            )

        # -----------------------------------------------------
        # CASE 2:
        # OLD RESERVATION WAS CANCELLED
        #
        # REUSE THE SAME ROW
        # -----------------------------------------------------

        elif (
            reservation.status
            == Reservation.Status.CANCELLED
        ):

            reservation.ngo = self.request.user
            reservation.status = (
                Reservation.Status.PENDING
            )

            reservation.save(
                update_fields=[
                    "ngo",
                    "status",
                    "updated_at",
                ]
            )

        # -----------------------------------------------------
        # CASE 3:
        # ACTIVE RESERVATION
        #
        # This should normally be caught by the serializer,
        # but keep this protection here too.
        # -----------------------------------------------------

        else:

            raise ValueError(
                "This donation already has an active reservation."
            )

        # -----------------------------------------------------
        # DONATION BECOMES RESERVED
        # -----------------------------------------------------

        donation.status = (
            Donation.Status.RESERVED
        )

        donation.save(
            update_fields=[
                "status"
            ]
        )

        return reservation

    # =========================================================
    # CONFIRM
    # DONOR ONLY
    # =========================================================

    @action(
        detail=True,
        methods=["post"],
        url_path="confirm",
    )
    @transaction.atomic
    def confirm(
        self,
        request,
        pk=None,
    ):

        reservation = self.get_object()

        # -----------------------------------------------------
        # OWNERSHIP
        # -----------------------------------------------------

        if (
            reservation.donation.donor
            != request.user
        ):
            return Response(
                {
                    "success": False,
                    "message":
                        "You can only confirm reservations for your own donations.",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # -----------------------------------------------------
        # ONLY PENDING CAN BE CONFIRMED
        # -----------------------------------------------------

        if (
            reservation.status
            != Reservation.Status.PENDING
        ):
            return Response(
                {
                    "success": False,
                    "message":
                        "Only pending reservations can be confirmed.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        reservation.status = (
            Reservation.Status.CONFIRMED
        )

        reservation.save(
            update_fields=[
                "status",
                "updated_at",
            ]
        )

        return Response(
            {
                "success": True,
                "message":
                    "Reservation confirmed successfully.",
                "data":
                    ReservationSerializer(
                        reservation,
                        context={
                            "request": request
                        },
                    ).data,
            },
            status=status.HTTP_200_OK,
        )

    # =========================================================
    # REJECT
    # DONOR ONLY
    # =========================================================

    @action(
        detail=True,
        methods=["post"],
        url_path="reject",
    )
    @transaction.atomic
    def reject(
        self,
        request,
        pk=None,
    ):

        reservation = self.get_object()

        # -----------------------------------------------------
        # OWNERSHIP
        # -----------------------------------------------------

        if (
            reservation.donation.donor
            != request.user
        ):
            return Response(
                {
                    "success": False,
                    "message":
                        "You can only reject reservations for your own donations.",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # -----------------------------------------------------
        # ONLY PENDING CAN BE REJECTED
        # -----------------------------------------------------

        if (
            reservation.status
            != Reservation.Status.PENDING
        ):
            return Response(
                {
                    "success": False,
                    "message":
                        "Only pending reservations can be rejected.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        reservation.status = (
            Reservation.Status.CANCELLED
        )

        reservation.save(
            update_fields=[
                "status",
                "updated_at",
            ]
        )

        # -----------------------------------------------------
        # FOOD AVAILABLE AGAIN
        # -----------------------------------------------------

        donation = reservation.donation

        donation.status = (
            Donation.Status.AVAILABLE
        )

        donation.save(
            update_fields=[
                "status"
            ]
        )

        return Response(
            {
                "success": True,
                "message":
                    "Reservation rejected successfully.",
                "data":
                    ReservationSerializer(
                        reservation,
                        context={
                            "request": request
                        },
                    ).data,
            },
            status=status.HTTP_200_OK,
        )

    # =========================================================
    # CANCEL
    # NGO ONLY
    # =========================================================

    @action(
        detail=True,
        methods=["post"],
        url_path="cancel",
    )
    @transaction.atomic
    def cancel(
        self,
        request,
        pk=None,
    ):

        reservation = self.get_object()

        # -----------------------------------------------------
        # ALREADY CANCELLED / COMPLETED
        # -----------------------------------------------------

        if reservation.status in [
            Reservation.Status.CANCELLED,
            Reservation.Status.COMPLETED,
        ]:

            return Response(
                {
                    "success": False,
                    "message":
                        "This reservation cannot be cancelled.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # -----------------------------------------------------
        # CANCEL
        # -----------------------------------------------------

        reservation.status = (
            Reservation.Status.CANCELLED
        )

        reservation.save(
            update_fields=[
                "status",
                "updated_at",
            ]
        )

        # -----------------------------------------------------
        # DONATION AVAILABLE AGAIN
        # -----------------------------------------------------

        donation = reservation.donation

        donation.status = (
            Donation.Status.AVAILABLE
        )

        donation.save(
            update_fields=[
                "status"
            ]
        )

        return Response(
            {
                "success": True,
                "message":
                    "Reservation cancelled successfully.",
            },
            status=status.HTTP_200_OK,
        )

    # =========================================================
    # COMPLETE
    # NGO ONLY
    # =========================================================

    @action(
        detail=True,
        methods=["post"],
        url_path="complete",
    )
    @transaction.atomic
    def complete(
        self,
        request,
        pk=None,
    ):

        reservation = self.get_object()

        # -----------------------------------------------------
        # ONLY CONFIRMED CAN BE COMPLETED
        # -----------------------------------------------------

        if (
            reservation.status
            != Reservation.Status.CONFIRMED
        ):

            return Response(
                {
                    "success": False,
                    "message":
                        "Only confirmed reservations can be completed.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # -----------------------------------------------------
        # COMPLETE RESERVATION
        # -----------------------------------------------------

        reservation.status = (
            Reservation.Status.COMPLETED
        )

        reservation.save(
            update_fields=[
                "status",
                "updated_at",
            ]
        )

        # -----------------------------------------------------
        # COMPLETE DONATION
        # -----------------------------------------------------

        donation = reservation.donation

        donation.status = (
            Donation.Status.COMPLETED
        )

        donation.save(
            update_fields=[
                "status"
            ]
        )

        return Response(
            {
                "success": True,
                "message":
                    "Reservation completed successfully.",
            },
            status=status.HTTP_200_OK,
        )