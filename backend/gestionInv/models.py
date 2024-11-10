from django.db import models


# Create your models here.

class Gestion(models.Model):
    Nom_du_produit = models.CharField(max_length=120)
    description_du_produit = models.TextField()
    Type_de_produit = models.CharField(max_length=50)
    Quantite_en_stock = models.IntegerField()
    Seuil_minimun_en_stock = models.IntegerField()

    def _str_(self):
        return self.Nom_du_produit