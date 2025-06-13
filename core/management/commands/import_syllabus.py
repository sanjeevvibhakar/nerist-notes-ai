# 📁 File: core/management/commands/import_syllabus.py

from django.core.management.base import BaseCommand
from core.models import Department, Year, Semester, Subject
from docx import Document

class Command(BaseCommand):
    help = 'Import syllabus from DOCX and populate departments, years, semesters, subjects'

    def handle(self, *args, **options):
        doc_path = 'core\management\commands\import_syllabus.docx'  # Ensure the file is in project root
        doc = Document(doc_path)

        current_dept = None
        current_year = None
        current_semester = None

        for para in doc.paragraphs:
            text = para.text.strip()

            # Detect department
            if text.upper().startswith("DEPARTMENT OF"):
                dept_name = text.replace("DEPARTMENT OF", "").strip().title()
                current_dept, _ = Department.objects.get_or_create(name=dept_name)
                print(f"✅ Added department: {current_dept.name}")
                continue

            # Detect year & semester lines
            if text.lower().startswith("year") and "semester" in text.lower():
                try:
                    parts = text.lower().split("semester")
                    year_part = parts[0].replace("year", "").strip()
                    sem_part = parts[1].strip()
                    year_number = int(year_part) if year_part.isdigit() else 1
                    sem_number = int(sem_part) if sem_part.isdigit() else 1

                    current_year, _ = Year.objects.get_or_create(department=current_dept, number=year_number)
                    current_semester, _ = Semester.objects.get_or_create(year=current_year, number=sem_number)
                    print(f"📚 Year {year_number}, Semester {sem_number} for {current_dept.name}")
                except Exception as e:
                    print(f"❌ Failed to parse year/semester: {text} => {e}")
                continue

            # Detect subjects (basic heuristic based on digits and words)
            if text and any(char.isdigit() for char in text[:3]) and len(text.split()) > 2:
                parts = text.split()
                course_code = parts[1]
                course_title = " ".join(parts[2:])
                try:
                    Subject.objects.get_or_create(
                        semester=current_semester,
                        code=course_code,
                        name=course_title
                    )
                    print(f"📘 Added subject: {course_title} [{course_code}]")
                except Exception as e:
                    print(f"⚠️ Subject add failed: {text} => {e}")

        self.stdout.write(self.style.SUCCESS("✅ Full syllabus import completed: departments, years, semesters, subjects."))
