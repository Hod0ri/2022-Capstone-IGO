"""IgoTest URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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
from django.urls import path, include

from Api.Views.SearchView import SearchView
from Api.Views.UserView import UserView
from Api.Views.LogPointViews import LogPointView
from Api.Views.IssueView import IssueView
from Api.Views.EmsView import EmsView
from Api.Views.MatchLogView import MatchLogView
from Api.Views.MatchView import MatchView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', UserView.as_view()),
    path('api/point/', LogPointView.as_view()),
    path('api/issue/', IssueView.as_view()),
    path('api/ems/', EmsView.as_view()),
    path('api/matchlog/', MatchLogView.as_view()),
    path('api/match/', MatchView.as_view()),
    path('api/search/', SearchView.as_view())
]
