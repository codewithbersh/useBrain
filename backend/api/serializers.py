from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from accounts.models import User
from .models import Category, Quiz, Question, Choice, ScoreRecord


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "nickname"]


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


class ScoreRecordSerializer(ModelSerializer):
    player_verified = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=False
    )
    notes = serializers.SerializerMethodField()
    percentage = serializers.IntegerField(read_only=True)

    class Meta:
        model = ScoreRecord
        fields = "__all__"

    def get_notes(self, obj):
        total_questions = obj.quiz.questions.count()
        return f"{obj.score} out of {total_questions}"

    def validate(self, data):
        player_verified = data.get("player_verified")
        player_unverified = data.get("player_unverified")

        if player_verified is None and not player_unverified:
            raise serializers.ValidationError(
                {"player_unverified": "Nickname is required when player is unverified."}
            )

        return data


class QuizScoreRecordSerializer(ModelSerializer):
    player_verified = UserSerializer()

    class Meta:
        model = ScoreRecord
        fields = "__all__"
        depth = 1
