

from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .utils_ai import get_answer_from_document
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .serializers import (
    DepartmentSerializer,
    YearSerializer,
    SemesterSerializer,
    SubjectSerializer,
    StudyMaterialSerializer,
    StudyMaterialUploadSerializer,
    QuestionSerializer,
    AnswerSerializer
)

from .models import Department, Year, Semester, Subject, SubjectOffering, StudyMaterial, Question, Answer

# ✅ Departments List
class DepartmentListView(APIView):
    def get(self, request):
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)

# ✅ Years by Department
class YearList(generics.ListAPIView):
    serializer_class = YearSerializer

    def get_queryset(self):
        dept_id = self.kwargs['dept_id']
        return Year.objects.filter(department_id=dept_id)

# ✅ Semesters by Year
class SemesterList(generics.ListAPIView):
    serializer_class = SemesterSerializer

    def get_queryset(self):
        year_id = self.kwargs['year_id']
        return Semester.objects.filter(year_id=year_id)

# ✅ Semesters by Department (Skipping Year step)
class DepartmentSemesterList(generics.ListAPIView):
    serializer_class = SemesterSerializer

    def get_queryset(self):
        dept_id = self.kwargs['dept_id']
        return Semester.objects.filter(year__department_id=dept_id).order_by('number')

# ✅ Subjects by Semester
class SubjectList(generics.ListAPIView):
    serializer_class = SubjectSerializer

    def get_queryset(self):
        sem_id = self.kwargs['sem_id']
        return Subject.objects.filter(subjectoffering__semester_id=sem_id).distinct()

# ✅ Study Materials by Subject
class StudyMaterialList(generics.ListAPIView):
    serializer_class = StudyMaterialSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        subject_id = self.kwargs['subject_id']
        queryset = StudyMaterial.objects.filter(subject_offering__subject__id=subject_id)
        # Show only verified materials to students/public
        if not self.request.user.is_staff:
            queryset = queryset.filter(is_verified=True)
        return queryset

# ✅ Upload Material — Authenticated Users
class StudyMaterialUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]  # ✅ Allow students to upload

    def post(self, request, format=None):
        serializer = StudyMaterialUploadSerializer(data=request.data)
        if serializer.is_valid():
            # If admin, auto-verify. If student, pending.
            is_verified = request.user.is_staff
            serializer.save(uploaded_by=request.user, is_verified=is_verified)
            
            msg = "Upload successful!" if is_verified else "Upload successful! Waiting for admin approval."
            return Response({"message": msg, "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ Admin Verification Views

class PendingMaterialList(generics.ListAPIView):
    serializer_class = StudyMaterialSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return StudyMaterial.objects.filter(is_verified=False).order_by('-uploaded_at')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def verify_material(request, material_id):
    material = get_object_or_404(StudyMaterial, id=material_id)
    material.is_verified = True
    material.save()
    return Response({"message": "Material verified successfully!"})

# ✅ AI Chat View
class ChatWithNoteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, note_id):
        query = request.data.get('query')
        if not query:
            return Response({"error": "Query is required"}, status=status.HTTP_400_BAD_REQUEST)

        material = get_object_or_404(StudyMaterial, pk=note_id)
        
        # Ensure file exists
        if not material.file:
             return Response({"error": "No file attached to this material"}, status=status.HTTP_400_BAD_REQUEST)

        # Get Answer
        try:
            answer = get_answer_from_document(material.file.path, query)
            return Response({"answer": answer})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ✅ Admin status check
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_admin_status(request):
    return Response({'is_admin': request.user.is_staff})

# ✅ Subject Offerings Dropdown (for Upload Form)
@api_view(['GET'])
@permission_classes([AllowAny])
def subject_offerings_list(request):
    offerings = SubjectOffering.objects.select_related(
        'subject', 'semester__year__department'
    )
    data = []
    for offering in offerings:
        subject = offering.subject.name
        semester = offering.semester.number  # ✅ FIXED
        year = offering.semester.year.number  # ✅ FIXED
        dept = offering.semester.year.department.name

        data.append({
            "id": offering.id,
            "label": f"{dept} - Year {year} - Sem {semester} - {subject}"
        })
    return Response(data)


# ✅ Q&A Forum Views

class QuestionListCreateView(generics.ListCreateAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter by subject if provided
        subject_id = self.request.query_params.get('subject_id')
        if subject_id:
            return Question.objects.filter(subject_id=subject_id).order_by('-created_at')
        return Question.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class QuestionRetrieveView(generics.RetrieveAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]


class AnswerCreateView(generics.CreateAPIView):
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        question_id = self.kwargs.get('question_id')
        question = get_object_or_404(Question, pk=question_id)
        serializer.save(user=self.request.user, question=question)
