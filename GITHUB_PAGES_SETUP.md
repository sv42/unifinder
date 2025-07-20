# 🚀 Налаштування GitHub Pages для University Finder

## Кроки для деплою:

### 1. Створіть GitHub репозиторій
1. Перейдіть на [github.com](https://github.com)
2. Натисніть "New repository"
3. Назва: `unifinder`
4. Зробіть публічним
5. НЕ створюйте README (у нас вже є)

### 2. Завантажте код в GitHub
```bash
# Додайте remote (замініть YOUR_USERNAME на ваш username)
git remote add origin https://github.com/YOUR_USERNAME/unifinder.git

# Перейменуйте гілку в main
git branch -M main

# Завантажте код
git push -u origin main
```

### 3. Налаштуйте GitHub Pages
1. Перейдіть в Settings вашого репозиторію
2. Прокрутіть вниз до "Pages"
3. Source: "Deploy from a branch"
4. Branch: "gh-pages" (створиться автоматично)
5. Folder: "/ (root)"
6. Натисніть "Save"

### 4. Додайте змінні середовища
1. Перейдіть в Settings → Secrets and variables → Actions
2. Натисніть "New repository secret"
3. Додайте:
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://cqlmgpvhwjonbutztjkz.supabase.co`
4. Додайте ще один:
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbG1ncHZod2pvbmJ1dHp0amt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMDk2NTIsImV4cCI6MjA2ODU4NTY1Mn0.IcKRdCctIfymQViO9Jlcszz-mQEBi2hlQxWQAixirFvE`

### 5. Оновіть homepage в package.json
Замініть `YOUR_USERNAME` на ваш GitHub username:
```json
"homepage": "https://YOUR_USERNAME.github.io/unifinder"
```

### 6. Завантажте зміни
```bash
git add .
git commit -m "Update homepage URL"
git push
```

### 7. Перевірте деплой
1. Перейдіть в Actions вашого репозиторію
2. Подивіться на workflow "Deploy to GitHub Pages"
3. Зачекайте завершення (зазвичай 2-3 хвилини)

### 8. Ваш сайт готовий!
URL буде: `https://YOUR_USERNAME.github.io/unifinder`

## Перевірка роботи:

✅ Головна сторінка завантажується  
✅ Карта працює  
✅ Університети відображаються  
✅ Фільтри працюють  
✅ Пошук працює  

## Якщо щось не працює:

### "Build failed"
- Перевірте Actions → Workflows
- Подивіться на помилки в логах

### "Map not loading"
- Перевірте змінні середовища в Secrets
- Перевірте CORS налаштування в Supabase

### "404 error"
- Перевірте homepage URL в package.json
- Зачекайте 5-10 хвилин після деплою

## Корисні команди:

```bash
# Перевірка статусу
git status

# Перегляд логів
git log --oneline

# Оновлення після змін
git add .
git commit -m "Update description"
git push
```

## Підтримка:

Якщо виникнуть проблеми:
1. Перевірте Actions в GitHub
2. Подивіться на помилки в консолі браузера
3. Перевірте налаштування в Settings 