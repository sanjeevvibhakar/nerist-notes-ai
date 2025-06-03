from django.db import models

class Department(models.Model):
    name = models.CharField(max_length=100)

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
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.name} ({self.semester})"


class StudyMaterial(models.Model):
    MATERIAL_TYPES = [
        ('notes', 'Notes'),
        ('pyq', 'Previous Year Questions'),
        ('practical', 'Practical'),
    ]

    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    material_type = models.CharField(max_length=20, choices=MATERIAL_TYPES)
    title = models.CharField(max_length=150)
    file = models.FileField(upload_to='materials/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} [{self.material_type}]"
