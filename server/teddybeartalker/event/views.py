from django.shortcuts import render
from rest_framework import viewsets
from .serializers import EventSerializer, ActiveSerializer
from .models import Event, Active

# Create your views here.

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class ActiveViewSet(viewsets.ModelViewSet):
    queryset = Active.objects.all()
    serializer_class = ActiveSerializer


