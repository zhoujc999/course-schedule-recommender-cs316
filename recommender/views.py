from django.views.decorators.cache import never_cache
from django.views.generic.base import TemplateView
from django.http import JsonResponse

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

from recommender.permissions import ReadPermission

from rest_framework import views, viewsets
from rest_framework import generics
from rest_framework import filters
from rest_framework import status
from rest_framework import response
from rest_framework.permissions import IsAuthenticated

index = never_cache(TemplateView.as_view(template_name='index.html'))

class ProgramView(viewsets.ModelViewSet):
    permission_classes = (ReadPermission,)
    serializer_class = ProgramSerializer
    #  def get_queryset(self):
        #  user = self.request.user
        #  queryset = Program.objects.filter(uid=user)
        #  return queryset
    queryset = Program.objects.all()

class ClassView(viewsets.ModelViewSet):
    permission_classes = (ReadPermission,)
    serializer_class = ClassSerializer
    queryset = Class.objects.all()

class StudentView(viewsets.ModelViewSet):
    permission_classes = (ReadPermission,)
    serializer_class = StudentSerializer
    queryset = Student.objects.all()

class SemesterView(viewsets.ModelViewSet):
    permission_classes = (ReadPermission,)
    serializer_class = SemesterSerializer
    queryset = Semester.objects.all()

class CompletedView(viewsets.ModelViewSet):
    permission_classes = (ReadPermission,)
    serializer_class = CompletedSerializer
    queryset = Completed.objects.all()


class PlanView(views.APIView):
    permission_classes = (ReadPermission,)
    #  def get_queryset(self):
        #  user = self.request.user
        #  queryset = Program.objects.filter(uid=user)
        #  return queryset

    def get(self, request, format=None):
        program_names = request.GET['programs']
        program_names_list = program_names.split(",")
        program_list = Program.objects.filter(name__in=program_names.split(",")).values()
        pid_list = [d['pid'] for d in program_list]
        completed_list = Completed.objects.filter(pid__in=pid_list).values()
        netid_list = set([d['netid_id'] for d in completed_list])
        plan_list = list()

        for net_id in netid_list:
            person_dict = dict()
            person_dict['semesters'] = list(Semester.objects.filter(netid_id=net_id).values())
            plan_list.append(person_dict)


        print(program_names_list)
        return JsonResponse(list(program_list), safe=False)
