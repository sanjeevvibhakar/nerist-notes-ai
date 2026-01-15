from rest_framework import serializers
from .models import Department, Year, Semester, Subject, StudyMaterial, Question, Answer

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class YearSerializer(serializers.ModelSerializer):
    class Meta:
        model = Year
        fields = '__all__'


class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = '__all__'


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class StudyMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyMaterial
        fields = '__all__'


class StudyMaterialUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyMaterial
        fields = ['id', 'subject_offering', 'material_type', 'title', 'file']


class AnswerSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Answer
        fields = ['id', 'user', 'body', 'created_at', 'is_verified', 'upvotes']


class QuestionSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    answers = AnswerSerializer(many=True, read_only=True)
    answer_count = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ['id', 'user', 'subject', 'title', 'body', 'created_at', 'tags', 'answers', 'answer_count']

    def get_answer_count(self, obj):
        return obj.answers.count()
