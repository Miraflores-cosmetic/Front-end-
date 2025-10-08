# Miraflores Backend

Backend для интернет-магазина Miraflores на Django.

## Структура проекта

```
Back/
├── apps/
│   ├── core/           # Базовые модели и утилиты
│   ├── users/          # Пользователи и аутентификация
│   ├── catalog/        # Каталог товаров
│   ├── cart/           # Корзина
│   ├── checkout/       # Оформление заказа
│   ├── orders/         # Заказы
│   ├── shipping/       # Доставка (СДЭК)
│   ├── payments/       # Платежи (ЮKassa)
│   ├── erp/            # Интеграция с МойСклад
│   ├── webhooks/       # Вебхуки
│   ├── search/         # Поиск
│   ├── adminpanel/     # Админка
│   └── promotions/     # Скидки и промокоды
├── settings/
│   ├── base.py         # Базовые настройки
│   ├── dev.py          # Настройки разработки
│   └── prod.py         # Настройки продакшена
└── project/            # Основные настройки Django
```

## Установка и запуск

1. Создайте виртуальное окружение:
```bash
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate     # Windows
```

2. Установите зависимости:
```bash
pip install -r requirements.txt
```

3. Создайте файл `.env` на основе `env.example`:
```bash
cp env.example .env
```

4. Выполните миграции:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Создайте суперпользователя:
```bash
python manage.py createsuperuser
```

6. Запустите сервер:
```bash
python manage.py runserver
```

## API Endpoints

- `GET /api/health/` - Проверка здоровья API
- `GET /admin/` - Админка Django

## Интеграции

### ЮKassa
- Обработка платежей
- Вебхуки для уведомлений
- Возвраты

### СДЭК
- Расчет стоимости доставки
- Создание отправлений
- Отслеживание

### МойСклад
- Импорт товаров и остатков
- Экспорт заказов
- Синхронизация данных

## Разработка

Для разработки используется SQLite база данных. В продакшене рекомендуется PostgreSQL.

### Команды разработки

```bash
# Создание миграций
python manage.py makemigrations

# Применение миграций
python manage.py migrate

# Запуск сервера разработки
python manage.py runserver

# Создание суперпользователя
python manage.py createsuperuser

# Загрузка тестовых данных
python manage.py loaddata fixtures/initial_data.json
```
