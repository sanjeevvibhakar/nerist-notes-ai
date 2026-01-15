from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import (
    DepartmentListView, YearList, SemesterList, DepartmentSemesterList, SubjectList,
    StudyMaterialList, StudyMaterialUploadView,
    check_admin_status, subject_offerings_list,
    QuestionListCreateView, AnswerCreateView, QuestionRetrieveView,
    PendingMaterialList, verify_material, admin_manual_seed, ChatWithNoteView
)


urlpatterns = [
    path('departments/', DepartmentListView.as_view(), name='departments'),
    path('departments/<int:dept_id>/years/', YearList.as_view(), name='years'),
    path('departments/<int:dept_id>/semesters/', DepartmentSemesterList.as_view(), name='dept-semesters'),
    path('years/<int:year_id>/semesters/', SemesterList.as_view(), name='semesters'),
    path('semesters/<int:sem_id>/subjects/', SubjectList.as_view(), name='subjects'),
    path('subjects/offering/<int:offering_id>/materials/', StudyMaterialList.as_view(), name='materials'),
    path('materials/upload/', StudyMaterialUploadView.as_view(), name='material-upload'),
    path('auth/login/', obtain_auth_token, name='api_token_auth'),
    path('auth/status/', check_admin_status, name='check-admin-status'),
    path('subject-offerings/', subject_offerings_list, name='subject_offerings_list'),  # ✅ Fixed
    path('questions/', QuestionListCreateView.as_view(), name='questions'),
    path('questions/<int:pk>/', QuestionRetrieveView.as_view(), name='question-detail'),
    path('questions/<int:question_id>/answer/', AnswerCreateView.as_view(), name='post-answer'),
    path('questions/<int:pk>/', QuestionRetrieveView.as_view(), name='question-detail'),
    path('questions/<int:question_id>/answer/', AnswerCreateView.as_view(), name='post-answer'),
    path('admin/pending-materials/', PendingMaterialList.as_view(), name='pending-materials'),
    path('admin/verify-material/<int:material_id>/', verify_material, name='verify-material'),
    path('admin/manual-seed/', admin_manual_seed, name='manual-seed'),
    path('chat/<int:note_id>/', ChatWithNoteView.as_view(), name='chat-with-note'),
]
