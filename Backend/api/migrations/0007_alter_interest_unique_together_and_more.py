# Generated by Django 4.2.8 on 2024-07-14 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_rename_recipient_interest_receiver_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='interest',
            unique_together=set(),
        ),
        migrations.AlterField(
            model_name='interest',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.RemoveField(
            model_name='interest',
            name='status',
        ),
    ]
