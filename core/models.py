from django.db import models


class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Year(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    number = models.IntegerField()

    def __str__(self):
        return f"{self.department.name} - Year {self.number}"


class Semester(models.Model):
    year = models.ForeignKey(Year, on_delete=models.CASCADE)
    number = models.IntegerField()

    def __str__(self):
        return f"{self.year.department.name} - Year {self.year.number} - Sem {self.number}"


class Subject(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name


class SubjectOffering(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.subject.name} → {self.semester}"


class StudyMaterial(models.Model):
    MATERIAL_TYPES = [
        ('notes', 'Notes'),
        ('pyq', 'Previous Year Questions'),
        ('practical', 'Practical'),
    ]

    subject_offering = models.ForeignKey(SubjectOffering, on_delete=models.CASCADE)
    material_type = models.CharField(max_length=20, choices=MATERIAL_TYPES)
    title = models.CharField(max_length=150)
    file = models.FileField(upload_to='materials/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)
    uploaded_by = models.ForeignKey('auth.User', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.title} [{self.material_type}]"


class Question(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='questions')
    title = models.CharField(max_length=255)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.CharField(max_length=200, blank=True, help_text="Comma-separated tags")

    def __str__(self):
        return self.title


class Answer(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)
    upvotes = models.IntegerField(default=0)

    def __str__(self):
        return f"Answer to {self.question.title} by {self.user.username}"
