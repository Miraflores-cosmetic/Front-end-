from django.db import models


class MoneyField(models.DecimalField):
    """Поле для денежных сумм"""
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('max_digits', 10)
        kwargs.setdefault('decimal_places', 2)
        super().__init__(*args, **kwargs)


class TimestampedModel(models.Model):
    """Базовая модель с временными метками"""
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создано')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Обновлено')
    
    class Meta:
        abstract = True


class AuditModel(TimestampedModel):
    """Модель с аудитом"""
    created_by = models.ForeignKey(
        'users.User', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='%(class)s_created',
        verbose_name='Создано пользователем'
    )
    updated_by = models.ForeignKey(
        'users.User', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='%(class)s_updated',
        verbose_name='Обновлено пользователем'
    )
    
    class Meta:
        abstract = True


class Address(models.Model):
    """Адрес для доставки"""
    DELIVERY_TYPE_CHOICES = [
        ('pickup', 'Самовывоз из ПВЗ'),
        ('courier', 'Доставка курьером'),
    ]
    
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='addresses')
    
    # Тип доставки
    delivery_type = models.CharField(
        max_length=20, 
        choices=DELIVERY_TYPE_CHOICES, 
        default='courier',
        verbose_name='Тип доставки'
    )
    
    # Основные поля
    first_name = models.CharField(max_length=100, verbose_name='Имя')
    last_name = models.CharField(max_length=100, verbose_name='Фамилия')
    middle_name = models.CharField(max_length=100, blank=True, verbose_name='Отчество')
    phone = models.CharField(max_length=20, verbose_name='Телефон')
    
    # Адрес (для курьерской доставки)
    country = models.CharField(max_length=100, default='Россия', verbose_name='Страна')
    region = models.CharField(max_length=100, blank=True, verbose_name='Регион')
    city = models.CharField(max_length=100, verbose_name='Город')
    postal_code = models.CharField(max_length=10, blank=True, verbose_name='Почтовый индекс')
    street = models.CharField(max_length=200, blank=True, verbose_name='Улица')
    house = models.CharField(max_length=20, blank=True, verbose_name='Дом')
    apartment = models.CharField(max_length=20, blank=True, verbose_name='Квартира')
    
    # ПВЗ (для самовывоза)
    pvz_name = models.CharField(max_length=200, blank=True, verbose_name='Название ПВЗ')
    pvz_address = models.CharField(max_length=300, blank=True, verbose_name='Адрес ПВЗ')
    pvz_phone = models.CharField(max_length=50, blank=True, verbose_name='Телефон ПВЗ')
    pvz_work_time = models.CharField(max_length=100, blank=True, verbose_name='Время работы ПВЗ')
    
    # СДЭК поля
    cdek_city_code = models.CharField(max_length=20, blank=True, verbose_name='Код города СДЭК')
    cdek_region_code = models.CharField(max_length=20, blank=True, verbose_name='Код региона СДЭК')
    cdek_pvz_code = models.CharField(max_length=20, blank=True, verbose_name='Код ПВЗ СДЭК')
    
    # Дополнительная информация
    comment = models.TextField(blank=True, verbose_name='Комментарий к доставке')
    is_default = models.BooleanField(default=False, verbose_name='По умолчанию')
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создано')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Обновлено')
    
    class Meta:
        verbose_name = 'Адрес доставки'
        verbose_name_plural = 'Адреса доставки'
        ordering = ['-is_default', '-created_at']
    
    def __str__(self):
        if self.delivery_type == 'pickup':
            return f"ПВЗ: {self.pvz_name} ({self.city})"
        else:
            return f"Курьер: {self.city}, {self.street}, {self.house}"
    
    @property
    def full_address(self):
        """Полный адрес для отображения"""
        if self.delivery_type == 'pickup':
            return f"{self.pvz_name}\n{self.pvz_address}\n{self.pvz_phone}\n{self.pvz_work_time}"
        else:
            address_parts = [self.city]
            if self.street:
                address_parts.append(f"{self.street}, {self.house}")
                if self.apartment:
                    address_parts.append(f"кв. {self.apartment}")
            return ", ".join(address_parts)


class OutboxEvent(models.Model):
    """События для отправки (Outbox Pattern)"""
    EVENT_TYPES = [
        ('order_created', 'Заказ создан'),
        ('order_paid', 'Заказ оплачен'),
        ('order_shipped', 'Заказ отправлен'),
        ('payment_created', 'Платеж создан'),
        ('payment_succeeded', 'Платеж успешен'),
        ('payment_failed', 'Платеж неуспешен'),
    ]
    
    event_type = models.CharField(max_length=50, choices=EVENT_TYPES, verbose_name='Тип события')
    aggregate_id = models.CharField(max_length=100, verbose_name='ID агрегата')
    payload = models.JSONField(verbose_name='Данные события')
    
    # Статус обработки
    STATUS_CHOICES = [
        ('pending', 'Ожидает'),
        ('processing', 'Обрабатывается'),
        ('completed', 'Завершено'),
        ('failed', 'Ошибка'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name='Статус')
    retry_count = models.PositiveIntegerField(default=0, verbose_name='Количество попыток')
    error_message = models.TextField(blank=True, verbose_name='Сообщение об ошибке')
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создано')
    processed_at = models.DateTimeField(null=True, blank=True, verbose_name='Обработано')
    
    class Meta:
        verbose_name = 'Событие'
        verbose_name_plural = 'События'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.event_type} - {self.aggregate_id}"