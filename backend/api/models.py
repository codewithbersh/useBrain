import uuid
from django.db import models
from accounts.models import User
from django.utils import timezone


class Category(models.Model):
    name = models.CharField(max_length=24)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class Lesson(models.Model):
    CATEGORY_CHOICES = [
        ("General Knowledge", "General Knowledge"),
        ("Sports", "Sports"),
        ("Science", "Science"),
        ("Others", "Others"),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="lessons")
    category = models.CharField(
        max_length=128, choices=CATEGORY_CHOICES, default="Others"
    )
    title = models.CharField(max_length=128)
    is_public = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return self.title


class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lesson = models.ForeignKey(
        Lesson,
        on_delete=models.CASCADE,
        related_name="questions",
    )
    question_text = models.CharField(max_length=128)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question_text

    class Meta:
        ordering = ["-created"]


class Choice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.ForeignKey(
        Question, related_name="choices", on_delete=models.CASCADE
    )
    choice_text = models.CharField(max_length=256)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.choice_text


class History(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    player = models.ForeignKey(User, related_name="history", on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, related_name="history", on_delete=models.CASCADE)
    total_questions = models.PositiveSmallIntegerField()
    total_correct_answers = models.PositiveSmallIntegerField()
    date_played = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.player}: {self.total_questions}/{self.total_correct_answers}"

    class Meta:
        ordering = ["total_correct_answers"]
