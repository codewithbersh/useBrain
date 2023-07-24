from rest_framework.serializers import ModelSerializer, SerializerMethodField
from accounts.models import User
from .models import Category, Lesson, Question, Choice, History


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "nickname"]


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ["name"]


class ChoiceSerializer(ModelSerializer):
    class Meta:
        model = Choice
        fields = "__all__"


class QuestionSerializer(ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = "__all__"


class LessonSerializer(ModelSerializer):
    total_questions = SerializerMethodField()
    total_plays = SerializerMethodField()
    questions = QuestionSerializer(many=True, read_only=True)

    def get_total_questions(self, obj):
        return obj.questions.count()

    def get_total_plays(self, obj):
        return obj.history.count()

    class Meta:
        model = Lesson
        fields = "__all__"


class HistorySerializer(ModelSerializer):
    class Meta:
        model = History
        fields = "__all__"
