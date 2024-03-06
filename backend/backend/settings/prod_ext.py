from .settings import *

DEBUG = True
# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': BASE_DIR / 'my_todo',
        'USER': 'djangorest',
        'PASSWORD': 'geekbrains',
        'HOST': '127.0.0.1',
        'PORT': '54326'
    }
}
