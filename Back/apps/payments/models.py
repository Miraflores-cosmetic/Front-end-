from django.db import models
from apps.core.models import MoneyField, TimestampedModel, AuditModel


class Payment(AuditModel):
    """Платеж"""
    order = models.ForeignKey('orders.Order', on_delete=models.CASCADE, related_name='payments')
    
    # Внешние ID
    yukassa_payment_id = models.CharField(max_length=100, unique=True, verbose_name='ID платежа ЮKassa')
    yukassa_payment_url = models.URLField(blank=True, verbose_name='URL оплаты ЮKassa')
    
    # Сумма
    amount = MoneyField(verbose_name='Сумма')
    currency = models.CharField(max_length=3, default='RUB', verbose_name='Валюта')
    
    # Статус
    STATUS_CHOICES = [
        ('pending', 'Ожидает'),
        ('waiting_for_capture', 'Ожидает подтверждения'),
        ('succeeded', 'Успешен'),
        ('canceled', 'Отменен'),
        ('failed', 'Неуспешен'),
    ]
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending', verbose_name='Статус')
    
    # Способ оплаты
    PAYMENT_METHOD_CHOICES = [
        ('bank_card', 'Банковская карта'),
        ('yoo_money', 'ЮMoney'),
        ('qiwi', 'QIWI'),
        ('webmoney', 'WebMoney'),
        ('alfabank', 'Альфа-Банк'),
        ('sberbank', 'Сбербанк'),
        ('tinkoff', 'Тинькофф'),
        ('installments', 'Рассрочка'),
    ]
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, verbose_name='Способ оплаты')
    
    # Временные метки
    paid_at = models.DateTimeField(null=True, blank=True, verbose_name='Оплачен')
    expired_at = models.DateTimeField(null=True, blank=True, verbose_name='Истекает')
    
    # Дополнительная информация
    description = models.TextField(blank=True, verbose_name='Описание')
    metadata = models.JSONField(default=dict, blank=True, verbose_name='Метаданные')
    
    class Meta:
        verbose_name = 'Платеж'
        verbose_name_plural = 'Платежи'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Платеж #{self.yukassa_payment_id} - {self.amount} {self.currency}"


class Refund(AuditModel):
    """Возврат платежа"""
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name='refunds')
    
    # Внешние ID
    yukassa_refund_id = models.CharField(max_length=100, unique=True, verbose_name='ID возврата ЮKassa')
    
    # Сумма
    amount = MoneyField(verbose_name='Сумма возврата')
    currency = models.CharField(max_length=3, default='RUB', verbose_name='Валюта')
    
    # Статус
    STATUS_CHOICES = [
        ('pending', 'Ожидает'),
        ('succeeded', 'Успешен'),
        ('canceled', 'Отменен'),
        ('failed', 'Неуспешен'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name='Статус')
    
    # Причина
    reason = models.TextField(verbose_name='Причина возврата')
    
    # Временные метки
    processed_at = models.DateTimeField(null=True, blank=True, verbose_name='Обработан')
    
    class Meta:
        verbose_name = 'Возврат'
        verbose_name_plural = 'Возвраты'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Возврат #{self.yukassa_refund_id} - {self.amount} {self.currency}"


class Receipt(AuditModel):
    """Чек фискализации"""
    order = models.ForeignKey('orders.Order', on_delete=models.CASCADE, related_name='receipts')
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name='receipts')
    
    # Внешние ID
    fiscal_provider = models.CharField(max_length=50, verbose_name='Провайдер фискализации')
    external_id = models.CharField(max_length=100, verbose_name='Внешний ID чека')
    fiscal_document_number = models.CharField(max_length=50, blank=True, verbose_name='Номер фискального документа')
    fiscal_document_id = models.CharField(max_length=50, blank=True, verbose_name='ID фискального документа')
    
    # Статус
    STATUS_CHOICES = [
        ('pending', 'Ожидает'),
        ('processing', 'Обрабатывается'),
        ('succeeded', 'Успешен'),
        ('failed', 'Неуспешен'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name='Статус')
    
    # Ссылки
    receipt_url = models.URLField(blank=True, verbose_name='URL чека')
    qr_code_url = models.URLField(blank=True, verbose_name='URL QR-кода')
    
    # Сумма
    amount = MoneyField(verbose_name='Сумма чека')
    tax_amount = MoneyField(default=0, verbose_name='Сумма НДС')
    
    # Временные метки
    processed_at = models.DateTimeField(null=True, blank=True, verbose_name='Обработан')
    
    # Ошибки
    error_message = models.TextField(blank=True, verbose_name='Сообщение об ошибке')
    
    class Meta:
        verbose_name = 'Чек'
        verbose_name_plural = 'Чеки'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Чек #{self.external_id} - {self.amount} {self.payment.currency}"
