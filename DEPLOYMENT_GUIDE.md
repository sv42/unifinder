# 🚀 Гід по деплою University Finder

## Варіант 1: Vercel (рекомендую)

### Крок 1: Підготовка
1. **Створіть акаунт** на [vercel.com](https://vercel.com)
2. **Підключіть GitHub** акаунт
3. **Push код** в GitHub репозиторій

### Крок 2: Деплой
1. **Натисніть "New Project"** в Vercel
2. **Виберіть ваш репозиторій**
3. **Налаштуйте змінні середовища:**
   ```
   VITE_SUPABASE_URL=https://cqlmgpvhwjonbutztjkz.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbG1ncHZod2pvbmJ1dHp0amt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMDk2NTIsImV4cCI6MjA2ODU4NTY1Mn0.IcKRdCctIfymQViO9Jlcszz-mQEBi2hlQxWQAixirFvE
   ```
4. **Натисніть "Deploy"**

### Крок 3: Готово!
- Отримаєте URL типу: `https://your-project.vercel.app`
- Автоматичні деплої при кожному push

---

## Варіант 2: Netlify

### Крок 1: Підготовка
1. **Створіть акаунт** на [netlify.com](https://netlify.com)
2. **Підключіть GitHub**

### Крок 2: Деплой
1. **Натисніть "New site from Git"**
2. **Виберіть репозиторій**
3. **Налаштування:**
   - Build command: `npm run build`
   - Publish directory: `build`
4. **Додайте змінні середовища** в Site settings → Environment variables
5. **Натисніть "Deploy site"**

---

## Варіант 3: GitHub Pages

### Крок 1: Підготовка
```bash
# Додайте homepage в package.json
npm pkg set homepage="https://your-username.github.io/your-repo-name"
```

### Крок 2: Деплой
1. **Push код** в GitHub
2. **Settings → Pages**
3. **Source: GitHub Actions**
4. **Створіть .github/workflows/deploy.yml**

---

## Важливо для деплою:

### 1. Змінні середовища
Переконайтеся, що в деплой платформі налаштовані:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 2. CORS налаштування
В Supabase додайте домен деплою в:
- Settings → API → CORS origins
- Додайте: `https://your-domain.vercel.app`

### 3. Тестування
Після деплою перевірте:
- ✅ Головна сторінка завантажується
- ✅ Карта працює
- ✅ Університети відображаються
- ✅ Фільтри працюють

---

## Швидкий деплой через Vercel CLI:

```bash
# Встановіть Vercel CLI
npm i -g vercel

# Увійдіть в акаунт
vercel login

# Деплой
vercel

# Продакшн деплой
vercel --prod
```

---

## Проблеми та рішення:

### "Build failed"
- Перевірте Node.js версію (потрібна 16+)
- Перевірте всі залежності в package.json

### "Environment variables not found"
- Додайте змінні в налаштування деплой платформи

### "CORS error"
- Додайте домен в Supabase CORS налаштування

### "Map not loading"
- Перевірте змінні середовища
- Перевірте Supabase підключення 