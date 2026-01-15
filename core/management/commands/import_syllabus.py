from django.core.management.base import BaseCommand
from core.models import Department, Year, Semester, Subject
from docx import Document
import re

class Command(BaseCommand):
    help = "Import syllabus and auto-create departments, years, semesters, and subjects"

    def handle(self, *args, **kwargs):
        doc_path = "core\management\commands\import_syllabus.docx"
        doc = Document(doc_path)

        current_department = None
        current_year = None
        current_semester = None

        for para in doc.paragraphs:
            text = para.text.strip()

            # Match department headings
            if re.match(r'^[A-Z].*Department.*$', text):
                name = text.replace("Department of", "").replace(":", "").strip()
                current_department, _ = Department.objects.get_or_create(name=name)
                self.stdout.write(self.style.SUCCESS(f"✅ Department: {name}"))

            # Match Year (1st Year, 2nd Year, etc.)
            elif re.match(r'^(1st|2nd|3rd|4th) Year$', text):
                year_num = int(text[0])
                current_year, _ = Year.objects.get_or_create(number=year_num, department=current_department)
                self.stdout.write(self.style.SUCCESS(f"  📘 Year: {year_num}"))

            # Match Semester (Odd/Even)
            elif "Semester" in text:
                sem_map = {"First": 1, "Second": 2, "Third": 3, "Fourth": 4,
                           "Fifth": 5, "Sixth": 6, "Seventh": 7, "Eighth": 8}
                for name, num in sem_map.items():
                    if name in text:
                        current_semester, _ = Semester.objects.get_or_create(number=num, year=current_year)
                        self.stdout.write(self.style.SUCCESS(f"    📗 Semester: {name} ({num})"))
                        break

            # Match subject entries (simple assumption: all-caps with code)
            elif re.match(r'^[A-Z]{2,}\s+\d{3,}\s+-\s+.+$', text):
                # e.g., CSE 101 - Data Structures
                try:
                    code, title = text.split("-", 1)
                    title = title.strip()
                    Subject.objects.get_or_create(name=title, semester=current_semester)
                    self.stdout.write(self.style.SUCCESS(f"      📕 Subject: {title}"))
                except ValueError:
                    continue  # Malformed subject line

        self.stdout.write(self.style.SUCCESS("\n✅ Full syllabus import completed."))
