from rest_framework import viewsets
from .models import Course, Section
from .serializer import CourseSerializer, SectionSerializer
from rest_framework.response import Response
from rest_framework import status as http_status


class CourseViewSet(viewsets.ModelViewSet):
  queryset = Course.objects.all()
  serializer_class = CourseSerializer

  def destroy(self, request, *args, **kwargs):
    instance = self.get_object()
    max_sort_order = Course.objects.count()

    for sort_order in range(instance.sort_order + 1, max_sort_order):
      target = Course.objects.get(sort_order=sort_order)
      target.sort_order = target.sort_order - 1
      target.save()

    instance.delete()
    return Response(status=http_status.HTTP_204_NO_CONTENT)


class SectionViewSet(viewsets.ModelViewSet):
  queryset = Section.objects.all()
  serializer_class = SectionSerializer
