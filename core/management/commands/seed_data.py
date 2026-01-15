import csv
import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from core.models import Department, Year, Semester, Subject, SubjectOffering

class Command(BaseCommand):
    help = 'Seeds initial data from CSV'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data from actual_subjects.csv...')

        # Path to CSV
        csv_path = os.path.join(os.path.dirname(__file__), 'actual_subjects.csv')
        
        if not os.path.exists(csv_path):
            self.stdout.write(self.style.ERROR(f'CSV file not found at {csv_path}'))
            return

        with open(csv_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                dept_name = row['Department'].strip()
                year_num = int(row['Year'].strip())
                sem_num = int(row['Semester'].strip())
                subject_name = row['Subject Name'].strip()

                # 1. Get or Create Department
                dept, _ = Department.objects.get_or_create(name=dept_name)

                # 2. Get or Create Year
                year, _ = Year.objects.get_or_create(department=dept, number=year_num)

                # 3. Get or Create Semester
                sem, _ = Semester.objects.get_or_create(year=year, number=sem_num)

                # 4. Get or Create Subject
                subject, _ = Subject.objects.get_or_create(name=subject_name)

                # 5. Link Subject to Semester via SubjectOffering
                SubjectOffering.objects.get_or_create(subject=subject, semester=sem)

        # 6. Create Default Users (if they don't exist)
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
            self.stdout.write(self.style.SUCCESS('Created superuser: admin'))

        if not User.objects.filter(username='student').exists():
            User.objects.create_user('student', 'student@example.com', 'student123')
            self.stdout.write(self.style.SUCCESS('Created user: student'))

        self.stdout.write(self.style.SUCCESS('Successfully populated database from CSV!'))
