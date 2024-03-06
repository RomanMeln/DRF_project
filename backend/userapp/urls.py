from django.urls import path
from .views import UserCustomViewSet

app_name = 'userapp'

urlpatterns = [
    path('', UserCustomViewSet.as_view({'get': 'list'})),
]
