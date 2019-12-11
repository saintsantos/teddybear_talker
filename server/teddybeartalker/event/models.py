from django.db import models
from audio.models import Audio

# Create your models here.

class Event(models.Model):
    time = models.TimeField()
    voice = models.ForeignKey(Audio, blank=True, null=True, on_delete=models.SET_NULL, related_name="voice")
    music = models.ForeignKey(Audio, blank=True, null=True, on_delete=models.SET_NULL, related_name="music")
    day = models.CharField(max_length=10)

class Active(models.Model):
    event_id = models.ForeignKey(Event, blank=True, null=True, on_delete=models.SET_NULL)
