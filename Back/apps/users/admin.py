from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, AdminUser, CustomerUser, Favorite, UserAddress
from apps.core.models import Address
from apps.orders.models import Order


@admin.register(AdminUser)
class AdminUserAdmin(UserAdmin):
    """Админка для администраторов магазина"""
    list_display = ('email', 'first_name', 'last_name', 'admin_role', 'is_active', 'created_at')
    list_filter = ('admin_role', 'is_active', 'is_superuser', 'created_at')
    search_fields = ('email', 'first_name', 'last_name', 'phone')
    ordering = ('-created_at',)
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Персональная информация', {'fields': ('first_name', 'last_name', 'middle_name', 'email', 'phone')}),
        ('Роль администратора', {'fields': ('admin_role',)}),
            ('Права доступа', {'fields': ('is_active', 'is_superuser', 'user_permissions')}),
        ('Важные даты', {'fields': ('last_login', 'date_joined')}),
    )
    
    def get_queryset(self, request):
        """Показывать только администраторов"""
        return super().get_queryset(request).filter(user_type='admin')
    
    class Meta:
        verbose_name = 'Администратор'
        verbose_name_plural = 'Администраторы'


@admin.register(CustomerUser)
class CustomerUserAdmin(UserAdmin):
    """Админка для пользователей"""
    list_display = ('email', 'full_name', 'birth_date', 'phone', 'country', 'is_email_verified', 'has_telegram_auth', 'is_active', 'created_at')
    list_filter = ('is_active', 'is_email_verified', 'has_telegram_auth', 'country', 'registration_source', 'created_at')
    search_fields = ('email', 'first_name', 'last_name', 'phone')
    ordering = ('-created_at',)
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Контактная информация', {'fields': ('email', 'phone', 'country')}),
        ('Персональная информация', {'fields': ('first_name', 'last_name', 'middle_name', 'birth_date')}),
        ('Статус и настройки', {'fields': ('is_active', 'is_email_verified', 'has_telegram_auth', 'receive_notifications', 'registration_source')}),
    )
    
    def get_queryset(self, request):
        """Показывать только покупателей"""
        return super().get_queryset(request).filter(user_type='customer')
    
    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class AddressInline(admin.TabularInline):
    """Инлайн для адресов доставки пользователя"""
    from apps.core.models import Address
    model = Address
    extra = 0
    fields = ('delivery_type', 'city', 'street', 'house', 'is_default', 'created_at')
    readonly_fields = ('created_at',)
    
    def get_queryset(self, request):
        """Оптимизация запросов"""
        return super().get_queryset(request).select_related('user')


class OrderInline(admin.TabularInline):
    """Инлайн для заказов пользователя"""
    model = Order
    fk_name = 'user'  # Указываем поле связи
    extra = 0
    fields = ('number', 'status', 'final_amount', 'order_date', 'payment_method')
    readonly_fields = ('number', 'order_date')
    
    def get_queryset(self, request):
        """Оптимизация запросов"""
        return super().get_queryset(request).select_related('user')


# Обновляем CustomerUserAdmin с инлайнами
CustomerUserAdmin.inlines = [AddressInline, OrderInline]


class AddressAdmin(admin.ModelAdmin):
    """Базовая админка для адресов доставки"""
    list_display = ('user', 'delivery_type', 'city', 'street', 'house', 'is_default', 'created_at')
    list_filter = ('delivery_type', 'is_default', 'country', 'created_at')
    search_fields = ('user__email', 'user__first_name', 'user__last_name', 'city', 'street', 'pvz_name')
    ordering = ('-created_at',)
    
    class Media:
        js = ('admin/js/address_autofill.js',)
    
    fieldsets = (
        ('Пользователь', {'fields': ('user',)}),
        ('Тип доставки', {'fields': ('delivery_type',)}),
        ('Контактная информация', {
            'fields': ('first_name', 'last_name', 'middle_name', 'phone'),
            'description': 'Можно заполнить вручную или оставить пустым для автозаполнения из профиля пользователя'
        }),
        ('Адрес доставки', {
            'fields': ('country', 'region', 'city', 'postal_code', 'street', 'house', 'apartment'),
            'description': 'Заполняется для курьерской доставки'
        }),
        ('ПВЗ', {
            'fields': ('pvz_name', 'pvz_address', 'pvz_phone', 'pvz_work_time'),
            'description': 'Заполняется для самовывоза'
        }),
        ('СДЭК', {'fields': ('cdek_city_code', 'cdek_region_code', 'cdek_pvz_code')}),
        ('Дополнительно', {'fields': ('comment', 'is_default')}),
    )
    
    def get_queryset(self, request):
        """Оптимизация запросов"""
        return super().get_queryset(request).select_related('user')
    
    def save_model(self, request, obj, form, change):
        """Автозаполнение контактных данных из профиля пользователя"""
        if not change:  # Только при создании нового адреса
            if not obj.first_name and obj.user.first_name:
                obj.first_name = obj.user.first_name
            if not obj.last_name and obj.user.last_name:
                obj.last_name = obj.user.last_name
            if not obj.middle_name and hasattr(obj.user, 'middle_name') and obj.user.middle_name:
                obj.middle_name = obj.user.middle_name
            if not obj.phone and obj.user.phone:
                obj.phone = obj.user.phone
        
        super().save_model(request, obj, form, change)


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__email', 'product__name')
    ordering = ('-created_at',)


# Регистрируем UserAddress в разделе пользователей
@admin.register(UserAddress)
class UserAddressAdmin(AddressAdmin):
    """Админка для адресов доставки пользователей"""
    pass

