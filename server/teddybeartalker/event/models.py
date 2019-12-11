from django.db import models
from audio.models import Audio

# Create your models here.

class Event(models.Model):
    time = models.TimeField()
    voice = models.ForeignKey(Audio, blank=True, null=True, on_delete=models.SET_NULL, related_name="voice")
    music = models.ForeignKey(Audio, blank=True, null=True, on_delete=models.SET_NULL, related_name="music")
    day = models.IntegerField(
        choices=[
            (0, "Monday"),
            (1, "Tuesday"),
            (2,"Wednesday"),
            (3, "Thursday"),
            (4, "Friday"),
            (5, "Saturday"),
            (6, "Sunday")
        ])

class Active(models.Model):
    event_id = models.ForeignKey(Event, blank=True, null=True, on_delete=models.SET_NULL)
