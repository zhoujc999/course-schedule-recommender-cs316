from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    firebase_uid = models.CharField(max_length=64, unique=True, default='')
    class Meta:
        db_table = 'students_user'
