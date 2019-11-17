from rest_framework import serializers
#  from rest_framework.validators import
from recommender.models import Program,     \
                               Class,       \
                               Student,     \
                               Semester,    \
                               Completed


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'
        # fields = ('pid', 'name', 'type')

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = '__all__'

class CompletedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Completed
        fields = '__all__'
