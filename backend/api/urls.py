from rest_framework.routers import DefaultRouter

from .views import UserViewSet, LessonViewSet, QuestionViewSet, ChoiceViewSet


router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"lessons", LessonViewSet, basename="lesson")
router.register(r"questions", QuestionViewSet, basename="question")
router.register(r"choices", QuestionViewSet, basename="choice")

urlpatterns = router.urls
