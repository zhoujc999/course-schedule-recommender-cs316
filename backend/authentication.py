from backend_auth.authentication import BaseFirebaseAuthentication
from firebase_admin import credentials, initialize_app
from django.contrib.auth import get_user_model
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
		return get_user_model().objects.get_or_create(
			username=firebase_user_record.uid,
		)[0]
