from django.views.decorators.cache import never_cache
from django.views.generic.base import TemplateView


from django.contrib.auth.models import User

from recommender.models import Program,     \
                               Class,       \
                               Student,     \
                               Semester,    \
                               Completed
from recommender.serializers import ProgramSerializer,     \
                                    ClassSerializer,       \
                                    StudentSerializer,     \
                                    SemesterSerializer,    \
                                    CompletedSerializer

from rest_framework import views, viewsets
from rest_framework import generics
from rest_framework import filters
from rest_framework import status
from rest_framework import response
from rest_framework.permissions import IsAuthenticated

index = never_cache(TemplateView.as_view(template_name='index.html'))

class ProgramView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProgramSerializer
    def get_queryset(self):
        user = self.request.user
        queryset = WagePosting.objects.filter(uid=user)
        return queryset
    #  queryset = Program.objects.all()

class ClassView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ClassSerializer
    queryset = Class.objects.all()

class StudentView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = StudentSerializer
    queryset = Student.objects.all()

class SemesterView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = SemesterSerializer
    queryset = Semester.objects.all()

class CompletedView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = CompletedSerializer
    queryset = Completed.objects.all()
