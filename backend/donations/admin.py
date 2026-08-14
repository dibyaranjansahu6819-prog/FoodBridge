from django.contrib import admin

from .models import Donation


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = (
        "food_name",
        "donor",
        "food_type",
        "food_category",
        "status",
        "expiry_time",
        "created_at",
    )

    list_filter = (
        "status",
        "food_type",
        "food_category",
    )

    search_fields = (
        "food_name",
        "pickup_address",
        "donor__email",
    )

    ordering = ("-created_at",)