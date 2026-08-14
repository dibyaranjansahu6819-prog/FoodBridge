from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from accounts.permissions import IsDonor, IsNGO
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from .models import Donation
from .serializers import DonationSerializer
from rest_framework import status
from rest_framework.response import Response
from core.responses import success_response
from rest_framework.decorators import action
from django.db.models import Count



class DonationViewSet(viewsets.ModelViewSet):
    serializer_class = DonationSerializer
    permission_classes = [IsAuthenticated, IsDonor]
    parser_classes = [
        JSONParser,
        MultiPartParser,
        FormParser,
    ]
    filter_backends = [SearchFilter]
    
    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]
    search_fields = [
        "food_name",
        "description",
        "pickup_address",
    ]
    filterset_fields = [
        "food_type",
        "food_category",
        "status",
        ]
    ordering_fields = [
        "created_at",
        "expiry_time",
        "food_name",
        ]
    ordering = [
        "-created_at",
    ]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return Donation.objects.none()

        return Donation.objects.filter(
             donor=self.request.user
        ).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(
            donor=self.request.user
        )
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)

        return success_response(
            data=serializer.data,
            message="Donation created successfully.",
            status_code=status.HTTP_201_CREATED,
        )
    @action(detail=False, methods=["get"])
    def dashboard(self, request):
        queryset = self.get_queryset()

        data = {
        "total": queryset.count(),
        "available": queryset.filter(status="AVAILABLE").count(),
        "reserved": queryset.filter(status="RESERVED").count(),
        "completed": queryset.filter(status="COMPLETED").count(),
        }

        return Response(data)
    
class NGODonationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = DonationSerializer
    permission_classes = [IsAuthenticated, IsNGO]

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    search_fields = [
        "food_name",
        "description",
        "pickup_address",
    ]

    filterset_fields = [
        "food_type",
        "food_category",
        "status",
    ]

    ordering_fields = [
        "created_at",
        "expiry_time",
        "food_name",
    ]

    ordering = [
        "-created_at",
    ]

    def get_queryset(self):
        return Donation.objects.filter(
            status=Donation.Status.AVAILABLE
        ).order_by("-created_at")