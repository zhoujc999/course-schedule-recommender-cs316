from backend_auth.authentication import BaseFirebaseAuthentication
from firebase_admin import credentials, initialize_app
from django.contrib.auth import get_user_model
from recommender.models import Student
from django.conf import settings
import os

creds_path = os.path.join(settings.BASE_DIR, \
                          'course-schedule-recommender-firebase-'
                          'adminsdk-qy064-9a5cc815e6.json')

firebase_creds = credentials.Certificate(creds_path)
firebase_app = initialize_app(firebase_creds)

class FirebaseAuthentication(BaseFirebaseAuthentication):
    """
    Example implementation of a DRF Firebase Authentication backend class
    """
    def get_firebase_app(self):
        return firebase_app

    def get_django_user(self, firebase_user_record):
        user_email = firebase_user_record.email
        user_netid = FirebaseAuthenticationHelper.before(user_email, "@duke.edu")
        #  student_user=Student.objects.get_or_create(
            #  netid=user_netid
        #  )
        return get_user_model().objects.get_or_create(
            firebase_uid=firebase_user_record.uid,
            username=user_netid,
            email=user_email,
            duke_netid=user_netid
        )[0]


class FirebaseAuthenticationHelper:
    @staticmethod
    def before(string, substring):
        index = string.find(substring)
        if index == -1:
            return ""
        return string[:index]
