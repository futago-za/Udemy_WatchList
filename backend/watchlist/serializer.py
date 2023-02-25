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
    fields = ["id", "title", "url", "image_path", "total_time", "sort_order", "sections", "created_at"]

  def create(self, validated_data):
    sections_data = validated_data.pop('sections')
    validated_data.pop('sort_order')
    course = Course.objects.create(sort_order=Course.objects.count(), **validated_data)

    for section_data in sections_data:
      Section.objects.create(course=course, **section_data)

    return course

  def update(self, instance, validated_data):
    old_order = instance.sort_order
    instance.sort_order = validated_data.get('sort_order', instance.sort_order)
    new_order = instance.sort_order

    if old_order > new_order:
      for order in range(old_order, new_order, -1):
        target = Course.objects.get(sort_order=order - 1)
        if target != None:
          target.sort_order = target.sort_order + 1
          target.save()
    elif old_order < new_order:
      for order in range(old_order, new_order):
        target = Course.objects.get(sort_order=order + 1)
        if target != None:
          target.sort_order = target.sort_order - 1
          target.save()
    else:
      # 変更なし
      pass

    instance.save()
    return instance
