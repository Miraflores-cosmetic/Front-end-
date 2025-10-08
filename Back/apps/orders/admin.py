from django.contrib import admin
from django.utils.html import format_html
from .models import OrderStatus, Order, OrderLine, OrderStatusTransition


@admin.register(OrderStatus)
class OrderStatusAdmin(admin.ModelAdmin):
    """Админка для статусов заказов"""
    list_display = ('name', 'code', 'color_preview', 'is_active', 'sort_order', 'orders_count')
    list_filter = ('is_active',)
    search_fields = ('name', 'code', 'description')
    ordering = ('sort_order', 'name')
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'code', 'description', 'color')
        }),
        ('Настройки', {
            'fields': ('is_active', 'sort_order')
        }),
    )
    
    def color_preview(self, obj):
        """Превью цвета статуса"""
        return format_html(
            '<span style="display: inline-block; width: 20px; height: 20px; background-color: {}; border: 1px solid #ccc; border-radius: 3px;"></span>',
            obj.color
        )
    color_preview.short_description = 'Цвет'
    
    def orders_count(self, obj):
        """Количество заказов с этим статусом"""
        return obj.orders.count()
    orders_count.short_description = 'Заказов'


class OrderLineInline(admin.TabularInline):
    """Инлайн для позиций заказа"""
    model = OrderLine
    extra = 0
    fields = ('product_variant', 'quantity', 'price', 'total')
    readonly_fields = ('total',)
    
    def get_queryset(self, request):
        """Оптимизация запросов"""
        return super().get_queryset(request).select_related('product_variant')


class OrderStatusTransitionInline(admin.TabularInline):
    """Инлайн для истории статусов"""
    model = OrderStatusTransition
    extra = 0
    fields = ('from_status', 'to_status', 'comment', 'created_at', 'created_by')
    readonly_fields = ('created_at',)
    
    def get_queryset(self, request):
        """Оптимизация запросов"""
        return super().get_queryset(request).select_related('created_by')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    """Админка для заказов"""
    list_display = ('number', 'user', 'status', 'final_amount', 'order_date', 'payment_method', 'export_status')
    list_filter = ('status', 'payment_method', 'export_status', 'order_date', 'created_at', 'user__user_type')
    search_fields = ('number', 'user__email', 'user__first_name', 'user__last_name', 'delivery_city', 'promo_code')
    ordering = ('-order_date',)
    readonly_fields = ('number', 'order_date', 'created_at', 'updated_at')
    date_hierarchy = 'order_date'
    
    inlines = [OrderLineInline, OrderStatusTransitionInline]
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('number', 'user', 'status', 'order_date', 'payment_method', 'paid_amount', 'export_status')
        }),
        ('Сведения о заказчике', {
            'fields': ('user_ip', 'source', 'first_visit_date'),
            'classes': ('collapse',)
        }),
        ('Доставка', {
            'fields': ('delivery_address', 'delivery_city', 'delivery_cost', 'delivery_days')
        }),
        ('Расчеты', {
            'fields': ('total_amount', 'total_weight', 'promo_code', 'discount_amount', 'final_amount')
        }),
        ('Системная информация', {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        """Оптимизация запросов"""
        return super().get_queryset(request).select_related('user', 'delivery_address')
    
    def save_model(self, request, obj, form, change):
        """Автозаполнение системных полей"""
        if not change:  # При создании нового заказа
            obj.created_by = request.user
        else:
            obj.updated_by = request.user
        super().save_model(request, obj, form, change)
    
    def get_total_lines(self, obj):
        """Количество позиций в заказе"""
        return obj.lines.count()
    get_total_lines.short_description = 'Позиций'
    
    def get_total_quantity(self, obj):
        """Общее количество товаров"""
        return sum(line.quantity for line in obj.lines.all())
    get_total_quantity.short_description = 'Товаров'


@admin.register(OrderLine)
class OrderLineAdmin(admin.ModelAdmin):
    """Админка для позиций заказа"""
    list_display = ('order', 'product_variant', 'quantity', 'price', 'total')
    list_filter = ('order__status', 'order__order_date')
    search_fields = ('order__number', 'product_variant__product__name')
    ordering = ('-order__order_date',)
    
    def get_queryset(self, request):
        """Оптимизация запросов"""
        return super().get_queryset(request).select_related('order', 'product_variant__product')


@admin.register(OrderStatusTransition)
class OrderStatusTransitionAdmin(admin.ModelAdmin):
    """Админка для переходов статусов"""
    list_display = ('order', 'from_status', 'to_status', 'created_at', 'created_by')
    list_filter = ('to_status', 'created_at')
    search_fields = ('order__number', 'comment')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)
    
    def get_queryset(self, request):
        """Оптимизация запросов"""
        return super().get_queryset(request).select_related('order', 'created_by')
