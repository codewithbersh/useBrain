from rest_framework.serializers import ModelSerializer, SerializerMethodField
from accounts.models import User
from .models import Category, Lesson


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "nickname"]


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ["name"]


class LessonSerializer(ModelSerializer):
    total_questions = SerializerMethodField()

    def get_total_questions(self, obj):
        return obj.questions.count()

    class Meta:
        model = Lesson
        fields = "__all__"
