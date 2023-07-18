from django.contrib import admin
from .models import Lesson, Question, Choice


# ----

admin.site.register(Lesson)
admin.site.register(Question)
admin.site.register(Choice)
