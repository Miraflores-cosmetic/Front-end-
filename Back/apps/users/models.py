from django.contrib.auth.models import AbstractUser
from django.db import models
from apps.core.models import TimestampedModel, Address


class User(AbstractUser):
    """Модель пользователя (покупатель или администратор)"""
    email = models.EmailField(unique=True, verbose_name='Email')
    phone = models.CharField(max_length=20, blank=True, verbose_name='Телефон')
    
    # ФИО (отдельные поля)
    first_name = models.CharField(max_length=150, verbose_name='Имя')
    last_name = models.CharField(max_length=150, verbose_name='Фамилия')
    middle_name = models.CharField(max_length=150, blank=True, verbose_name='Отчество')
    
    # Тип пользователя
    USER_TYPE_CHOICES = [
        ('customer', 'Покупатель'),
        ('admin', 'Администратор'),
    ]
    user_type = models.CharField(
        max_length=20, 
        choices=USER_TYPE_CHOICES, 
        default='customer',
        verbose_name='Тип пользователя'
    )
    
    # Роль администратора (только для админов)
    ADMIN_ROLE_CHOICES = [
        ('super_admin', 'Супер администратор'),
        ('manager', 'Менеджер'),
        ('content_manager', 'Контент-менеджер'),
        ('support', 'Поддержка'),
    ]
    admin_role = models.CharField(
        max_length=20, 
        choices=ADMIN_ROLE_CHOICES, 
        null=True, 
        blank=True,
        verbose_name='Роль администратора'
    )
    
    # Поля для покупателей
    birth_date = models.DateField(null=True, blank=True, verbose_name='Дата рождения')
    country = models.CharField(max_length=100, default='Россия', verbose_name='Страна')
    
    # Статус
    is_email_verified = models.BooleanField(default=False, verbose_name='Email подтвержден')
    has_telegram_auth = models.BooleanField(default=False, verbose_name='Авторизация через Telegram')
    
    # Источник регистрации
    REGISTRATION_SOURCES = [
        ('email', 'Email'),
        ('telegram', 'Telegram'),
    ]
    registration_source = models.CharField(
        max_length=20, 
        choices=REGISTRATION_SOURCES, 
        default='email',
        verbose_name='Источник регистрации'
    )
    
    # Настройки
    receive_notifications = models.BooleanField(default=True, verbose_name='Получать уведомления')
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создано')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Обновлено')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
    
    def __str__(self):
        if self.user_type == 'admin':
            return f"{self.first_name} {self.last_name} ({self.get_admin_role_display()})"
        return f"{self.first_name} {self.last_name} ({self.email})"
    
    @property
    def full_name(self):
        """Полное имя"""
        parts = [self.last_name, self.first_name]
        if self.middle_name:
            parts.append(self.middle_name)
        return ' '.join(parts)
    
    @property
    def is_customer(self):
        """Является ли покупателем"""
        return self.user_type == 'customer'
    
    @property
    def is_admin(self):
        """Является ли администратором"""
        return self.user_type == 'admin'


# Прокси-модели для разделения в админке
class AdminUser(User):
    """Прокси-модель для администраторов"""
    class Meta:
        proxy = True
        verbose_name = 'Администратор'
        verbose_name_plural = 'Администраторы'


class CustomerUser(User):
    """Прокси-модель для пользователей"""
    class Meta:
        proxy = True
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class UserAddress(Address):
    """Прокси-модель для адресов пользователей"""
    class Meta:
        proxy = True
        verbose_name = 'Адрес доставки'
        verbose_name_plural = 'Адреса доставки'


class UserSocialAuth(TimestampedModel):
    """Социальная аутентификация пользователей"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='social_auths')
    
    PROVIDER_CHOICES = [
        ('google', 'Google'),
        ('telegram', 'Telegram'),
        ('yandex', 'Yandex'),
    ]
    provider = models.CharField(max_length=20, choices=PROVIDER_CHOICES, verbose_name='Провайдер')
    external_id = models.CharField(max_length=100, verbose_name='Внешний ID')
    
    # Дополнительные данные
    email = models.EmailField(blank=True, verbose_name='Email из соцсети')
    first_name = models.CharField(max_length=100, blank=True, verbose_name='Имя')
    last_name = models.CharField(max_length=100, blank=True, verbose_name='Фамилия')
    avatar_url = models.URLField(blank=True, verbose_name='URL аватара')
    
    class Meta:
        verbose_name = 'Социальная аутентификация'
        verbose_name_plural = 'Социальные аутентификации'
        unique_together = ['provider', 'external_id']
    
    def __str__(self):
        return f"{self.user.email} - {self.provider}"


class Favorite(TimestampedModel):
    """Избранные товары пользователя"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    product = models.ForeignKey('catalog.Product', on_delete=models.CASCADE, related_name='favorites')
    
    class Meta:
        verbose_name = 'Избранное'
        verbose_name_plural = 'Избранное'
        unique_together = ['user', 'product']
    
    def __str__(self):
        return f"{self.user.email} - {self.product.name}"


class UserProfile(TimestampedModel):
    """Дополнительный профиль пользователя"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    # Настройки уведомлений
    email_orders = models.BooleanField(default=True, verbose_name='Уведомления о заказах')
    email_promotions = models.BooleanField(default=True, verbose_name='Промо-уведомления')
    
    # Предпочтения
    preferred_currency = models.CharField(max_length=3, default='RUB', verbose_name='Предпочитаемая валюта')
    preferred_language = models.CharField(max_length=5, default='ru', verbose_name='Предпочитаемый язык')
    
    class Meta:
        verbose_name = 'Профиль пользователя'
        verbose_name_plural = 'Профили пользователей'
    
    def __str__(self):
        return f"Профиль {self.user.email}"