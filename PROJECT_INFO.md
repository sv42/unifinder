# 🎓 University Finder - Пошук університетів

## 📋 Опис проекту

**University Finder** - це веб-додаток для пошуку університетів з використанням штучного інтелекту. Проект допомагає студентам знайти ідеальний навчальний заклад на основі їхніх бажань, бюджету та кар'єрних цілей.

## 🚀 Технології

### Frontend
- **React 18** - основна бібліотека
- **JavaScript** - мова програмування
- **React Router v7** - навігація
- **Vite** - збірка проекту
- **Tailwind CSS** - стилізація (планується)

### Backend & База даних
- **Supabase** - Backend-as-a-Service
  - PostgreSQL база даних
  - Real-time підписки
  - Автентифікація
  - Storage для файлів
  - Edge Functions

### AI/LLM
- **OpenAI GPT-4** - інтелектуальний помічник
- **Supabase AI** - для пошуку та рекомендацій

## 🏗️ Архітектура

```
university-finder/
├── app/                    # Основні компоненти React Router
│   ├── _index.jsx         # Головна сторінка
│   ├── about.jsx          # Про проект
│   └── layout.jsx         # Загальний layout
├── components/            # React компоненти
│   ├── SearchForm.jsx     # Форма пошуку
│   ├── UniversityCard.jsx # Картка університету
│   └── AIHelper.jsx       # AI помічник
├── lib/                   # Утиліти та конфігурація
│   ├── supabase.js        # Supabase клієнт
│   └── ai.js              # AI інтеграція
└── public/                # Статичні файли
```

## 📊 Структура бази даних

### Таблиці Supabase:

#### 1. universities
```sql
- id: uuid (primary key)
- name: text
- country: text
- city: text
- description: text
- website: text
- rating: numeric
- founded_year: integer
- tuition_fee_min: numeric
- tuition_fee_max: numeric
- languages: text[]
- image_url: text
- created_at: timestamp
```

#### 2. programs
```sql
- id: uuid (primary key)
- university_id: uuid (foreign key)
- name: text
- description: text
- duration: text
- degree_type: text
- tuition_fee: numeric
- requirements: text
```

#### 3. search_criteria
```sql
- id: uuid (primary key)
- user_id: uuid (foreign key)
- budget_min: numeric
- budget_max: numeric
- country: text
- language: text
- program_type: text
- created_at: timestamp
```

#### 4. user_favorites
```sql
- id: uuid (primary key)
- user_id: uuid (foreign key)
- university_id: uuid (foreign key)
- created_at: timestamp
```

## 🎯 Основні функції

### Для користувачів:
1. **Розумний пошук** - AI-помічник допомагає сформулювати запит
2. **Фільтрація** - по бюджету, країні, мові, спеціальності
3. **Рекомендації** - персоналізовані пропозиції
4. **Порівняння** - детальне порівняння університетів
5. **Улюблені** - збереження обраних варіантів
6. **Детальна інформація** - повна інформація про університет

### Для адміністраторів:
1. **Управління базою** - додавання/редагування університетів
2. **Аналітика** - статистика пошуків
3. **Модерація** - перевірка контенту

## 🔧 Налаштування проекту

### Встановлення залежностей:
```bash
npm install
```

### Запуск в режимі розробки:
```bash
npm run dev
```

### Збірка для продакшену:
```bash
npm run build
```

## 🌐 Supabase налаштування

1. Створити проект на [supabase.com](https://supabase.com)
2. Отримати API ключі
3. Налаштувати таблиці в SQL Editor
4. Додати змінні середовища в `.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

## 📈 Плани розвитку

### Фаза 1 (MVP):
- [x] Базова структура проекту
- [ ] Підключення Supabase
- [ ] Форма пошуку
- [ ] Відображення результатів
- [ ] Базова AI інтеграція

### Фаза 2:
- [ ] Автентифікація користувачів
- [ ] Система улюблених
- [ ] Детальні сторінки університетів
- [ ] Покращена AI інтеграція

### Фаза 3:
- [ ] Порівняння університетів
- [ ] Рекомендаційна система
- [ ] Мобільна версія
- [ ] Аналітика

## 👨‍💻 Розробник

**Володя** - студент, що вивчає веб-розробку

## 📝 Ліцензія

MIT License

---

*Створено з ❤️ для допомоги студентам знайти свій ідеальний університет*
