from django_filters import rest_framework as filters
from .models import Project, Todo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains') # фильтру в поле name нужно добавить contains для поиска по
                                                        # части имени, а не по полному совпадению.

    class Meta:
        model = Project
        fields = ['name']


class TodoFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains') # фильтру в поле name нужно добавить contains для поиска по
                                                        # части имени, а не по полному совпадению.

    class Meta:
        model = Todo
        fields = ['project']
