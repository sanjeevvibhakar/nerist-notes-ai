import csv
import os
from django.db import transaction
from django.contrib.auth.models import User
from core.models import Department, Year, Semester, Subject, SubjectOffering, StudyMaterial, Question, Answer

def run_seed_data(stdout_write_func=print):
    stdout_write_func('--- SEEDING START (Robust) ---')
    
    # 🔥 NUCLEAR DELETE (Outside transaction to ensure commit)
    stdout_write_func('Wiping all study data...')
    try:
        Answer.objects.all().delete()
        Question.objects.all().delete()
        StudyMaterial.objects.all().delete()
        SubjectOffering.objects.all().delete()
        Semester.objects.all().delete()
        Year.objects.all().delete()
        Subject.objects.all().delete()
        Department.objects.all().delete()
        stdout_write_func('✅ Database successfully wiped.')
    except Exception as e:
        stdout_write_func(f'❌ Wipe failed: {str(e)}')
        return False

    # 🚀 SEEDING (In smaller chunks or with cache)
    # Mapping for normalization
    # Standardized names:
    # Computer Science and Engineering
    # Electronics and Communication Engineering
    # ... (others are clean)
    
    DEPT_MAP = {
        'computer science & engineering': 'Computer Science and Engineering',
        'computer science and engineering': 'Computer Science and Engineering',
        'electronics & communication engineering': 'Electronics and Communication Engineering',
        'electronics & communication': 'Electronics and Communication Engineering',
        'electronics and communication': 'Electronics and Communication Engineering',
        'electronics and communication engineering': 'Electronics and Communication Engineering',
        'dept. of chemistry': 'Chemistry',
        'dept. of mathematics': 'Mathematics',
        'dept. of physics': 'Physics',
        'chemistry': 'Chemistry',
        'mathematics': 'Mathematics',
        'physics': 'Physics',
        'department of chemistry, mathematics, physics': 'Chemistry',
        'humanities and social sciences': 'Humanities and Social Sciences',
        'forestry': 'Forestry',
        'agricultural engineering': 'Agricultural Engineering',
        'civil engineering': 'Civil Engineering',
        'electrical engineering': 'Electrical Engineering',
        'mechanical engineering': 'Mechanical Engineering',
        'centre for management studies': 'Centre for Management Studies',
    }

    csv_path = os.path.join(os.path.dirname(__file__), 'management/commands/actual_subjects.csv')
    
    if not os.path.exists(csv_path):
        stdout_write_func(f'ERROR: CSV file not found at {csv_path}')
        return False

    # Caches for speed
    dept_cache = {}
    year_cache = {}
    sem_cache = {}
    sub_cache = {}

    stdout_write_func('Populating from CSV...')
    with transaction.atomic():
        with open(csv_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                dept_raw = row['Department'].strip().lower()
                # Apply normalization
                dept_name = DEPT_MAP.get(dept_raw, row['Department'].strip())
                
                year_num = int(row['Year'].strip())
                sem_num = int(row['Semester'].strip())
                subject_name = row['Subject Name'].strip()

                # Get/Create Dept
                if dept_name not in dept_cache:
                    dept, _ = Department.objects.get_or_create(name=dept_name)
                    dept_cache[dept_name] = dept
                dept = dept_cache[dept_name]

                # Get/Create Year
                year_key = (dept.id, year_num)
                if year_key not in year_cache:
                    year, _ = Year.objects.get_or_create(department=dept, number=year_num)
                    year_cache[year_key] = year
                year = year_cache[year_key]

                # Get/Create Sem
                sem_key = (year.id, sem_num)
                if sem_key not in sem_cache:
                    sem, _ = Semester.objects.get_or_create(year=year, number=sem_num)
                    sem_cache[sem_key] = sem
                sem = sem_cache[sem_key]

                # Get/Create Subject
                if subject_name not in sub_cache:
                    subject, _ = Subject.objects.get_or_create(name=subject_name)
                    sub_cache[subject_name] = subject
                subject = sub_cache[subject_name]

                # Create Offering
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
