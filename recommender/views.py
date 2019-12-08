from django.views.decorators.cache import never_cache
from django.views.generic.base import TemplateView
from django.http import JsonResponse
from django.forms.models import model_to_dict

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
from rest_framework.permissions import IsAuthenticated, AllowAny

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


class SemesterByNetidView(views.APIView):
    permission_classes = (ReadPermission,)
    def get(self, request, format=None):
        student_netid = request.GET.get('netid')
        semester_list = list(Semester.objects.filter(netid=student_netid).values())
        return JsonResponse(semester_list, safe=False)

    def post(self, request, format=None):
        student_netid = request.POST.get('netid')
        program_name = request.POST.get('name')
        program_type = request.POST.get('type')
        try:
            program_instance = Program.objects.get(name=program_name,
                                               type=program_type)
        except Program.DoesNotExist:
            return JsonResponse({"detail": "No program with name and type found."},
                                status=status.HTTP_400_BAD_REQUEST, safe=False)
        program_pid = model_to_dict(program_instance)["pid"]
        program_instance = Program.objects.get(pid=program_pid)
        student_instance = Student.objects.get(netid=student_netid)
        completed = Completed(netid=student_instance, pid=program_instance)
        completed.save()
        return JsonResponse({""}, status=status.HTTP_201_CREATED, safe=False)

class CompletedByNetidView(views.APIView):
    permission_classes = (ReadPermission,)
    def get(self, request, format=None):
        student_netid = request.GET.get('netid')
        completed_list = list(Completed.objects.filter(netid=student_netid).values())
        return JsonResponse(completed_list, safe=False)



class PlanView(views.APIView):
    permission_classes = (ReadPermission,)
    def get(self, request, format=None):
        program_names = request.GET.get('programs')
        program_names_list = program_names.split(",")
        program_list = Program.objects.filter(name__in=program_names.split(",")).values()
        pid_list = [d['pid'] for d in program_list]
        completed_list = Completed.objects.filter(pid__in=pid_list).values()
        netid_list = set([d['netid_id'] for d in completed_list])
        plan_list = list()

        for net_id in netid_list:
            person_dict = dict()
            person_dict['netid'] = net_id
            person_dict['Description'] = model_to_dict(Student.objects.get(netid=net_id))['description']

            person_semesters = dict()

            for s in Semester.objects.filter(netid_id=net_id).values():
                taken_pid = s['pid_id']
                person_semesters.setdefault(s['semester_number'],[])
                class_info = model_to_dict(Class.objects.get(classid=s['classid_id']))
                class_info['taken_pid'] =  taken_pid
                class_info['taken_program'] = model_to_dict(Program.objects.get(pid=taken_pid))
                person_semesters[s['semester_number']].append(class_info)
            person_dict['semesters'] = person_semesters
            plan_list.append(person_dict)

        return JsonResponse(plan_list, safe=False)


