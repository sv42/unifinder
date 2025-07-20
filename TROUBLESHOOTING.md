# 🔧 Виправлення проблем

## Проблема 1: "Invalid URL" помилка

### Причина:
Неправильний формат URL в `.env.local` файлі

### Рішення:
1. Відкрий файл `.env.local`
2. Переконайся, що URL має правильний формат:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   ```
3. URL має:
   - Починатися з `https://`
   - Закінчуватися на `.supabase.co`
   - Не містити пробілів

### Приклад правильного URL:
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
```

## Проблема 2: React Router помилка

### Причина:
Проблема з створенням папки `.react-router\types`

### Рішення:
1. Зупини сервер (Ctrl+C)
2. Видали папку `.react-router` якщо вона існує
3. Перезапусти сервер:
   ```bash
   npm run dev
   ```

## Проблема 3: "relation already exists" в Supabase

### Причина:
Таблиці вже існують в базі даних

### Рішення:
Використай оновлений SQL код з файлу `uni.md` - він містить `IF NOT EXISTS` перевірки.

## 📋 Покрокова інструкція:

### 1. Виправи .env.local файл:
```env
# Заміни на реальні значення з твого Supabase проекту
VITE_SUPABASE_URL=https://твій-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=твій-anon-public-key
```

### 2. Запусти SQL в Supabase:
- Перейди в SQL Editor
- Скопіюй код з `uni.md`
- Натисни Run

### 3. Перезапусти проект:
```bash
npm run dev
```

### 4. Перевір результат:
- Відкрий http://localhost:5173
- Побачиш статус підключення до Supabase
- Якщо все правильно - побачиш список університетів

## 🔍 Як перевірити правильність ключів:

1. Перейди в Supabase Dashboard
2. Settings → API
3. Скопіюй **Project URL** та **anon public key**
4. Встав в `.env.local`

## ⚠️ Важливо:
- Не коміть `.env.local` в Git
- Не показуй ключі нікому
- Перезапускай сервер після зміни `.env.local`

---

Якщо проблеми залишаються - пиши, допоможу! 😊 