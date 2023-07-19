from rest_framework.viewsets import ModelViewSet
from accounts.models import User
from .models import Category, Lesson
from .serializers import (
    CategorySerializer,
    UserSerializer,
    LessonSerializer,
)
from rest_framework import exceptions
from rest_framework.permissions import IsAuthenticated


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return User.objects.filter(pk=user.id)
        raise exceptions.AuthenticationFailed()


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class LessonViewSet(ModelViewSet):
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if "is_public" in self.request.query_params:
            is_public = self.request.query_params.get("is_public").lower() == "true"
            return Lesson.objects.filter(is_public=is_public)
        elif "owned" in self.request.query_params:
            return Lesson.objects.filter(owner=user)
        else:
            return Lesson.objects.all()
