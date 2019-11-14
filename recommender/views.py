from django.views.decorators.cache import never_cache
from django.views.generic.base import TemplateView

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
from rest_framework import response

index = never_cache(TemplateView.as_view(template_name='index.html'))

class ProgramView(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProgramSerializer
    queryset = Program.objects.all()

class ClassView(viewsets.ReadOnlyModelViewSet):
    serializer_class = ClassSerializer
    queryset = Class.objects.all()

class StudentView(viewsets.ReadOnlyModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()

class SemesterView(viewsets.ReadOnlyModelViewSet):
    serializer_class = SemesterSerializer
    queryset = Semester.objects.all()

class CompletedView(viewsets.ReadOnlyModelViewSet):
    serializer_class = CompletedSerializer
    queryset = Completed.objects.all()
