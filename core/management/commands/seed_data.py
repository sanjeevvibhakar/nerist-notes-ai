from django.core.management.base import BaseCommand
from core.seeding import run_seed_data

class Command(BaseCommand):
    help = 'Seeds initial data from CSV'

    def handle(self, *args, **kwargs):
        self.stdout.write('--- SEEDING START (Command) ---')
        run_seed_data(stdout_write_func=self.stdout.write)
        self.stdout.write(self.style.SUCCESS('Successfully seeded data!'))
