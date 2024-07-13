from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'interests', InterestViewSet)

urlpatterns = [
    path('register/', RegistrationView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profiles/', ProfileListView.as_view(), name='profiles-list'),
    path('', include(router.urls)),
]
