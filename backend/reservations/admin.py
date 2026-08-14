from django.contrib import admin

from .models import Reservation


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = (
        "donation",
        "ngo",
        "status",
        "reserved_at",
    )

    list_filter = (
        "status",
    )

    search_fields = (
        "donation__food_name",
        "ngo__email",
    )

    ordering = (
        "-reserved_at",
    )