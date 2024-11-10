from django.shortcuts import render
from rest_framework import viewsets
from .serializers import Gestionserializer
from .models import Gestion

# Create your views here.

class Gestionview(viewsets.ModelViewSet):
    serializer_class = Gestionserializer
    queryset = Gestion.objects.all()
