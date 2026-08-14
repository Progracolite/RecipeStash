from django.db import models
from django.contrib.auth.models import User

class Recipe(models.Model):
    title = models.CharField(max_length=255)
    source_url = models.URLField(blank=True, null=True)
    ingredients_list = models.TextField(help_text="Ingredients for this recipe")
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes')

    def __str__(self):
        return f"{self.title} ({self.owner.username})"
