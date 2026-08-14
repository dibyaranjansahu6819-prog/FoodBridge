from rest_framework import serializers

from donations.models import Donation
from .models import Reservation


class ReservationDonationSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = Donation

        fields = (
            "id",
            "food_name",
            "description",
            "food_type",
            "food_category",
            "quantity",
            "servings",
            "pickup_start_time",
            "expiry_time",
            "pickup_address",
            "contact_number",
            "notes",
            "image",
            "status",
        )

        read_only_fields = fields


class ReservationSerializer(
    serializers.ModelSerializer
):
    donation = ReservationDonationSerializer(
        read_only=True
    )

    donation_id = serializers.PrimaryKeyRelatedField(
        source="donation",
        queryset=Donation.objects.all(),
        write_only=True,
    )

    class Meta:
        model = Reservation

        fields = (
            "id",
            "donation",
            "donation_id",
            "ngo",
            "status",
            "reserved_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "donation",
            "ngo",
            "status",
            "reserved_at",
            "updated_at",
        )

    def validate_donation_id(self, donation):
        request = self.context["request"]

        # -----------------------------------------
        # DONATION MUST BE AVAILABLE
        # -----------------------------------------

        if donation.status != Donation.Status.AVAILABLE:
            raise serializers.ValidationError(
                "This donation is not available."
            )

        # -----------------------------------------
        # DONOR CANNOT RESERVE OWN DONATION
        # -----------------------------------------

        if donation.donor == request.user:
            raise serializers.ValidationError(
                "You cannot reserve your own donation."
            )

        # -----------------------------------------
        # CHECK EXISTING RESERVATION
        # -----------------------------------------

        existing_reservation = getattr(
            donation,
            "reservation",
            None,
        )

        if existing_reservation is not None:

            # A cancelled reservation does NOT
            # block the donation from being
            # reserved again.
            if (
                existing_reservation.status
                != Reservation.Status.CANCELLED
            ):
                raise serializers.ValidationError(
                    "This donation is already reserved."
                )

        return donation