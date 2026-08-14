from rest_framework import serializers

from .models import Donation
from typing import Optional


class DonationSerializer(serializers.ModelSerializer):
    donor = serializers.StringRelatedField(read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Donation
        fields = "__all__"
        read_only_fields = (
            "id",
            "donor",
            "status",
            "created_at",
            "updated_at",
        )

    def get_image(self, obj) -> Optional[str]:
        request = self.context.get("request")

        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url

        return None