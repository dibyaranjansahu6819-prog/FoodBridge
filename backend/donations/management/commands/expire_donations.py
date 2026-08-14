from django.core.management.base import BaseCommand
from django.utils import timezone

from donations.models import Donation


class Command(BaseCommand):
    help = "Mark expired donations."

    def handle(self, *args, **options):
        expired = Donation.objects.filter(
            status=Donation.Status.AVAILABLE,
            expiry_time__lt=timezone.now(),
        )

        count = expired.update(
            status=Donation.Status.EXPIRED
        )

        self.stdout.write(
            self.style.SUCCESS(
                f"{count} donation(s) marked as EXPIRED."
            )
        )