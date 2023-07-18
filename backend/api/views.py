from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from accounts.models import User
from .models import Category, Quiz, Question, Choice, ScoreRecord, Lesson
from .serializers import (
    CategorySerializer,
    QuizSerializer,
    UserSerializer,
    QuestionSerializer,
    ChoiceSerializer,
    ScoreRecordSerializer,
    QuizScoreRecordSerializer,
    LessonSerializer,
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter
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


class QuizViewSet(ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class LandingPageQuizViewSet(ModelViewSet):
    serializer_class = QuizSerializer
    filter_backends = [OrderingFilter]
    ordering_fields = ["times_played", "created"]

    def get_queryset(self):
        return Quiz.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        limit = 4
        limited_queryset = queryset[:limit]

        serializer = self.get_serializer(limited_queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.code:
            request_code = request.query_params.get("code")
            if not request_code or request_code != instance.code:
                return Response(
                    {"detail": "Invalid code."}, status=status.HTTP_403_FORBIDDEN
                )

        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class ChoicesViewSet(ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer

    def create(self, request, *args, **kwargs):
        is_many = isinstance(request.data, list)
        if not is_many:
            return super().create(request, *args, **kwargs)

        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class QuestionChoicesViewSet(ReadOnlyModelViewSet):
    serializer_class = ChoiceSerializer

    def get_queryset(self):
        question_id = self.kwargs["question_id"]
        question = Question.objects.get(id=question_id)
        return Choice.objects.filter(question=question)


class ScoreRecordViewSet(ModelViewSet):
    queryset = ScoreRecord.objects.all()
    serializer_class = ScoreRecordSerializer


class QuizScoreRecordsViewSet(ReadOnlyModelViewSet):
    serializer_class = QuizScoreRecordSerializer

    def get_queryset(self):
        quiz_id = self.kwargs["quiz_id"]
        quiz = Quiz.objects.get(id=quiz_id)
        return ScoreRecord.objects.filter(quiz=quiz)


class QuizQuestionsViewSet(ReadOnlyModelViewSet):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        quiz_id = self.kwargs["quiz_id"]
        quiz = Quiz.objects.get(id=quiz_id)
        return quiz.questions.order_by("?")


# ----


class LessonViewSet(ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
