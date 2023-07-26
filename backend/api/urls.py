from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import (
    UserViewSet,
    LessonViewSet,
    QuestionViewSet,
    HistoryViewSet,
    MyHistoryViewSet,
    NewHistoryViewSet,
    InitializeBackendViewSet,
)


router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"lessons", LessonViewSet, basename="lesson")
router.register(r"questions", QuestionViewSet, basename="question")
router.register(r"history", HistoryViewSet, basename="history")
router.register(r"my-history", MyHistoryViewSet, basename="my-history")
router.register(r"new-history", NewHistoryViewSet, basename="new-history")

urlpatterns = [
    path("", include(router.urls)),
    path("init/", InitializeBackendViewSet.as_view(), name="init-backend"),
]
