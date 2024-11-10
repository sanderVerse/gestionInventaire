from django.contrib import admin
from .models import Gestion


class GestionAdmin(admin.ModelAdmin):
    list_display=('Nom_du_produit', 'description_du_produit', 'Type_de_produit', 'Quantite_en_stock', 'Seuil_minimun_en_stock')


admin.site.register(Gestion, GestionAdmin)

# Register your models here.
