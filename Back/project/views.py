from django.http import JsonResponse
from django.shortcuts import render


def home(request):
    """Главная страница API"""
    api_info = {
        'name': 'Miraflores API',
        'version': '1.0.0',
        'description': 'API для интернет-магазина Miraflores',
        'endpoints': {
            'health': '/api/health/',
            'admin': '/admin/',
            'catalog': '/api/catalog/',
            'users': '/api/users/',
            'cart': '/api/cart/',
            'orders': '/api/orders/',
            'shipping': '/api/shipping/',
            'payments': '/api/payments/',
        },
        'status': 'running'
    }
    
    return JsonResponse(api_info)
