from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    DonationViewSet,
    NGODonationViewSet,
)

router = DefaultRouter()

# IMPORTANT:
# Register the specific "ngo" route BEFORE
# the empty donor route.
router.register(
    "ngo",
    NGODonationViewSet,
    basename="ngo-donation",
)

router.register(
    "",
    DonationViewSet,
    basename="donation",
)

urlpatterns = [
    path("", include(router.urls)),
]