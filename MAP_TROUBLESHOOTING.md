# 🔧 Діагностика проблем з картою університетів

## Проблема: Карта не завантажується

### 1. Перевірка змінних середовища

Створіть файл `.env.local` в корені проекту з наступними змінними:

```env
VITE_SUPABASE_URL=ваш_supabase_url
VITE_SUPABASE_ANON_KEY=ваш_supabase_anon_key
```

### 2. Як отримати Supabase ключі:

1. Перейдіть на [supabase.com](https://supabase.com)
2. Створіть новий проект або відкрийте існуючий
3. Перейдіть в Settings → API
4. Скопіюйте:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`

### 3. Перевірка бази даних

Переконайтеся, що в Supabase є таблиці:
- `universities` - з полями: id, name, country, city, latitude, longitude, type, rating, tuition_fee_min, tuition_fee_max, currency, description
- `programs` - з полями: id, university_id, name, level, duration_months, tuition_fee

### 4. Запуск SQL скрипта

Виконайте скрипт `european_universities.sql` в Supabase SQL Editor для додавання університетів.

### 5. Перевірка консолі браузера

Відкрийте Developer Tools (F12) і перевірте:
- Помилки в Console
- Мережеві запити в Network
- Логи з UniversityMap компонента

### 6. Fallback режим

Якщо БД недоступна, карта покаже демо-дані з повідомленням:
> ⚠️ Використовуються демо-дані (БД недоступна)

### 7. Типові помилки:

#### "Supabase змінні середовища не налаштовані"
- Перевірте файл `.env.local`
- Перезапустіть dev сервер

#### "Failed to fetch"
- Перевірте інтернет з'єднання
- Перевірте Supabase URL

#### "Table does not exist"
- Виконайте SQL скрипт для створення таблиць

### 8. Тестування підключення

Додайте в консоль браузера:

```javascript
// Перевірка змінних середовища
console.log('SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('SUPABASE_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY);

// Тест підключення
import { supabase } from './app/lib/supabase.js';
supabase.from('universities').select('count').then(console.log);
```

### 9. Альтернативні рішення:

1. **Використання демо-даних**: Карта працюватиме з fallback даними
2. **Локальна база даних**: Використання SQLite або іншої локальної БД
3. **Статичні дані**: Повернення до статичного масиву університетів

### 10. Контакт для підтримки:

Якщо проблема залишається, перевірте:
- Версію Node.js (рекомендується 16+)
- Версію Vite (рекомендується 4+)
- Налаштування CORS в Supabase 