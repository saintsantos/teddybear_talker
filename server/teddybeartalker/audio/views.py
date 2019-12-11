from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AudioSerializer
from .models import Audio
# Create your views here.

class AudioViewSet(viewsets.ModelViewSet):
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer
