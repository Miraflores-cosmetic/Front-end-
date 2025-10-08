from django.contrib import admin
from .models import OutboxEvent


@admin.register(OutboxEvent)
class OutboxEventAdmin(admin.ModelAdmin):
    """Админка для событий"""
    list_display = ('event_type', 'aggregate_id', 'status', 'retry_count', 'created_at', 'processed_at')
    list_filter = ('event_type', 'status', 'created_at')
    search_fields = ('aggregate_id', 'event_type')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'processed_at', 'retry_count')
    
    fieldsets = (
        ('Событие', {'fields': ('event_type', 'aggregate_id', 'payload')}),
        ('Статус', {'fields': ('status', 'retry_count', 'error_message')}),
        ('Временные метки', {'fields': ('created_at', 'processed_at')}),
    )