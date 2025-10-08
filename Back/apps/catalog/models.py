from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from mptt.models import MPTTModel, TreeForeignKey
from apps.core.models import MoneyField, TimestampedModel, AuditModel

User = get_user_model()


class Category(MPTTModel, TimestampedModel):
    """Категория товаров (дерево)"""
    name = models.CharField(max_length=200, verbose_name='Название')
    slug = models.SlugField(max_length=200, unique=True, verbose_name='URL')
    description = models.TextField(blank=True, verbose_name='Описание')
    image = models.ImageField(
        upload_to='categories/', 
        blank=True, 
        null=True, 
        verbose_name='Обложка',
        help_text='Рекомендуемый размер: 400x300px'
    )
    
    # SEO
    meta_title = models.CharField(max_length=200, blank=True, verbose_name='Meta заголовок')
    meta_description = models.TextField(blank=True, verbose_name='Meta описание')
    
    # Настройки
    is_active = models.BooleanField(default=True, verbose_name='Активна')
    is_featured = models.BooleanField(default=False, verbose_name='Рекомендуемая')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='Порядок сортировки')
    
    parent = TreeForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='children',
        verbose_name='Родительская категория'
    )
    
    class MPTTMeta:
        order_insertion_by = ['sort_order', 'name']
    
    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['sort_order', 'name']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    @property
    def full_name(self):
        """Полное название с иерархией"""
        ancestors = self.get_ancestors(include_self=True)
        return ' → '.join([ancestor.name for ancestor in ancestors])
    
    @property
    def level_indicator(self):
        """Индикатор уровня вложенности"""
        return '  ' * self.level + '└─ ' if self.level > 0 else ''
    
    def get_products_count(self):
        """Количество товаров в категории"""
        return self.products.filter(is_active=True).count()
    
    def get_children_count(self):
        """Количество подкатегорий"""
        return self.get_children().count()
    
    def has_children(self):
        """Есть ли подкатегории"""
        return self.get_children().exists()
    
    def get_breadcrumbs(self):
        """Хлебные крошки для навигации"""
        ancestors = self.get_ancestors(include_self=True)
        return [(cat.name, cat.get_absolute_url()) for cat in ancestors]


class ProductLabel(models.Model):
    """Лейблы товаров (Новинка, Хит, Сезонное предложение)"""
    name = models.CharField(max_length=50, unique=True, verbose_name='Название')
    color = models.CharField(max_length=7, default='#FF0000', verbose_name='Цвет фона')
    icon = models.CharField(max_length=50, blank=True, verbose_name='Иконка')
    description = models.TextField(blank=True, verbose_name='Описание')
    is_active = models.BooleanField(default=True, verbose_name='Активен')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='Порядок сортировки')
    
    class Meta:
        verbose_name = 'Лейбл товара'
        verbose_name_plural = 'Лейблы товаров'
        ordering = ['sort_order', 'name']
    
    def __str__(self):
        return self.name


class Volume(models.Model):
    """Объемы товаров (15мл, 30мл, 50мл и т.д.)"""
    name = models.CharField(max_length=20, unique=True, verbose_name='Название')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='Порядок сортировки')
    is_active = models.BooleanField(default=True, verbose_name='Активен')
    
    class Meta:
        verbose_name = 'Объем'
        verbose_name_plural = 'Объемы'
        ordering = ['sort_order', 'name']
    
    def __str__(self):
        return self.name


class ProductType(models.Model):
    """Типы продуктов (гидрофильное масло, энзимный мусс и т.д.)"""
    name = models.CharField(max_length=50, unique=True, verbose_name='Название')
    description = models.TextField(blank=True, verbose_name='Описание')
    icon = models.CharField(max_length=50, blank=True, verbose_name='Иконка')
    is_active = models.BooleanField(default=True, verbose_name='Активен')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='Порядок сортировки')
    
    class Meta:
        verbose_name = 'Тип продукта'
        verbose_name_plural = 'Типы продуктов'
        ordering = ['sort_order', 'name']
    
    def __str__(self):
        return self.name


class CareStage(models.Model):
    """Этапы ухода (очищение, тонизация, питание и т.д.)"""
    name = models.CharField(max_length=50, unique=True, verbose_name='Название')
    step_number = models.CharField(max_length=10, verbose_name='Номер этапа')
    description = models.TextField(blank=True, verbose_name='Описание')
    is_active = models.BooleanField(default=True, verbose_name='Активен')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='Порядок сортировки')
    
    class Meta:
        verbose_name = 'Этап ухода'
        verbose_name_plural = 'Этапы ухода'
        ordering = ['sort_order', 'step_number']
    
    def __str__(self):
        return f"{self.step_number} - {self.name}"


class ShelfLife(models.Model):
    """Сроки годности товаров"""
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')
    months = models.PositiveIntegerField(verbose_name='Месяцев')
    description = models.TextField(blank=True, verbose_name='Описание')
    is_active = models.BooleanField(default=True, verbose_name='Активен')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='Порядок сортировки')
    
    class Meta:
        verbose_name = 'Срок годности'
        verbose_name_plural = 'Сроки годности'
        ordering = ['sort_order', 'months']
    
    def __str__(self):
        return self.name


class Product(AuditModel):
    """Товар (SPU - Stock Keeping Unit)"""
    # Основная информация
    name = models.CharField(max_length=200, verbose_name='Название товара')
    slug = models.SlugField(max_length=200, unique=True, verbose_name='URL')
    
    # Связи
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='products', verbose_name='Категория')
    
    # Лейбл товара
    label = models.ForeignKey(ProductLabel, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='Лейбл')
    label_expires_at = models.DateTimeField(null=True, blank=True, verbose_name='Срок действия лейбла')
    
    # Описания
    card_description = models.TextField(default='', verbose_name='Описание в карточке товара')
    short_description = models.TextField(max_length=500, default='', verbose_name='Короткое описание на странице товара')
    full_description = models.TextField(default='', verbose_name='Полное описание')
    
    # Дополнительная информация о товаре
    action_effect = models.TextField(default='', verbose_name='Действие и эффект')
    composition = models.TextField(default='', verbose_name='Состав')
    application_method = models.TextField(default='', verbose_name='Способ применения')
    important_info = models.TextField(default='', verbose_name='Важно знать!')
    miraflores_comment = models.TextField(default='', verbose_name='Комментарий Miraflores')
    
    # Изображения
    main_image = models.ImageField(upload_to='products/main/', null=True, blank=True, verbose_name='Основная обложка')
    hover_image = models.ImageField(upload_to='products/hover/', null=True, blank=True, verbose_name='Изображение при ховере')
    
    # Атрибуты товара
    product_type = models.ForeignKey(ProductType, on_delete=models.PROTECT, null=True, blank=True, verbose_name='Тип продукта')
    care_purpose = models.CharField(
        max_length=100,
        choices=[
            ('face', 'Для кожи лица, декольте и рук'),
            ('eyes', 'Для кожи век'),
            ('body', 'Для сухих зон на теле (губ, кутикулы и тд.)'),
        ],
        default='face',
        blank=True,
        verbose_name='Для чего'
    )
    care_stage = models.ForeignKey(CareStage, on_delete=models.PROTECT, null=True, blank=True, verbose_name='Этап ухода')
    shelf_life = models.ForeignKey(ShelfLife, on_delete=models.PROTECT, null=True, blank=True, verbose_name='Срок годности')
    
    # SEO
    meta_title = models.CharField(max_length=200, blank=True, verbose_name='Meta заголовок')
    meta_description = models.TextField(blank=True, verbose_name='Meta описание')
    
    # Настройки
    is_active = models.BooleanField(default=True, verbose_name='Активен')
    is_featured = models.BooleanField(default=False, verbose_name='Рекомендуемый')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='Порядок сортировки')
    
    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        ordering = ['-is_featured', 'sort_order', 'name']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class ProductVariant(TimestampedModel):
    """Вариант товара с объемом и ценой"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants', verbose_name='Товар')
    volume = models.ForeignKey(Volume, on_delete=models.PROTECT, null=True, blank=True, verbose_name='Объем')
    sku = models.CharField(max_length=50, unique=True, default='', verbose_name='Код товара')
    
    # Цены
    price = MoneyField(default=0, verbose_name='Цена за данный объем')
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, verbose_name='Скидка', help_text='Скидка в процентах (например: 20.00)')
    currency = models.CharField(
        max_length=3,
        choices=[
            ('RUB', 'Рубли ₽'),
            ('USD', 'USD'),
            ('EUR', 'EUR'),
        ],
        default='RUB',
        verbose_name='Валюта'
    )
    
    # Физические характеристики
    length = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True, verbose_name='Длина', help_text='мм')
    width = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True, verbose_name='Ширина', help_text='мм')
    height = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True, verbose_name='Высота', help_text='мм')
    volume_cubic = models.DecimalField(max_digits=8, decimal_places=6, null=True, blank=True, verbose_name='Объем', help_text='м³ (рассчитывается автоматически по размерам)')
    weight = models.DecimalField(max_digits=8, decimal_places=3, null=True, blank=True, verbose_name='Вес', help_text='г')
    quantity = models.PositiveIntegerField(default=1, verbose_name='Количество')
    
    
    # Настройки
    is_active = models.BooleanField(default=True, verbose_name='Активен')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='Порядок сортировки')
    
    class Meta:
        verbose_name = 'Вариант товара'
        verbose_name_plural = 'Варианты товаров'
        ordering = ['sort_order']
    
    def __str__(self):
        volume_name = self.volume.name if self.volume else 'Без объема'
        return f"{self.product.name} - {volume_name}"
    
    @property
    def effective_price(self):
        """Эффективная цена (Цена - Скидка в %)"""
        if self.discount_percentage and self.discount_percentage > 0:
            discount_amount = self.price * (self.discount_percentage / 100)
            return self.price - discount_amount
        return self.price
    
    @property
    def discount_percentage_display(self):
        """Отображение процента скидки"""
        if self.discount_percentage and self.discount_percentage > 0:
            return f"{self.discount_percentage}%"
        return "0%"
    
    def calculate_volume_cubic(self):
        """Автоматический расчет объема в м³ на основе размеров"""
        if all([self.length, self.width, self.height]):
            # Переводим из мм в м и вычисляем объем
            length_m = float(self.length) / 1000
            width_m = float(self.width) / 1000
            height_m = float(self.height) / 1000
            volume = length_m * width_m * height_m
            return round(volume, 6)  # Округляем до 6 знаков после запятой
        return None
    
    def save(self, *args, **kwargs):
        """Переопределяем save для автоматического расчета объема"""
        # Автоматически рассчитываем объем если указаны все размеры
        if all([self.length, self.width, self.height]):
            self.volume_cubic = self.calculate_volume_cubic()
        super().save(*args, **kwargs)




class ProductGallery(TimestampedModel):
    """Галерея изображений товара (до 7 шт)"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='products/gallery/', verbose_name='Изображение')
    alt_text = models.CharField(max_length=200, blank=True, verbose_name='Alt текст')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='Порядок сортировки')
    
    class Meta:
        verbose_name = 'Изображение галереи'
        verbose_name_plural = 'Галерея изображений'
        ordering = ['sort_order']
    
    def __str__(self):
        return f"{self.product.name} - Изображение {self.sort_order}"
    
    def save(self, *args, **kwargs):
        # Ограничиваем количество изображений в галерее до 7
        if not self.pk:  # Только при создании нового объекта
            gallery_count = ProductGallery.objects.filter(product=self.product).count()
            if gallery_count >= 7:
                raise ValueError("Максимальное количество изображений в галерее - 7")
        super().save(*args, **kwargs)


class MediaAsset(TimestampedModel):
    """Медиафайлы товаров"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='media_assets')
    file = models.ImageField(upload_to='products/', verbose_name='Файл')
    alt_text = models.CharField(max_length=200, blank=True, verbose_name='Alt текст')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='Порядок сортировки')
    is_main = models.BooleanField(default=False, verbose_name='Главное изображение')
    
    class Meta:
        verbose_name = 'Медиафайл'
        verbose_name_plural = 'Медиафайлы'
        ordering = ['sort_order', 'created_at']
    
    def __str__(self):
        return f"{self.product.name} - {self.file.name}"


class Inventory(TimestampedModel):
    """Остатки товаров на складах"""
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, related_name='inventory')
    warehouse = models.CharField(max_length=100, verbose_name='Склад')
    quantity = models.PositiveIntegerField(default=0, verbose_name='Количество')
    reserved_quantity = models.PositiveIntegerField(default=0, verbose_name='Зарезервировано')
    
    class Meta:
        verbose_name = 'Остаток'
        verbose_name_plural = 'Остатки'
        unique_together = ['variant', 'warehouse']
    
    def __str__(self):
        return f"{self.variant} - {self.warehouse}: {self.quantity}"
    
    @property
    def available_quantity(self):
        return max(0, self.quantity - self.reserved_quantity)


class Price(TimestampedModel):
    """Цены товаров"""
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, related_name='prices')
    price_list = models.CharField(max_length=100, default='default', verbose_name='Прайс-лист')
    price = MoneyField(verbose_name='Цена')
    currency = models.CharField(max_length=3, default='RUB', verbose_name='Валюта')
    
    # Период действия
    valid_from = models.DateTimeField(null=True, blank=True, verbose_name='Действует с')
    valid_to = models.DateTimeField(null=True, blank=True, verbose_name='Действует до')
    
    class Meta:
        verbose_name = 'Цена'
        verbose_name_plural = 'Цены'
        unique_together = ['variant', 'price_list', 'valid_from']
    
    def __str__(self):
        return f"{self.variant} - {self.price} {self.currency}"