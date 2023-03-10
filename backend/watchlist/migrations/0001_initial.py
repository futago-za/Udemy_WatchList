# Generated by Django 3.2.18 on 2023-02-25 07:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(max_length=255)),
                ('url', models.CharField(max_length=255, unique=True)),
                ('image_path', models.CharField(max_length=255)),
                ('total_time', models.CharField(max_length=32)),
                ('sort_order', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(max_length=255)),
                ('total_lecture', models.IntegerField()),
                ('total_time', models.CharField(max_length=32)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='watchlist.course')),
            ],
        ),
    ]
