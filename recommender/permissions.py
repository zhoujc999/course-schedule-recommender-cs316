from rest_framework.permissions import BasePermission
from rest_framework.permissions import SAFE_METHODS
import json

class ReadPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        if request.user.is_authenticated:
            print(request.user.get_username())
            user_name = request.user.get_username()
            request_dict = json.loads(request.body)
            student_netid = request_dict.get('netid')
            if user_name == student_netid:
                return True
        return False
