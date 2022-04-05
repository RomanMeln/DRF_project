import graphene
from graphene_django import DjangoObjectType
from todo.models import Todo, Project
from userapp.models import User


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'

class Query(graphene.ObjectType):
    all_todo = graphene.List(TodoType)
    all_project = graphene.List(ProjectType)
    all_user = graphene.List(UserType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))

    def resolve_all_todo(root, info):
        return Todo.objects.all()

    def resolve_all_project(root, info):
        return Project.objects.all()

    def resolve_all_user(root, info):
        return User.objects.all()

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)
