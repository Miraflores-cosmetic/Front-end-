# Generated manually

from django.db import migrations


def recalculate_volumes(apps, schema_editor):
    """Пересчитываем объемы для всех существующих вариантов товаров"""
    ProductVariant = apps.get_model('catalog', 'ProductVariant')
    
    for variant in ProductVariant.objects.all():
        if all([variant.length, variant.width, variant.height]):
            # Переводим из мм в м и вычисляем объем
            length_m = float(variant.length) / 1000
            width_m = float(variant.width) / 1000
            height_m = float(variant.height) / 1000
            volume = length_m * width_m * height_m
            variant.volume_cubic = round(volume, 6)
            variant.save(update_fields=['volume_cubic'])


def reverse_recalculate_volumes(apps, schema_editor):
    """Обратная операция - очищаем объемы"""
    ProductVariant = apps.get_model('catalog', 'ProductVariant')
    ProductVariant.objects.all().update(volume_cubic=None)


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0020_alter_productvariant_volume_cubic'),
    ]

    operations = [
        migrations.RunPython(recalculate_volumes, reverse_recalculate_volumes),
    ]
