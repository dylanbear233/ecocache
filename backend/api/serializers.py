from rest_framework import serializers
from .models import Discovery

class DiscoverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Discovery
        fields = ["id", "title", "content", "image", "created_at"]
