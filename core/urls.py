from django.urls import path
from .views import (
    DepartmentListView, YearList, SemesterList,
    SubjectList, StudyMaterialList, StudyMaterialUploadView
)

urlpatterns = [
    path('departments/', DepartmentListView.as_view(), name='departments'),
    path('departments/<int:dept_id>/years/', YearList.as_view(), name='years'),
    path('years/<int:year_id>/semesters/', SemesterList.as_view(), name='semesters'),
    path('semesters/<int:sem_id>/subjects/', SubjectList.as_view(), name='subjects'),
    path('subjects/<int:subject_id>/materials/', StudyMaterialList.as_view(), name='materials'),
    path('materials/upload/', StudyMaterialUploadView.as_view(), name='material-upload'),
]
