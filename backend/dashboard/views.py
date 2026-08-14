from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from donations.models import Donation


class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        donations = Donation.objects.all()

        return Response({
            "total": donations.count(),
            "available": donations.filter(status="AVAILABLE").count(),
            "reserved": donations.filter(status="RESERVED").count(),
            "completed": donations.filter(status="COMPLETED").count(),
        })