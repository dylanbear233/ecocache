from django.urls import path
from .views import home_view, register_view, login_view, user_info_view, create_discovery

urlpatterns = [
    path('', home_view),
    path('register', register_view),
    path('login', login_view),
    path("userinfo/", user_info_view),
    path("discoveries/create/", create_discovery),
    path("discoveries/my/", user_discoveries),
]

