from django.db import models
from django.core.validators import MinValueValidator
from apps.core.models import MoneyField, AuditModel


class OrderStatus(models.Model):
    """Статусы заказов"""
    name = models.CharField(max_length=50, unique=True, verbose_name='Название статуса')
    code = models.CharField(max_length=20, unique=True, verbose_name='Код статуса')
    description = models.TextField(blank=True, verbose_name='Описание')
    color = models.CharField(max_length=7, default='#6c757d', verbose_name='Цвет статуса')
    is_active = models.BooleanField(default=True, verbose_name='Активен')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='Порядок сортировки')
    
    class Meta:
        verbose_name = 'Статус заказа'
        verbose_name_plural = 'Статусы заказов'
        ordering = ['sort_order', 'name']
    
    def __str__(self):
        return self.name


class Order(AuditModel):
    """Модель заказа"""
    
    PAYMENT_METHOD_CHOICES = [
        ('card', 'Банковская карта'),
        ('cash', 'Наличные'),
        ('transfer', 'Банковский перевод'),
        ('yookassa', 'ЮKassa'),
    ]
    
    EXPORT_STATUS_CHOICES = [
        ('pending', 'Ожидает выгрузки'),
        ('exported', 'Выгружен'),
        ('failed', 'Ошибка выгрузки'),
    ]
    
    # Основная информация
    number = models.CharField(max_length=50, unique=True, verbose_name='Номер заказа')
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='orders', verbose_name='Покупатель')
    
    # Сведения о заказчике
    user_ip = models.GenericIPAddressField(blank=True, null=True, verbose_name='IP пользователя')
    source = models.CharField(max_length=100, blank=True, verbose_name='Источник перехода')
    first_visit_date = models.DateTimeField(blank=True, null=True, verbose_name='Дата первого визита')
    
    # Сведения о заказе
    status = models.ForeignKey(OrderStatus, on_delete=models.PROTECT, related_name='orders', verbose_name='Статус заказа')
    order_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата заказа')
    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHOD_CHOICES, verbose_name='Способ оплаты')
    paid_amount = MoneyField(verbose_name='Оплаченная сумма')
    export_status = models.CharField(max_length=20, choices=EXPORT_STATUS_CHOICES, default='pending', verbose_name='Статус выгрузки')
    
    # Сведения о доставке
    delivery_cost = MoneyField(default=0, verbose_name='Стоимость доставки')
    delivery_days = models.PositiveIntegerField(blank=True, null=True, verbose_name='Срок доставки (дни)')
    delivery_address = models.ForeignKey('core.Address', on_delete=models.PROTECT, verbose_name='Адрес доставки')
    delivery_city = models.CharField(max_length=100, verbose_name='Населенный пункт')
    
    # Итого
    total_amount = MoneyField(verbose_name='Сумма товаров')
    total_weight = models.DecimalField(max_digits=8, decimal_places=2, default=0, verbose_name='Вес (кг)')
    promo_code = models.CharField(max_length=50, blank=True, verbose_name='Промокод')
    discount_amount = MoneyField(default=0, verbose_name='Сумма скидки')
    final_amount = MoneyField(verbose_name='Сумма к оплате')
    
    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
        ordering = ['-order_date']
    
    def __str__(self):
        return f"Заказ #{self.number} - {self.user.email}"
    
    def save(self, *args, **kwargs):
        if not self.number:
            # Генерируем номер заказа
            import uuid
            self.number = f"ORD-{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)


class OrderLine(models.Model):
    """Позиции заказа"""
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='lines', verbose_name='Заказ')
    product_variant = models.ForeignKey('catalog.ProductVariant', on_delete=models.PROTECT, verbose_name='Товар')
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)], verbose_name='Количество')
    price = MoneyField(verbose_name='Цена за единицу')
    total = MoneyField(verbose_name='Общая стоимость')
    
    class Meta:
        verbose_name = 'Позиция заказа'
        verbose_name_plural = 'Позиции заказа'
        ordering = ['id']
    
    def __str__(self):
        return f"{self.product_variant} x {self.quantity} = {self.total}"
    
    def save(self, *args, **kwargs):
        # Автоматически рассчитываем общую стоимость
        self.total = self.price * self.quantity
        super().save(*args, **kwargs)


class OrderStatusTransition(models.Model):
    """История изменений статуса заказа"""
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='status_transitions', verbose_name='Заказ')
    from_status = models.ForeignKey(OrderStatus, on_delete=models.SET_NULL, null=True, blank=True, related_name='transitions_from', verbose_name='Из статуса')
    to_status = models.ForeignKey(OrderStatus, on_delete=models.PROTECT, related_name='transitions_to', verbose_name='В статус')
    comment = models.TextField(blank=True, verbose_name='Комментарий')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата изменения')
    created_by = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, blank=True, verbose_name='Изменено пользователем')
    
    class Meta:
        verbose_name = 'Переход статуса'
        verbose_name_plural = 'Переходы статусов'
        ordering = ['-created_at']
    
    def __str__(self):
        from_name = self.from_status.name if self.from_status else 'Новый'
        return f"{self.order.number}: {from_name} → {self.to_status.name}"