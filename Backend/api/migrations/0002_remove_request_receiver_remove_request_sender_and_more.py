# Generated by Django 4.2.8 on 2024-07-12 15:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='request',
            name='receiver',
        ),
        migrations.RemoveField(
            model_name='request',
            name='sender',
        ),
        migrations.DeleteModel(
            name='Message',
        ),
        migrations.DeleteModel(
            name='Request',
        ),
    ]
