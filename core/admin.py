from django.contrib import admin
from .models import Department, Year, Semester, Subject, StudyMaterial

admin.site.register(Department)
admin.site.register(Year)
admin.site.register(Semester)
admin.site.register(Subject)
admin.site.register(StudyMaterial)
