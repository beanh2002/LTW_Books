# Generated by Django 4.1.2 on 2023-05-29 10:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Entity', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='CommentParent',
        ),
    ]
