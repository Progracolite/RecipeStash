from django.shortcuts import render
from rest_framework import viewsets, generics, permissions
from django.contrib.auth.models import User
from .models import Recipe
from .serializers import RecipeSerializer, RegisterSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class RecipeViewSet(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer
    permission_classes = (permissions.IsAuthenticated,)

    # Scope queryset strictly to logged-in user
    def get_queryset(self):
        return Recipe.objects.filter(owner=self.request.user).order_by('-created_at')

    # Automatically attach owner on creation
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
# Create your views here.
