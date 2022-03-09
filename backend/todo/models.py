from django.db import models

from userapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=64)


class Todo(models.Model):
    title = models.CharField(max_length=64)
    text = models.TextField(blank=True) #текстовое поле
    created = models.DateField(default=timezone.now().strftime("%Y-%m-%d")) # дата создания
    updated = models.DateField(default=timezone.now().strftime("%Y-%m-%d")) #до какой даты нужно было сделать дело
    user = models.ForeignKey(User, default='Пользователь', on_delete=models.CASCADE) # foreignkey с помощью которой мы будем осуществлять связь с пользователями
    is_active = models.BooleanField(default=True)

    class Meta: #используем вспомогательный класс мета для сортировки наших дел
        ordering = ["-created"] #сортировка дел по времени их создания

    def __str__(self):
        return self.title
