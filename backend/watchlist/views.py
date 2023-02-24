from rest_framework import viewsets
from .models import Course, Section
from .serializer import CourseSerializer, SectionSerializer


class CourseViewSet(viewsets.ModelViewSet):
  queryset = Course.objects.all()
  serializer_class = CourseSerializer


class SectionViewSet(viewsets.ModelViewSet):
  queryset = Section.objects.all()
  serializer_class = SectionSerializer

