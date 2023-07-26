from django.contrib import admin
from .models import Lesson, Question, Choice, History


# ----

admin.site.register(Lesson)
admin.site.register(Question)
admin.site.register(Choice)
admin.site.register(History)
