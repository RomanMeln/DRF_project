from django.db import models
from django.utils import timezone

from userapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=64)
    users = models.ManyToManyField(User) # Много ко многим.

    def __str__(self):
        return self.name


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE) # foreignkey - связь с проектом
    title = models.CharField(max_length=64) # название
    text = models.TextField(blank=True) #текстовое поле
    created = models.DateField(auto_now_add=True) # дата создания
    complete = models.DateField() #до какой даты нужно было сделать дело
    user = models.ForeignKey(User, on_delete=models.CASCADE) # foreignkey - связь с пользователями
    is_active = models.BooleanField(default=True)

    class Meta: #используем вспомогательный класс мета для сортировки наших дел
        ordering = ["-created"] #сортировка дел по времени их создания

    def __str__(self):
        return self.title
