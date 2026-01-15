from django.core.management.base import BaseCommand
from core.models import Department, Year, Semester, Subject, SubjectOffering

class Command(BaseCommand):
    help = 'Seeds initial data for the portal'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')

        # 1. Create Departments
        cse, _ = Department.objects.get_or_create(name='Computer Science & Engineering', code='CSE')
        ece, _ = Department.objects.get_or_create(name='Electronics & Communication', code='ECE')
        me, _ = Department.objects.get_or_create(name='Mechanical Engineering', code='ME')

        # 2. Create Years for CSE (as example)
        for i in range(1, 5):
            year, _ = Year.objects.get_or_create(department=cse, number=i)
            # Create Semesters for each year
            sem1, _ = Semester.objects.get_or_create(year=year, number=(i*2)-1)
            sem2, _ = Semester.objects.get_or_create(year=year, number=(i*2))

            # Add sample subjects for Semesters
            if i == 1:
                sub1, _ = Subject.objects.get_or_create(name='Physics', code='PH101')
                sub2, _ = Subject.objects.get_or_create(name='Mathematics-I', code='MA101')
                SubjectOffering.objects.get_or_create(subject=sub1, semester=sem1)
                SubjectOffering.objects.get_or_create(subject=sub2, semester=sem1)
            
            if i == 3:
                sub, _ = Subject.objects.get_or_create(name='Operating Systems', code='CS301')
                SubjectOffering.objects.get_or_create(subject=sub, semester=sem1)

        self.stdout.write(self.style.SUCCESS('Successfully seeded data!'))
