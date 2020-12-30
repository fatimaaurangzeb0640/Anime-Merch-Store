from django.contrib import admin
from .models import Item, Cart

class ItemAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}

admin.site.register(Item, ItemAdmin)
admin.site.register(Cart)

