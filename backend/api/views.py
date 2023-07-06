from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from accounts.models import User
from .models import Category, Quiz, Question, Choice, ScoreRecord
from .serializers import (
    CategorySerializer,
    QuizSerializer,
    UserSerializer,
    QuestionSerializer,
    ChoiceSerializer,
    ScoreRecordSerializer,
    QuizScoreRecordSerializer,
)
from rest_framework import status
from rest_framework.response import Response


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class QuizViewSet(ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

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
