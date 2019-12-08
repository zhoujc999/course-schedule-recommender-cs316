"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import include

from rest_framework import routers

import recommender.views as RecommenderViews

router = routers.DefaultRouter()
router.register(r'programs', RecommenderViews.ProgramView, 'program')
router.register(r'classes', RecommenderViews.ClassView, 'class')
router.register(r'students', RecommenderViews.StudentView, 'student')
router.register(r'semesters', RecommenderViews.SemesterView, 'semester')
router.register(r'completeds', RecommenderViews.CompletedView, 'completed')


urlpatterns = [
    path('', RecommenderViews.index, name='index'),
    path('login', RecommenderViews.index, name='index'),
    path('signup', RecommenderViews.index, name='index'),
    path('account', RecommenderViews.index, name='index'),
    path('api/', include(router.urls)),
    path('api/plans', RecommenderViews.PlanView.as_view()),
    path('api/semestersbynetid', RecommenderViews.SemesterByNetidView.as_view()),
    path('api/completedbynetid', RecommenderViews.CompletedByNetidView.as_view()),
    path('admin/', admin.site.urls),
]
