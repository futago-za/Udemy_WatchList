from django.db import models

class Course(models.Model):
  id = models.AutoField(primary_key=True, unique=True)
  title = models.CharField(max_length=256)
  url = models.CharField(max_length=256, unique=True)
  image_path = models.CharField(max_length=256)
  total_time = models.CharField(max_length=32)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.title


class Section(models.Model):
  id = models.AutoField(primary_key=True, unique=True)
  title = models.CharField(max_length=256)
  total_lecture = models.IntegerField()
  total_time = models.CharField(max_length=32)
  course = models.ForeignKey(Course, related_name='sections', on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.title
