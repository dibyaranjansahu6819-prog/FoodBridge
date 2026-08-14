from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User
from donations.models import Donation


class DonationAPITest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="donor@test.com",
            password="Test@12345",
            full_name="Test Donor",
            role="DONOR",
        )

    def test_login(self):
        url = reverse("token_obtain_pair")

        response = self.client.post(
            url,
            {
                "email": "donor@test.com",
                "password": "Test@12345",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_create_donation(self):
        login_url = reverse("token_obtain_pair")

        login_response = self.client.post(
            login_url,
            {
                "email": "donor@test.com",
                "password": "Test@12345",
            },
            format="json",
        )

        access = login_response.data["access"]

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {access}"
        )

        url = reverse("donation-list")

        response = self.client.post(
            url,
            {
                "food_name": "Veg Biryani",
                "description": "Fresh food",
                "food_type": "VEG",
                "food_category": "COOKED",
                "quantity": "20 Meals",
                "servings": 20,
                "pickup_start_time": "2026-08-06T18:00:00Z",
                "expiry_time": "2026-08-06T21:00:00Z",
                "pickup_address": "Bhubaneswar",
                "contact_number": "9876543210",
                "notes": "Handle carefully",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        self.assertEqual(
            Donation.objects.count(),
            1,
        )

        self.assertEqual(
            Donation.objects.first().food_name,
            "Veg Biryani",
        )