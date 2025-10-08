from django.db import models
from apps.core.models import MoneyField, TimestampedModel, AuditModel


class ShippingMethod(AuditModel):
    """Способ доставки"""
    name = models.CharField(max_length=100, verbose_name='Название')
    code = models.CharField(max_length=50, unique=True, verbose_name='Код')
    description = models.TextField(blank=True, verbose_name='Описание')
    
    # Провайдер
    PROVIDER_CHOICES = [
        ('cdek', 'СДЭК'),
        ('courier', 'Курьер'),
        ('pickup', 'Самовывоз'),
        ('post', 'Почта России'),
    ]
    provider = models.CharField(max_length=20, choices=PROVIDER_CHOICES, verbose_name='Провайдер')
    
    # Настройки
    is_active = models.BooleanField(default=True, verbose_name='Активен')
    is_default = models.BooleanField(default=False, verbose_name='По умолчанию')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='Порядок сортировки')
    
    # Ограничения
    min_weight = models.DecimalField(max_digits=8, decimal_places=3, null=True, blank=True, verbose_name='Мин. вес (кг)')
    max_weight = models.DecimalField(max_digits=8, decimal_places=3, null=True, blank=True, verbose_name='Макс. вес (кг)')
    min_order_amount = MoneyField(null=True, blank=True, verbose_name='Мин. сумма заказа')
    max_order_amount = MoneyField(null=True, blank=True, verbose_name='Макс. сумма заказа')
    
    class Meta:
        verbose_name = 'Способ доставки'
        verbose_name_plural = 'Способы доставки'
        ordering = ['sort_order', 'name']
    
    def __str__(self):
        return self.name


class ShippingRateQuote(TimestampedModel):
    """Квота тарифа доставки (кеш)"""
    method = models.ForeignKey(ShippingMethod, on_delete=models.CASCADE, related_name='quotes')
    
    # Параметры запроса
    from_city = models.CharField(max_length=100, verbose_name='Город отправления')
    to_city = models.CharField(max_length=100, verbose_name='Город получения')
    from_postal_code = models.CharField(max_length=10, blank=True, verbose_name='Индекс отправления')
    to_postal_code = models.CharField(max_length=10, blank=True, verbose_name='Индекс получения')
    
    # Физические параметры
    weight = models.DecimalField(max_digits=8, decimal_places=3, verbose_name='Вес (кг)')
    length = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True, verbose_name='Длина (см)')
    width = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True, verbose_name='Ширина (см)')
    height = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True, verbose_name='Высота (см)')
    
    # Результат
    cost = MoneyField(verbose_name='Стоимость')
    currency = models.CharField(max_length=3, default='RUB', verbose_name='Валюта')
    delivery_time_min = models.PositiveIntegerField(null=True, blank=True, verbose_name='Мин. дней доставки')
    delivery_time_max = models.PositiveIntegerField(null=True, blank=True, verbose_name='Макс. дней доставки')
    
    # Кеширование
    expires_at = models.DateTimeField(verbose_name='Истекает')
    is_valid = models.BooleanField(default=True, verbose_name='Действительна')
    
    class Meta:
        verbose_name = 'Квота доставки'
        verbose_name_plural = 'Квоты доставки'
        unique_together = ['method', 'from_city', 'to_city', 'weight', 'length', 'width', 'height']
    
    def __str__(self):
        return f"{self.method.name} - {self.from_city} → {self.to_city}"


class Fulfillment(AuditModel):
    """Отгрузка заказа"""
    order = models.ForeignKey('orders.Order', on_delete=models.CASCADE, related_name='fulfillments')
    shipping_method = models.ForeignKey(ShippingMethod, on_delete=models.PROTECT, verbose_name='Способ доставки')
    
    # Статус
    STATUS_CHOICES = [
        ('pending', 'Ожидает'),
        ('ready_to_ship', 'Готов к отправке'),
        ('shipped', 'Отправлен'),
        ('in_transit', 'В пути'),
        ('delivered', 'Доставлен'),
        ('failed', 'Ошибка доставки'),
        ('returned', 'Возвращен'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name='Статус')
    
    # Трекинг
    tracking_number = models.CharField(max_length=100, blank=True, verbose_name='Номер отслеживания')
    tracking_url = models.URLField(blank=True, verbose_name='URL отслеживания')
    
    # Адрес доставки
    recipient_name = models.CharField(max_length=200, verbose_name='Получатель')
    recipient_phone = models.CharField(max_length=20, verbose_name='Телефон получателя')
    delivery_address = models.TextField(verbose_name='Адрес доставки')
    
    # Временные метки
    shipped_at = models.DateTimeField(null=True, blank=True, verbose_name='Отправлен')
    delivered_at = models.DateTimeField(null=True, blank=True, verbose_name='Доставлен')
    
    # Дополнительная информация
    notes = models.TextField(blank=True, verbose_name='Примечания')
    
    class Meta:
        verbose_name = 'Отгрузка'
        verbose_name_plural = 'Отгрузки'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Отгрузка #{self.order.number} - {self.get_status_display()}"
