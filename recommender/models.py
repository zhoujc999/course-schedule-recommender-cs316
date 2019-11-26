# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.conf import settings


class Class(models.Model):
    classid = models.CharField(primary_key=True, max_length=32)
    name = models.CharField(max_length=256)

    class Meta:
        db_table = 'class'

class Program(models.Model):
    pid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256)
    type = models.CharField(max_length=256)

    class Meta:
        db_table = 'program'


class Student(models.Model):
    netid = models.CharField(primary_key=True, max_length=8)
    description = models.CharField(max_length=512, blank=True, null=True)

    class Meta:
        db_table = 'student'

class Semester(models.Model):
    netid = models.ForeignKey('Student', on_delete=models.DO_NOTHING, db_column='netid')
    classid = models.ForeignKey('Class', on_delete=models.DO_NOTHING, db_column='classid')
    pid = models.ForeignKey('Program', on_delete=models.DO_NOTHING, db_column='pid')
    semester_number = models.IntegerField()

    class Meta:
        db_table = 'semester'

class Completed(models.Model):
    netid = models.ForeignKey('Student', on_delete=models.DO_NOTHING, db_column='netid')
    pid = models.ForeignKey('Program', on_delete=models.DO_NOTHING, db_column='pid')

    class Meta:
        db_table = 'completed'


