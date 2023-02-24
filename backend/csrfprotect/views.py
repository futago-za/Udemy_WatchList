from django.views.generic import TemplateView
from django.http import JsonResponse
from django.middleware.csrf import get_token


class CsrfView(TemplateView):
  def get(self, request, **kwargs):
    return JsonResponse({'token': get_token(request)})
