from rest_framework.routers import DefaultRouter

from .views import UserViewSet, LessonViewSet, UserLessonViewSet, PublicLessonViewSet


router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"lessons", LessonViewSet, basename="lesson")
router.register(r"user-lessons", UserLessonViewSet, basename="user-lesson")
router.register(r"public-lessons", PublicLessonViewSet, basename="public-lesson")

urlpatterns = router.urls
