from django.test import TestCase
import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
# from mixer.backend.django import mixer
from userapp.models import User
from todo.views import TodoMixinViewSet

from todo.models import Project, Todo


class TestTodoApi(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/todos/')
        # user = User.objects.create_superuser('djangorest', email='djangorest@local.com', password='geekbrains')
        # force_authenticate(request, user)
        view = TodoMixinViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_get_list_1(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_2(self):
        client = APIClient()
        Project.objects.create(name='Sleep')
        response = client.get('/api/projects/')
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestTodoClientApi(APITestCase):

    # def setUp(self) -> None:
    #     self.admin = User.objects.create_superuser('djangorest', email='djangorest@local.com', password='geekbrains')

    def test_get_list(self):
        Project.objects.create(name='Sleep')
        response = self.client.get('/api/projects/')
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_1(self):

        '''Запуск теста при активации настройки rest_framework.permissions.IsAuthenticated '''
        '''Запуск только этого теста в терминале:
        "python manage.py test todo.tests.TestTodoClientApi.test_get_list_1" '''

        User.objects.create_superuser('djangorest', email='djangorest@local.com', password='geekbrains')
        self.client.login(username='djangorest', password='geekbrains')
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
