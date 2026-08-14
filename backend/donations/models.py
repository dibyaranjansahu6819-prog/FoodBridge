from django.conf import settings
from django.db import models


class Donation(models.Model):

    class Status(models.TextChoices):
        AVAILABLE = "AVAILABLE", "Available"
        RESERVED = "RESERVED", "Reserved"
        COMPLETED = "COMPLETED", "Completed"
        EXPIRED = "EXPIRED", "Expired"

    class FoodType(models.TextChoices):
        VEG = "VEG", "Vegetarian"
        NON_VEG = "NON_VEG", "Non-Vegetarian"
        VEGAN = "VEGAN", "Vegan"
        OTHER = "OTHER", "Other"

    class FoodCategory(models.TextChoices):
        COOKED = "COOKED", "Cooked Food"
        PACKAGED = "PACKAGED", "Packaged Food"
        BAKERY = "BAKERY", "Bakery"
        FRUITS = "FRUITS", "Fruits & Vegetables"
        OTHER = "OTHER", "Other"

    donor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="donations",
    )

    food_name = models.CharField(max_length=200)
    description = models.TextField()

    food_type = models.CharField(
        max_length=20,
        choices=FoodType.choices,
        default=FoodType.VEG,
    )

    food_category = models.CharField(
        max_length=20,
        choices=FoodCategory.choices,
        default=FoodCategory.COOKED,
    )

    quantity = models.CharField(max_length=100)
    servings = models.PositiveIntegerField()

    pickup_start_time = models.DateTimeField()
    expiry_time = models.DateTimeField()

    pickup_address = models.TextField()
    contact_number = models.CharField(max_length=15)

    notes = models.TextField(blank=True)

    image = models.ImageField(
        upload_to="donations/",
        blank=True,
        null=True,
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.AVAILABLE,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.food_name} - {self.donor.email}"