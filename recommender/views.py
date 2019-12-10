from django.views.decorators.cache import never_cache
from django.db.utils import IntegrityError
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
from rest_framework import request
from rest_framework.permissions import IsAuthenticated, AllowAny
import json

index = never_cache(TemplateView.as_view(template_name='index.html'))

class ProgramView(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProgramSerializer
    queryset = Program.objects.all()

class ClassView(viewsets.ReadOnlyModelViewSet):
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
        sem_number = request.GET.get('semester_number')
        class_id = request.GET.get('classid')
        program_name = request.GET.get('name')
        program_type = request.GET.get('type')
        if not sem_number or not class_id or not program_name or not program_type:
            semester_list = list(Semester.objects.filter(netid=student_netid).values())
            for semester in semester_list:
                program_instance = Program.objects.get(pid=semester["pid_id"])
                program = model_to_dict(program_instance)
                semester["name"] = program["name"]
                semester["type"] = program["type"]
            return JsonResponse(semester_list, safe=False)
        try:
            program_instance = Program.objects.get(name=program_name,
                                                   type=program_type)
        except Program.DoesNotExist:
            return JsonResponse({"detail": "No program with name and type found."},
                                status=status.HTTP_400_BAD_REQUEST, safe=False)
        program_pid = model_to_dict(program_instance)["pid"]
        try:
            semester_instance = Semester.objects.get(netid=student_netid,
                                                     semester_number=sem_number,
                                                     classid=class_id,
                                                     pid=program_pid)
        except Semester.DoesNotExist:
            return JsonResponse({"detail": "No semester with netid, semester_number, classid, name and type found."},
                                status=status.HTTP_400_BAD_REQUEST, safe=False)
        semester = model_to_dict(semester_instance)
        semester["name"] = program_name
        semester["type"] = program_type
        return JsonResponse(semester, safe=False)

    def post(self, request, format=None):
        request_dict = json.loads(request.body)
        student_netid = request_dict.get('netid')
        sem_number = request_dict.get('semester_number')
        class_id = request_dict.get('classid')
        program_name = request_dict.get('name')
        program_type = request_dict.get('type')
        try:
            program_instance = Program.objects.get(name=program_name,
                                                   type=program_type)
        except Program.DoesNotExist:
            return JsonResponse({"detail": "No program with name and type found."},
                                status=status.HTTP_400_BAD_REQUEST, safe=False)
        student_instance = Student.objects.get(netid=student_netid)
        class_instance = Class.objects.get(classid=class_id)
        semester = Semester(semester_number=sem_number,
                            netid=student_instance,
                            classid=class_instance,
                            pid=program_instance)
        try:
            semester.save()
        except IntegrityError:
            return JsonResponse({"detail": "Duplicate semester entry."},
                                status=status.HTTP_400_BAD_REQUEST, safe=False)
        return JsonResponse({"id": semester.pk}, status=status.HTTP_201_CREATED, safe=False)

class CompletedByNetidView(views.APIView):
    permission_classes = (ReadPermission,)
    def get(self, request, format=None):
        student_netid = request.GET.get('netid')
        program_name = request.GET.get('name')
        program_type = request.GET.get('type')
        if not program_name or not program_type:
            completed_list = list(Completed.objects.filter(netid=student_netid).values())
            for completed in completed_list:
                program_instance = Program.objects.get(pid=completed["pid_id"])
                program = model_to_dict(program_instance)
                completed["name"] = program["name"]
                completed["type"] = program["type"]
            return JsonResponse(completed_list, safe=False)
        try:
            program_instance = Program.objects.get(name=program_name,
                                                   type=program_type)
        except Program.DoesNotExist:
            return JsonResponse({"detail": "No program with name and type found."},
                                status=status.HTTP_400_BAD_REQUEST, safe=False)
        program_pid = model_to_dict(program_instance)["pid"]
        try:
            completed_instance = Completed.objects.get(netid=student_netid,
                                                       pid=program_pid)
        except Completed.DoesNotExist:
            return JsonResponse({"detail": "No completed with netid, name and type found."},
                                status=status.HTTP_400_BAD_REQUEST, safe=False)
        completed = model_to_dict(completed_instance)
        completed["name"] = program_name
        completed["type"] = program_type
        return JsonResponse(completed, safe=False)

    def post(self, request, format=None):
        request_dict = json.loads(request.body)
        student_netid = request_dict.get('netid')
        program_name = request_dict.get('name')
        program_type = request_dict.get('type')
        try:
            program_instance = Program.objects.get(name=program_name,
                                                   type=program_type)
        except Program.DoesNotExist:
            return JsonResponse({"detail": "No program with name and type found."},
                                status=status.HTTP_400_BAD_REQUEST, safe=False)
        student_instance = Student.objects.get(netid=student_netid)
        completed = Completed(netid=student_instance, pid=program_instance)
        try:
            completed.save()
        except IntegrityError:
            return JsonResponse({"detail": "Duplicate completed entry."},
                                status=status.HTTP_400_BAD_REQUEST, safe=False)
        return JsonResponse({"id": completed.pk}, status=status.HTTP_201_CREATED, safe=False)

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
            person_dict['description'] = model_to_dict(Student.objects.get(netid=net_id))['description']
            taken_pid_set = set()
            person_semesters = dict()

            for s in Semester.objects.filter(netid_id=net_id).values():
                taken_pid = s['pid_id']
                person_semesters.setdefault(s['semester_number'],[])
                class_info = model_to_dict(Class.objects.get(classid=s['classid_id']))
                class_info['taken_pid'] = taken_pid
                taken_program = model_to_dict(Program.objects.get(pid=taken_pid))
                class_info['taken_program'] = taken_program
                taken_pid_set.add(taken_pid)
                person_semesters[s['semester_number']].append(class_info)
            person_dict['plan_info'] = list(Program.objects.filter(pid__in=taken_pid_set).values())
            person_dict['semesters'] = person_semesters
            plan_list.append(person_dict)

        return JsonResponse(plan_list, safe=False)


