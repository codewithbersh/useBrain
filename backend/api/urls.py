from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet,
    QuizViewSet,
    UserViewSet,
    QuestionViewSet,
    ChoicesViewSet,
    QuestionChoicesViewSet,
    ScoreRecordViewSet,
    QuizScoreRecordsViewSet,
    LandingPageQuizViewSet,
)


router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"quizzes", QuizViewSet, basename="quiz")
router.register(r"landing-page-quizzes", LandingPageQuizViewSet, basename="quiz")
router.register(r"questions", QuestionViewSet, basename="question")
router.register(r"choices", ChoicesViewSet, basename="choice")
router.register(
    r"questions/(?P<question_id>[0-9a-f-]+)/choices",
    QuestionChoicesViewSet,
    basename="question-choices",
)
router.register(
    r"quizzes/(?P<quiz_id>[0-9a-f-]+)/score-records",
    QuizScoreRecordsViewSet,
    basename="question-choices",
)
router.register(r"score-records", ScoreRecordViewSet, basename="score-record")
urlpatterns = router.urls
