from rest_framework.viewsets import ModelViewSet
from accounts.models import User
from .models import Category, Lesson
from .serializers import (
    CategorySerializer,
    UserSerializer,
    LessonSerializer,
)
from rest_framework import exceptions


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
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
