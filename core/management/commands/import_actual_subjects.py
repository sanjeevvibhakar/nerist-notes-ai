import csv
from django.core.management.base import BaseCommand
from core.models import Department, Year, Semester, Subject, SubjectOffering

class Command(BaseCommand):
    help = "Import actual subjects from CSV"

    def handle(self, *args, **kwargs):
        with open("core/management/commands/actual_subjects.csv", newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            count = 0
            for row in reader:
                dept_name = row['Department'].strip()
                year_num = int(row['Year'].strip())
                sem_num = int(row['Semester'].strip())
                subject_name = row['Subject Name'].strip()

                # Get or create department (case-insensitive)
                dept = Department.objects.filter(name__iexact=dept_name).first()
                if not dept:
                    dept = Department.objects.create(name=dept_name)

                year, _ = Year.objects.get_or_create(department=dept, number=year_num)
                semester, _ = Semester.objects.get_or_create(year=year, number=sem_num)
                subject, _ = Subject.objects.get_or_create(name=subject_name)

                # Create SubjectOffering link
                offering, created = SubjectOffering.objects.get_or_create(subject=subject, semester=semester)
                if created:
                    count += 1

            self.stdout.write(self.style.SUCCESS(f"✅ Linked {count} subject offerings successfully."))
