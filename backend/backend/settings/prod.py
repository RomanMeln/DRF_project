from .settings import *

DEBUG = False
# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'my_todo',
        'USER': 'djangorest',
        'PASSWORD': 'geekbrains',
        'HOST': 'db',
        'PORT': '5432'
    }
}
