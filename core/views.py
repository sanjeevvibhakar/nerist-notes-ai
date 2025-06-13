from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Department, Year, Semester, Subject, StudyMaterial
from .serializers import (
    DepartmentSerializer,
    YearSerializer,
    SemesterSerializer,
    SubjectSerializer,
    StudyMaterialSerializer,
    StudyMaterialUploadSerializer
)

# ✅ List all departments
class DepartmentListView(APIView):
    def get(self, request):
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)

# ✅ List years by department
class YearList(generics.ListAPIView):
    serializer_class = YearSerializer

    def get_queryset(self):
        dept_id = self.kwargs['dept_id']
        return Year.objects.filter(department_id=dept_id)

# ✅ List semesters by year
class SemesterList(generics.ListAPIView):
    serializer_class = SemesterSerializer

    def get_queryset(self):
        year_id = self.kwargs['year_id']
        return Semester.objects.filter(year_id=year_id)

# ✅ List subjects by semester
class SubjectList(generics.ListAPIView):
    serializer_class = SubjectSerializer

    def get_queryset(self):
        sem_id = self.kwargs['sem_id']
        return Subject.objects.filter(semester_id=sem_id)

# ✅ List materials by subject
class StudyMaterialList(generics.ListAPIView):
    serializer_class = StudyMaterialSerializer

    def get_queryset(self):
        subj_id = self.kwargs['subject_id']
        return StudyMaterial.objects.filter(subject_id=subj_id)

# ✅ Upload study material (used by frontend upload form)
class StudyMaterialUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        serializer = StudyMaterialUploadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Upload successful!", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
