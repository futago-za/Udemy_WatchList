from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Course, Section


class SectionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Section
    fields = ["id", "title", "total_lecture", "total_time", "created_at"]


class CourseSerializer(serializers.ModelSerializer):
  sections = SectionSerializer(many=True)

  class Meta:
    model = Course
    fields = ["id", "title", "url", "image_path", "total_time", "sections", "created_at"]

  def create(self, validated_data):
    sections_data = validated_data.pop('sections')
    course = Course.objects.create(**validated_data)

    for section_data in sections_data:
      Section.objects.create(course=course, **section_data)

    return course
