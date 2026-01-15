from django.contrib import admin
from .models import Department, Year, Semester, Subject, StudyMaterial
from django.contrib import admin
from .models import Subject, Year, Semester, Department, StudyMaterial, SubjectOffering


admin.site.register(Department)
admin.site.register(Year)
admin.site.register(Semester)
admin.site.register(Subject)
admin.site.register(StudyMaterial)
admin.site.register(SubjectOffering) 