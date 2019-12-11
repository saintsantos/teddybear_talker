from rest_framework import serializers
from .models import Event, Active

class ActiveSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Active
        fields = ['event_id']

class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ['time', 'voice', 'music', 'day']