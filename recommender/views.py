from django.views.decorators.cache import never_cache
from django.views.generic.base import TemplateView

from recommender.models import Program
from recommender.serializers import ProgramSerializer

from rest_framework import views, viewsets
from rest_framework import response

index = never_cache(TemplateView.as_view(template_name='index.html'))

class ProgramView(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProgramSerializer
    queryset = Program.objects.all()

