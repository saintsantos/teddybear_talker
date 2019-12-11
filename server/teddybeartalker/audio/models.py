from django.db import models

# Create your models here.

class Audio(models.Model):
    name = models.CharField(max_length=100)
    path = models.CharField(max_length=250)
    form = models.BooleanField(default=True)
