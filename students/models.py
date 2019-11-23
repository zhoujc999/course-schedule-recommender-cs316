from django.db import models
from django.contrib.auth.models import AbstractUser
from recommender.models import Student

class User(AbstractUser):
    student = models.OneToOneField(Student, on_delete=models.CASCADE,
                                   null=True, blank=True)
    firebase_uid = models.CharField(max_length=64, unique=True, default='')
    class Meta:
        db_table = 'students_user'
