# Generated manually

from django.db import migrations


def populate_order_statuses(apps, schema_editor):
    """Заполняем статусы заказов"""
    OrderStatus = apps.get_model('orders', 'OrderStatus')
    
    statuses = [
        {
            'name': 'Новый',
            'code': 'new',
            'description': 'Новый заказ, ожидает обработки',
            'color': '#007bff',
            'sort_order': 1
        },
        {
            'name': 'В работе',
            'code': 'in_progress',
            'description': 'Заказ в процессе обработки',
            'color': '#ffc107',
            'sort_order': 2
        },
        {
            'name': 'Отработан',
            'code': 'processed',
            'description': 'Заказ обработан и готов к отправке',
            'color': '#28a745',
            'sort_order': 3
        },
        {
            'name': 'Отказ',
            'code': 'rejected',
            'description': 'Заказ отклонен',
            'color': '#dc3545',
            'sort_order': 4
        },
        {
            'name': 'В работе, собирается',
            'code': 'assembling',
            'description': 'Заказ собирается на складе',
            'color': '#fd7e14',
            'sort_order': 5
        },
        {
            'name': 'Передан в доставку, выполнен',
            'code': 'delivered',
            'description': 'Заказ передан в службу доставки',
            'color': '#20c997',
            'sort_order': 6
        },
        {
            'name': 'Отмена',
            'code': 'cancelled',
            'description': 'Заказ отменен',
            'color': '#6c757d',
            'sort_order': 7
        }
    ]
    
    for status_data in statuses:
        OrderStatus.objects.get_or_create(
            code=status_data['code'],
            defaults=status_data
        )


def reverse_populate_order_statuses(apps, schema_editor):
    """Обратная операция - удаляем статусы"""
    OrderStatus = apps.get_model('orders', 'OrderStatus')
    OrderStatus.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_orderstatus_alter_order_status_and_more'),
    ]

    operations = [
        migrations.RunPython(populate_order_statuses, reverse_populate_order_statuses),
    ]
