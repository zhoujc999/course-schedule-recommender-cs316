from django.db import models
from django.contrib.auth.models import AbstractUser
from recommender.models import Student

class User(AbstractUser):
    firebase_uid = models.CharField(max_length=64, unique=True, default='')
    duke_netid = models.CharField(max_length=8, null=True, blank=True)
    student = models.OneToOneField(Student, on_delete=models.CASCADE,
                                   null=True, blank=True)

    def save(self,*args,**kwargs):
        created = self.pk is None
        super().save(*args,**kwargs)
        if created:
            Student.objects.get_or_create(netid=self.duke_netid)
    class Meta:
        db_table = 'students_user'
