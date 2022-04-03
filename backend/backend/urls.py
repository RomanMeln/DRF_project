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
from django.urls import path, include, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from userapp.views import UserViewSet
from todo.views import ProjectViewSet, TodoViewSet
from userapp.views import UserCustomViewSet, UserViewSet
from todo.views import ProjectMixinViewSet, TodoMixinViewSet
from rest_framework.authtoken.views import obtain_auth_token


router = DefaultRouter()

# router.register('users', UserViewSet)
# router.register('users-api', UsersViewSet, basename='users-api') # обязательно указывать basename, такое же как и первый параметр
# router.register('projects', ProjectViewSet)
# router.register('todos', TodoViewSet)

router.register('todos', TodoMixinViewSet)
# router.register('users', UserCustomViewSet) #UserCustomViewSet UserViewSet
router.register('projects', ProjectMixinViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="Todos",
        default_version='0.1',
        description="description",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(AllowAny, )
    )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token),
    path('api/users/0.1/', include('userapp.urls', namespace='0.1')),
    path('api/users/0.2/', include('userapp.urls', namespace='0.2')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0)),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0)),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0)),
]
