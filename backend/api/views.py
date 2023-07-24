from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from accounts.models import User
from .models import Category, Lesson, Question, Choice, History
from .serializers import (
    CategorySerializer,
    UserSerializer,
    LessonSerializer,
    QuestionSerializer,
    ChoiceSerializer,
    HistorySerializer,
)
from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count
from django.shortcuts import get_object_or_404


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

    def get_queryset(self):
        if "is_public" in self.request.query_params:
            is_public = self.request.query_params.get("is_public").lower() == "true"
            lessons = Lesson.objects.annotate(question_count=Count("questions")).filter(
                is_public=is_public, question_count__gt=0
            )
            return lessons
        elif "owned" in self.request.query_params:
            user = self.request.user
            if user.is_authenticated:
                return Lesson.objects.filter(owner=user)
            raise exceptions.AuthenticationFailed()
        else:
            return Lesson.objects.all()


class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    # permission_classes = [IsAuthenticated]

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

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        question_data = request.data
        question_serializer = self.get_serializer(
            instance, data=question_data, partial=True
        )
        question_serializer.is_valid(raise_exception=True)
        question_serializer.save()

        choices_data = question_data.get("choices")
        for choice_data in choices_data:
            try:
                choice_instance = Choice.objects.get(id=choice_data.get("id"))
                choice_serializer = ChoiceSerializer(
                    choice_instance, data=choice_data, partial=True
                )
                if choice_serializer.is_valid():
                    choice_serializer.save()
                else:
                    return Response(
                        choice_serializer.errors, status=status.HTTP_400_BAD_REQUEST
                    )
            except Choice.DoesNotExist:
                return Response(
                    {
                        "error": "Choice with id {} does not exist.".format(
                            choice_data.get("id")
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return Response(question_serializer.data)


class HistoryViewSet(ModelViewSet):
    serializer_class = HistorySerializer

    def get_queryset(self):
        queryset = History.objects.all()

        my_history = self.request.query_params.get("user_id", None)
        lesson_id = self.request.query_params.get("lesson_id", None)

        if my_history is not None and lesson_id is not None:
            user = self.request.user
            return queryset.filter(player=user, lesson__id=lesson_id)
        if lesson_id is not None:
            return queryset.filter(lesson__id=lesson_id)

        return queryset
