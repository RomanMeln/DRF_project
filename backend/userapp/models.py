from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(verbose_name='электронная почта', blank=True, unique=True)

    def __str__(self):
        return self.email
