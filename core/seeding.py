import csv
import os
from django.db import transaction
from django.contrib.auth.models import User
from core.models import Department, Year, Semester, Subject, SubjectOffering, StudyMaterial, Question, Answer

def run_seed_data(stdout_write_func=print):
    stdout_write_func('--- SEEDING START (Service) ---')
    
    with transaction.atomic():
        stdout_write_func('Deleting old data (including Q&A and Materials)...')
        
        # Count before
        pre_count = Department.objects.count()
        stdout_write_func(f'Found {pre_count} existing departments.')
        
        # Explicitly delete in reverse order of dependence
        Answer.objects.all().delete()
        Question.objects.all().delete()
        StudyMaterial.objects.all().delete()
        SubjectOffering.objects.all().delete()
        Semester.objects.all().delete()
        Year.objects.all().delete()
        Subject.objects.all().delete()
        Department.objects.all().delete()
        
        # Count after
        post_count = Department.objects.count()
        stdout_write_func(f'Departments after deletion: {post_count}')

        # Mapping for normalization
        DEPT_MAP = {
            'Computer Science & Engineering': 'Computer Science and Engineering',
            'Electronics & Communication Engineering': 'Electronics and Communication Engineering',
            'Electronics & Communication': 'Electronics and Communication Engineering',
            'Electronics and Communication': 'Electronics and Communication Engineering',
            'Dept. of Chemistry': 'Chemistry',
            'Dept. of Mathematics': 'Mathematics',
            'Dept. of Physics': 'Physics',
            'Department of Chemistry, Mathematics, Physics': 'Chemistry',
        }

        stdout_write_func('Seeding from CSV...')
        # Path to CSV
        csv_path = os.path.join(os.path.dirname(__file__), 'management/commands/actual_subjects.csv')
        
        if not os.path.exists(csv_path):
            stdout_write_func(f'ERROR: CSV file not found at {csv_path}')
            return False

        with open(csv_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                dept_name = row['Department'].strip()
                # Apply normalization
                dept_name = DEPT_MAP.get(dept_name, dept_name)
                
                year_num = int(row['Year'].strip())
                sem_num = int(row['Semester'].strip())
                subject_name = row['Subject Name'].strip()

                # Get or Create Department
                dept, _ = Department.objects.get_or_create(name=dept_name)

                # Get or Create Year
                year, _ = Year.objects.get_or_create(department=dept, number=year_num)

                # Get or Create Semester
                sem, _ = Semester.objects.get_or_create(year=year, number=sem_num)

                # Get or Create Subject
                subject, _ = Subject.objects.get_or_create(name=subject_name)

                # Link Subject to Semester
                SubjectOffering.objects.get_or_create(subject=subject, semester=sem)

    # Create Default Users
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        stdout_write_func('Created superuser: admin')

    if not User.objects.filter(username='student').exists():
        User.objects.create_user('student', 'student@example.com', 'student123')
        stdout_write_func('Created user: student')

    stdout_write_func('Successfully populated database from CSV!')
    return True
