from django.urls import path
from .views import home_view, register_view, login_view

urlpatterns = [
    path('', home_view),
    path('register', register_view),
    path('login', login_view),
]
