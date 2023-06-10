from django.urls import path
from .views import Home, image_view

urlpatterns = [
    path('home', Home.as_view()),
    path('Home/Media/<str:image_name>',image_view),
]