"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from rest_framework.routers import DefaultRouter
from library.views import AuthorViewSet

from userapp.views import UserViewSet

from todo.views import ProjectViewSet, TodoViewSet

from userapp.views import UserCustomViewSet, UserViewSet

# from userapp.views import UsersViewSet, UserUpdateAPIView, UserRetrieveAPIVIew
from todo.views import ProjectMixinViewSet, TodoMixinViewSet
from rest_framework.authtoken.views import obtain_auth_token


router = DefaultRouter()
# router.register('authors', AuthorViewSet)
# router.register('users', UserViewSet)
# router.register('users-api', UsersViewSet, basename='users-api') # обязательно указывать basename, такое же как и первый параметр

# router.register('projects', ProjectViewSet)
# router.register('todos', TodoViewSet)
router.register('todos', TodoMixinViewSet)
router.register('users', UserCustomViewSet) #UserCustomViewSet UserViewSet
router.register('projects', ProjectMixinViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token)
]
