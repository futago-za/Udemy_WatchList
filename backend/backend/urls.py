from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from watchlist.views import CourseViewSet, SectionViewSet

defaultRouter = routers.DefaultRouter()
defaultRouter.register('course', CourseViewSet)
defaultRouter.register('section', SectionViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(defaultRouter.urls)),
    path('csrfprotect/', include("csrfprotect.urls")),
]
