from django.urls import path
from . import views

urlpatterns = [
    path('', views.LibraryView.as_view()),
    # path('<str:title>/', views.LibraryView.as_view()),

]