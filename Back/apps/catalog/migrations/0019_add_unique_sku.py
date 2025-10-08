# Generated manually

from django.db import migrations, models
import uuid


def populate_sku_values(apps, schema_editor):
    """Заполняем пустые sku уникальными значениями"""
    ProductVariant = apps.get_model('catalog', 'ProductVariant')
    
    for variant in ProductVariant.objects.filter(sku=''):
        variant.sku = f"SKU-{uuid.uuid4().hex[:8].upper()}"
        variant.save()


def reverse_populate_sku_values(apps, schema_editor):
    """Обратная операция - очищаем sku"""
    ProductVariant = apps.get_model('catalog', 'ProductVariant')
    ProductVariant.objects.all().update(sku='')


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0018_remove_product_sku_productvariant_sku'),
    ]

    operations = [
        migrations.RunPython(populate_sku_values, reverse_populate_sku_values),
        migrations.AlterField(
            model_name='productvariant',
            name='sku',
            field=models.CharField(max_length=50, unique=True, default='', verbose_name='Код товара'),
        ),
    ]
