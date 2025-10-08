from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views
from apps.core.views import get_user_data

urlpatterns = [
    path('', views.home, name='home'),
    path('admin/', admin.site.urls),
    path('admin/api/user-data/', get_user_data, name='admin_user_data'),
    path('api/', include('apps.core.urls')),
    path('api/users/', include('apps.users.urls')),
    path('api/catalog/', include('apps.catalog.urls')),
    path('api/cart/', include('apps.cart.urls')),
    path('api/checkout/', include('apps.checkout.urls')),
    path('api/orders/', include('apps.orders.urls')),
    path('api/shipping/', include('apps.shipping.urls')),
    path('api/payments/', include('apps.payments.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)