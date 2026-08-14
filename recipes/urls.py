from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecipeViewSet, RegisterView

router = DefaultRouter()
router.register(r'recipes', RecipeViewSet, basename='recipe')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('', include(router.urls)),
]