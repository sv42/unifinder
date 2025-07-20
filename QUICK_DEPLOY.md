# ⚡ Швидкий деплой на Vercel

## 🚀 Кроки (5 хвилин):

### 1. Підготуй проект
```bash
# Переконайся, що все працює локально
npm run build
```

### 2. Зареєструйся на Vercel
- Перейди на [vercel.com](https://vercel.com)
- Натисни "Continue with GitHub"
- Авторизуйся через GitHub

### 3. Деплой
- Натисни "New Project"
- Вибері твій репозиторій `university-finder`
- Vercel автоматично визначить налаштування
- Натисни "Deploy"

### 4. Налаштування змінних
- В налаштуваннях проекту перейди в "Environment Variables"
- Додай:
  ```
  VITE_SUPABASE_URL=https://cqlmgpvhwjonbutztjkz.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbG1ncHZod2pvbmJ1dHp0amt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMDk2NTIsImV4cCI6MjA2ODU4NTY1Mn0.IcKRdCctIfymQViO9Jlcszz-mQEBi2hlQxWQAixirFvE
  ```

### 5. Готово! 🎉
- Твій сайт буде доступний за URL типу: `https://university-finder-xxx.vercel.app`
- Кожен push в GitHub автоматично оновлює сайт

## 🔧 Якщо щось не працює:

### Проблема: "Build failed"
```bash
# Перевір локально
npm run build
```

### Проблема: Карта не завантажується
- Перевір змінні середовища в Vercel
- Перевір Supabase підключення

### Проблема: Сторінки не завантажуються
- Перевір, що в `vercel.json` є правильні redirects

## 📱 Перевірка після деплою:
- ✅ Головна сторінка завантажується
- ✅ Карта працює
- ✅ Університети відображаються
- ✅ Фільтри працюють
- ✅ Навігація працює

## 🎯 Результат:
Твій University Finder буде доступний онлайн і працюватиме швидко! 🚀 