# Generated by Django 2.2.7 on 2019-11-22 21:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Class',
            fields=[
                ('classid', models.CharField(max_length=32, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=256)),
            ],
            options={
                'db_table': 'class',
            },
        ),
        migrations.CreateModel(
            name='Program',
            fields=[
                ('pid', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=256)),
                ('type', models.CharField(max_length=256)),
            ],
            options={
                'db_table': 'program',
            },
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('netid', models.CharField(max_length=8, primary_key=True, serialize=False)),
                ('description', models.CharField(blank=True, max_length=512, null=True)),
            ],
            options={
                'db_table': 'student',
            },
        ),
        migrations.CreateModel(
            name='Semester',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('semester_number', models.IntegerField()),
                ('classid', models.ForeignKey(db_column='classid', on_delete=django.db.models.deletion.DO_NOTHING, to='recommender.Class')),
                ('netid', models.ForeignKey(db_column='netid', on_delete=django.db.models.deletion.DO_NOTHING, to='recommender.Student')),
                ('pid', models.ForeignKey(db_column='pid', on_delete=django.db.models.deletion.DO_NOTHING, to='recommender.Program')),
            ],
            options={
                'db_table': 'semester',
            },
        ),
        migrations.CreateModel(
            name='Completed',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('netid', models.ForeignKey(db_column='netid', on_delete=django.db.models.deletion.DO_NOTHING, to='recommender.Student')),
                ('pid', models.ForeignKey(db_column='pid', on_delete=django.db.models.deletion.DO_NOTHING, to='recommender.Program')),
            ],
            options={
                'db_table': 'completed',
            },
        ),
    ]
