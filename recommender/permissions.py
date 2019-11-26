from rest_framework.permissions import BasePermission
from rest_framework.permissions import SAFE_METHODS

class ReadPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS or request.user.is_authenticated:
            return True
        return False
