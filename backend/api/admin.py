from django.contrib import admin
from .models import Category, Quiz, Question, Choice, ScoreRecord, Lesson


admin.site.register(Category)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Choice)
admin.site.register(ScoreRecord)

# ----

admin.site.register(Lesson)
