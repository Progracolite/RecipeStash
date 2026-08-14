from django.contrib import admin
from .models import Recipe

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'source_url', 'created_at')
    search_fields = ('title', 'ingredients_list', 'owner__username')
    list_filter = ('created_at', 'owner')
# Register your models here.
