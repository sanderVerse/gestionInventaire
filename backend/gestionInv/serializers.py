from rest_framework import serializers
from .models import Gestion


class Gestionserializer(serializers.ModelSerializer):
    class Meta:
        model = Gestion
        fields = ('id', 'Nom_du_produit', 'description_du_produit', 'Type_de_produit', 'Quantite_en_stock', 'Seuil_minimun_en_stock')