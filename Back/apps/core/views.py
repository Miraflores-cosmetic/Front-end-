from django.http import JsonResponse
from django.contrib.admin.views.decorators import staff_member_required
from apps.users.models import User


def health_check(request):
    """Проверка здоровья API"""
    return JsonResponse({'status': 'ok', 'message': 'API is running'})


@staff_member_required
def get_user_data(request):
    """API для получения данных пользователя в админке"""
    user_id = request.GET.get('user_id')
    
    if not user_id:
        return JsonResponse({'success': False, 'error': 'User ID required'})
    
    try:
        user = User.objects.get(id=user_id)
        return JsonResponse({
            'success': True,
            'first_name': user.first_name or '',
            'last_name': user.last_name or '',
            'middle_name': getattr(user, 'middle_name', '') or '',
            'phone': user.phone or '',
        })
    except User.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'User not found'})