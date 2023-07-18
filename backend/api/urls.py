from rest_framework.routers import DefaultRouter

from .views import UserViewSet, LessonViewSet


router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"lessons", LessonViewSet, basename="lesson")

urlpatterns = router.urls
