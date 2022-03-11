from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# class UserListAPIVIew(ListAPIView):
#     renderer_classes = [JSONRenderer]
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#
#
# class UserRetrieveAPIVIew(RetrieveAPIView):
#     renderer_classes = [JSONRenderer]
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


class UsersViewSet(viewsets.ViewSet):
    renderer_classes = [JSONRenderer]

    def list(self, request):

        """ выводим весь список пользователей """

        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):

        """ выводим пользователя по его pk """

        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
