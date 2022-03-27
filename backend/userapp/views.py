from rest_framework import viewsets, mixins
from rest_framework.generics import get_object_or_404, UpdateAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, DjangoModelPermissionsOrAnonReadOnly, \
    BasePermission, AllowAny
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet
from .models import User
from .serializers import UserSerializer


# class IsSuperAdminUser(BasePermission):
#
#     def has_permission(self, request, view):
#         return bool(request.user and request.user.is_superuser)


class UserViewSet(ModelViewSet):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserCustomViewSet(mixins.UpdateModelMixin, mixins.ListModelMixin,
                        mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """ Могу смотреть всех и по 1му. Могу менять 1го. Создавать и удалять нельзя """
    # permission_classes = [IsAuthenticatedOrReadOnly] # Закомментил, чтобы только базовый работал.
    queryset = User.objects.all()
    serializer_class = UserSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

# class UserListAPIVIew(ListAPIView):
# """Выдаёт метод get и выводит данные об одном объекте из выборки queryset. Для указания адреса
# требуется параметр pk, чтобы определить id элемента"""
#     renderer_classes = [JSONRenderer]
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#
#
# class UserRetrieveAPIVIew(RetrieveAPIView):
# """Выдаёт метод get и выводит данные об одном объекте из выборки queryset. Для указания адреса
# требуется параметр pk, чтобы определить id элемента"""
#     renderer_classes = [JSONRenderer]
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#
# class UserUpdateAPIView(UpdateAPIView):
# """ Выдаёт методы put и patch для изменения объекта из выборки queryset. Требует pk в url-адресе. """
#     renderer_classes = [JSONRenderer]
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


# class UsersViewSet(ViewSet):
#     renderer_classes = [JSONRenderer]
#
#     def list(self, request):
#
#         """ выводим весь список пользователей """
#
#         users = User.objects.all()
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data)
#
#     def retrieve(self, request, pk=None):
#
#         """ выводим пользователя по его pk """
#
#         user = get_object_or_404(User, pk=pk)
#         serializer = UserSerializer(user)
#         return Response(serializer.data)
