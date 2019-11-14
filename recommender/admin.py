from django.contrib import admin
from recommender.models import Class,       \
                               Program,     \
                               Student,     \
                               Semester,    \
                               Completed

# Register your models here.
admin.site.register(Class)
admin.site.register(Program)
admin.site.register(Student)
admin.site.register(Semester)
admin.site.register(Completed)
