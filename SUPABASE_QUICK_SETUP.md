# 🚀 Швидке налаштування Supabase для карти університетів

## Крок 1: Створення файлу .env.local

Створіть файл `.env.local` в корені проекту з наступним вмістом:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Крок 2: Отримання ключів Supabase

1. **Перейдіть на [supabase.com](https://supabase.com)**
2. **Створіть новий проект** або відкрийте існуючий
3. **Перейдіть в Settings → API**
4. **Скопіюйте:**
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`

## Крок 3: Запуск SQL скрипта

1. **Перейдіть в SQL Editor** в Supabase
2. **Скопіюйте та виконайте** вміст файлу `european_universities.sql`
3. **Перевірте** що таблиці створені в Database → Tables

## Крок 4: Перезапуск проекту

```bash
npm run dev
```

## Крок 5: Перевірка

Відкрийте карту університетів - тепер вона повинна показувати всі університети з бази даних!

## Типові помилки:

### "Supabase змінні середовища не налаштовані"
- Перевірте файл `.env.local`
- Перезапустіть dev сервер

### "Failed to fetch"
- Перевірте Supabase URL
- Перевірте інтернет з'єднання

### "Table does not exist"
- Виконайте SQL скрипт `european_universities.sql`

## Альтернатива:

Якщо не хочете налаштовувати Supabase, карта працюватиме з демо-даними автоматично. 