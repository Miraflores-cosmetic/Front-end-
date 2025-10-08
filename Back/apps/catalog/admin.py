from django.contrib import admin
from django.utils.html import format_html
from mptt.admin import MPTTModelAdmin
from .models import (
    Category, ProductLabel, Volume, ProductType, CareStage, ShelfLife,
    Product, ProductVariant, ProductGallery, MediaAsset, Inventory, Price
)
from apps.orders.models import OrderLine

# Настройка порядка отображения в админке
admin.site.index_title = 'Администрирование'
admin.site.site_header = 'Miraflores Admin'
admin.site.site_title = 'Miraflores'


# ===== ОСНОВНЫЕ МОДЕЛИ =====

@admin.register(Category)
class CategoryAdmin(MPTTModelAdmin):
    list_display = ('name', 'image_preview', 'is_active', 'is_featured', 'products_count', 'children_count', 'sort_order')
    list_filter = ('is_active', 'is_featured', 'created_at')
    search_fields = ('name', 'slug', 'description')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at', 'image_preview')
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'slug', 'parent', 'description', 'image', 'image_preview')
        }),
        ('Настройки', {
            'fields': ('is_active', 'is_featured', 'sort_order')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',)
        }),
        ('Системная информация', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def image_preview(self, obj):
        """Превью изображения"""
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 50px; max-height: 50px;" />',
                obj.image.url
            )
        return "Нет изображения"
    image_preview.short_description = 'Обложка'
    
    def products_count(self, obj):
        """Количество товаров"""
        return obj.get_products_count()
    products_count.short_description = 'Товаров'
    
    def children_count(self, obj):
        """Количество подкатегорий"""
        return obj.get_children_count()
    children_count.short_description = 'Подкатегорий'


class ProductGalleryInline(admin.TabularInline):
    """Инлайн для галереи изображений товара"""
    model = ProductGallery
    extra = 0
    fields = ('image', 'alt_text', 'sort_order')
    max_num = 7  # Максимум 7 изображений


class MediaAssetInline(admin.TabularInline):
    model = MediaAsset
    extra = 1


class ProductVariantInline(admin.StackedInline):
    model = ProductVariant
    extra = 1
    fields = (
        ('volume', 'sku', 'price', 'currency', 'discount_percentage'),
        ('length', 'width', 'height', 'volume_cubic'),
        ('weight', 'quantity', 'is_active')
    )
    readonly_fields = ('volume_cubic',)
    verbose_name_plural = ''
    
    def get_formset(self, request, obj=None, **kwargs):
        formset = super().get_formset(request, obj, **kwargs)
        formset.verbose_name_plural = ''
        return formset


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'product_type', 'label', 'is_active', 'is_featured', 'created_at')
    list_filter = ('is_active', 'is_featured', 'category', 'product_type', 'care_purpose', 'care_stage', 'label', 'created_at')
    search_fields = ('name', 'slug', 'card_description', 'short_description')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at', 'main_image_preview', 'hover_image_preview')
    inlines = [ProductGalleryInline, MediaAssetInline, ProductVariantInline]
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'slug', 'category', 'label', 'label_expires_at')
        }),
        ('Описания', {
            'fields': ('card_description', 'short_description', 'full_description')
        }),
        ('Дополнительная информация', {
            'fields': ('action_effect', 'composition', 'application_method', 'important_info', 'miraflores_comment')
        }),
        ('Изображения', {
            'fields': ('main_image', 'main_image_preview', 'hover_image', 'hover_image_preview')
        }),
        ('Атрибуты товара', {
            'fields': ('product_type', 'care_purpose', 'care_stage', 'shelf_life')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',)
        }),
        ('Настройки', {
            'fields': ('is_active', 'is_featured', 'sort_order')
        }),
        ('Системная информация', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def main_image_preview(self, obj):
        """Превью основной обложки"""
        if obj.main_image:
            return format_html(
                '<img src="{}" style="max-width: 100px; max-height: 100px;" />',
                obj.main_image.url
            )
        return "Нет изображения"
    main_image_preview.short_description = 'Превью основной обложки'
    
    def hover_image_preview(self, obj):
        """Превью изображения при ховере"""
        if obj.hover_image:
            return format_html(
                '<img src="{}" style="max-width: 100px; max-height: 100px;" />',
                obj.hover_image.url
            )
        return "Нет изображения"
    hover_image_preview.short_description = 'Превью изображения при ховере'


class OrderLineInline(admin.TabularInline):
    """Инлайн для строк заказов в вариантах товаров"""
    model = OrderLine
    extra = 0
    readonly_fields = ('order', 'quantity', 'price', 'total')
    fields = ('order', 'quantity', 'price', 'total')
    fk_name = 'product_variant'


@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ('product', 'volume', 'sku', 'price', 'currency', 'discount_percentage', 'effective_price', 'discount_percentage_display', 'is_active')
    list_filter = ('is_active', 'product__category', 'product__product_type', 'volume')
    search_fields = ('product__name', 'sku')
    raw_id_fields = ('product',)
    readonly_fields = ('volume_cubic',)
    inlines = [OrderLineInline]
    
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('product', 'volume', 'sku', 'is_active', 'sort_order')
        }),
        ('Цены', {
            'fields': ('price', 'currency', 'discount_percentage')
        }),
        ('Физические характеристики', {
            'fields': ('length', 'width', 'height', 'volume_cubic', 'weight', 'quantity'),
            'classes': ('collapse',),
            'description': 'Объем рассчитывается автоматически при указании всех размеров'
        }),
    )
    
    def effective_price(self, obj):
        return obj.effective_price
    effective_price.short_description = 'Эффективная цена'
    
    def discount_percentage_display(self, obj):
        return obj.discount_percentage_display
    discount_percentage_display.short_description = 'Скидка %'


# ===== СПРАВОЧНИКИ =====

@admin.register(ProductLabel)
class ProductLabelAdmin(admin.ModelAdmin):
    """Админка для лейблов товаров"""
    list_display = ('name', 'color_preview', 'is_active', 'sort_order')
    list_filter = ('is_active',)
    search_fields = ('name', 'description')
    ordering = ('sort_order', 'name')
    
    def color_preview(self, obj):
        if obj.color:
            return format_html(
                '<span style="background-color: {}; color: white; padding: 2px 8px; border-radius: 3px;">{}</span>',
                obj.color, obj.color
            )
        return '-'
    color_preview.short_description = 'Цвет'


@admin.register(Volume)
class VolumeAdmin(admin.ModelAdmin):
    """Админка для объемов"""
    list_display = ('name', 'is_active', 'sort_order')
    list_filter = ('is_active',)
    search_fields = ('name',)
    ordering = ('sort_order', 'name')


@admin.register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    """Админка для типов продуктов"""
    list_display = ('name', 'icon', 'is_active', 'sort_order')
    list_filter = ('is_active',)
    search_fields = ('name', 'description')
    ordering = ('sort_order', 'name')


@admin.register(CareStage)
class CareStageAdmin(admin.ModelAdmin):
    """Админка для этапов ухода"""
    list_display = ('step_number', 'name', 'is_active', 'sort_order')
    list_filter = ('is_active',)
    search_fields = ('name', 'step_number', 'description')
    ordering = ('sort_order', 'step_number')


@admin.register(ShelfLife)
class ShelfLifeAdmin(admin.ModelAdmin):
    """Админка для сроков годности"""
    list_display = ('name', 'months', 'is_active', 'sort_order')
    list_filter = ('is_active', 'months')
    search_fields = ('name', 'description')
    ordering = ('sort_order', 'months')


# ===== ДОПОЛНИТЕЛЬНЫЕ МОДЕЛИ =====

@admin.register(ProductGallery)
class ProductGalleryAdmin(admin.ModelAdmin):
    list_display = ('product', 'image', 'alt_text', 'sort_order')
    list_filter = ('product', 'created_at')
    search_fields = ('product__name', 'alt_text')


@admin.register(MediaAsset)
class MediaAssetAdmin(admin.ModelAdmin):
    list_display = ('product', 'file', 'is_main', 'sort_order')
    list_filter = ('is_main', 'created_at')


@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ('variant', 'warehouse', 'quantity', 'reserved_quantity')
    list_filter = ('warehouse',)


@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    list_display = ('variant', 'price_list', 'price', 'currency', 'valid_from', 'valid_to')
    list_filter = ('price_list', 'currency', 'valid_from', 'valid_to')


# Регистрация моделей происходит через @admin.register декораторы
