from rest_framework import serializers
#  from rest_framework.validators import
from recommender.models import Program


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'
        # fields = ('pid', 'name', 'type')




