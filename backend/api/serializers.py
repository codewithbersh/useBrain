from rest_framework.serializers import ModelSerializer
from accounts.models import User
from .models import Category, Quiz, Question, Choice
from rest_framework import serializers


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name"]


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ["name"]


class QuizSerializer(ModelSerializer):
    owner = UserSerializer()
    category = CategorySerializer()

    class Meta:
        model = Quiz
        fields = "__all__"
        depth = 1


class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


class ChoiceSerializer(ModelSerializer):
    class Meta:
        model = Choice
        fields = "__all__"

    def create(self, validated_data):
        question = validated_data.get("question")

        if question.choices.count() >= 4:
            raise serializers.ValidationError("A Question can have maximum 4 choices")

        is_correct = validated_data.get("is_correct")
        if is_correct and question.choices.filter(is_correct=True).exists():
            raise serializers.ValidationError(
                "A Question can have only one correct choice"
            )

        return super().create(validated_data)
