from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from accounts.models import User
from .models import Category, Lesson, Question
from .serializers import (
    CategorySerializer,
    UserSerializer,
    LessonSerializer,
    QuestionSerializer,
    ChoiceSerializer,
)
from rest_framework.response import Response
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


class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def create(self, request, *args, **kwargs):
        question_data = request.data
        question_serializer = QuestionSerializer(data=question_data)
        if question_serializer.is_valid():
            question_serializer.save()
            question = Question.objects.get(id=question_serializer.data["id"])
            for choice_data in request.data["choices"]:
                choice_data["question"] = question.id
                choice_serializer = ChoiceSerializer(data=choice_data)
                if choice_serializer.is_valid():
                    choice_serializer.save()
                else:
                    return Response(
                        choice_serializer.errors, status=status.HTTP_400_BAD_REQUEST
                    )
            return Response(question_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                question_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
