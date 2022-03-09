from rest_framework.serializers import ModelSerializer

from todo.models import Project, Todo


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
