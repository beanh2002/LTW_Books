
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('',include('Home.urls')),
    path('Admin/',include('Admin.urls'))
]
