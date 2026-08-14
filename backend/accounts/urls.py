from django.urls import path
from .views import (
    DonorOnlyView,
    LoginView,
    ProfileView,
    RegisterView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("donor-only/", DonorOnlyView.as_view(), name="donor-only"),
]