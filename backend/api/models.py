import uuid
from django.db import models
from accounts.models import User
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator


class Category(models.Model):
    name = models.CharField(max_length=24)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class Quiz(models.Model):
    DIFFICULTY_CHOICES = [
        ("easy", "Easy"),
        ("medium", "Medium"),
        ("hard", "Hard"),
    ]
    PRIVACY_CHOICES = [
        ("PUB", "public"),
        ("PRI", "private"),
        ("LIN", "link"),
        ("COD", "code"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="quizzes")
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="quizzes"
    )
    title = models.CharField(max_length=128)
    difficulty = models.CharField(max_length=6, choices=DIFFICULTY_CHOICES, default="E")
    privacy = models.CharField(max_length=3, choices=PRIVACY_CHOICES, default="PRI")
    time_limit = models.PositiveIntegerField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    times_played = models.IntegerField(default=0)
    code = models.CharField(max_length=6, null=True, blank=True)

    class Meta:
        verbose_name_plural = "quizzes"

    def __str__(self):
        return self.title


class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="questions")
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="questions")
    question_text = models.CharField(max_length=256)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.question_text


class Choice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="choices"
    )
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="choices")
    choice_text = models.CharField(max_length=256)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.choice_text


class ScoreRecord(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="records")
    player_verified = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="records", null=True, blank=True
    )
    player_unverified = models.CharField(max_length=24, null=True, blank=True)
    score = models.PositiveSmallIntegerField()
    percentage = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    date_played = models.DateTimeField(default=timezone.now)
    notes = models.CharField(max_length=256, blank=True, null=True)

    def save(self, *args, **kwargs):
        total_questions = self.quiz.questions.count()
        if total_questions > 0:
            self.percentage = (self.score / total_questions) * 100
        else:
            self.percentage = 0

        if self.player_verified is not None:
            self.player_unverified = None

        super().save(*args, **kwargs)

    def __str__(self):
        if self.player_verified is not None:
            return (
                f"{self.player_verified.nickname} - {self.score} - {self.date_played}"
            )
        else:
            return f"{self.player_unverified} - {self.score} - {self.date_played}"
