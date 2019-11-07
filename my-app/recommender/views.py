from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.cache import never_cache
from django.views.generic.base import TemplateView

index = never_cache(TemplateView.as_view(template_name='index.html'))

class HelloView(APIView):
    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)
