from .models import Audio
from rest_framework import serializers

class AudioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Audio
        fields = ['name', 'path', 'form']