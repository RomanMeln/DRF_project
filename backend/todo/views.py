from rest_framework import status
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin, \
    DestroyModelMixin
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from .filters import ProjectFilter, TodoFilter
from .models import Project, Todo
from .serializers import ProjectSerializer, TodoSerializer
from django_filters import rest_framework as filters
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, DjangoModelPermissionsOrAnonReadOnly, \
    BasePermission, AllowAny

class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectMixinViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin, DestroyModelMixin, GenericViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    # permission_classes = [IsAuthenticatedOrReadOnly] # Закомментил, чтобы только базовый работал
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filterset_class = ProjectFilter # фильтр не работает.
    # pagination_class = ProjectLimitOffsetPagination


class TodoViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TodoMixinViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin, DestroyModelMixin, GenericViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    # permission_classes = [IsAuthenticatedOrReadOnly] # Закомментил, чтобы только базовый работал
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    filterset_class = TodoFilter # фильтр не работает.
    # pagination_class = TodoLimitOffsetPagination

    def destroy(self, request, *args, **kwargs):
        """ переопределил удаление, смена is-active на False"""
        # print(request)
        instance = self.get_object()
        if not instance.is_active:
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            instance.is_active = False
            # print(instance.is_active)
            instance.save()
            return Response(status=status.HTTP_202_ACCEPTED)

