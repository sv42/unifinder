# 🚀 Налаштування Supabase для University Finder

## 1. Створення Supabase проекту

1. Перейди на [supabase.com](https://supabase.com)
2. Натисни "Start your project"
3. Увійди або створи акаунт
4. Натисни "New Project"
5. Виберіть організацію або створи нову
6. Заповни форму:
   - **Name**: `university-finder`
   - **Database Password**: створи надійний пароль
   - **Region**: вибери найближчий регіон
7. Натисни "Create new project"

## 2. Отримання ключів

Після створення проекту:

1. Перейди в **Settings** → **API**
2. Скопіюй:
   - **Project URL** (виглядає як: `https://cqlmgpvhwjonbutztjkz.supabase.co`)
   - **anon public** ключ (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbG1ncHZod2pvbmJ1dHp0amt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMDk2NTIsImV4cCI6MjA2ODU4NTY1Mn0.IcKRdCctIfymQViO9Jlcsz-mQEBi2hlQxWQAixirFvE)

## 3. Налаштування змінних середовища

Створи файл `.env.local` в корені проекту з наступним вмістом:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# OpenAI Configuration (для майбутнього)
VITE_OPENAI_API_KEY=your_openai_api_key

# Mapbox Configuration (для карти)
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
```

**Важливо:** Заміни `your-project-id` та `your-anon-key-here` на реальні значення з твого проекту.

## 4. Створення таблиць в базі даних

Перейди в **Table Editor** в Supabase Dashboard і створи наступні таблиці:

### Таблиця `universities`

```sql
CREATE TABLE universities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  country VARCHAR NOT NULL,
  city VARCHAR NOT NULL,
  type VARCHAR CHECK (type IN ('public', 'private')) DEFAULT 'public',
  rating DECIMAL(3,1) CHECK (rating >= 0 AND rating <= 10),
  tuition_fee_min INTEGER,
  tuition_fee_max INTEGER,
  currency VARCHAR(3) DEFAULT 'USD',
  description TEXT,
  website VARCHAR,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  logo_url VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Таблиця `programs`

```sql
CREATE TABLE programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  level VARCHAR CHECK (level IN ('bachelor', 'master', 'phd')) NOT NULL,
  duration_months INTEGER,
  tuition_fee INTEGER,
  currency VARCHAR(3) DEFAULT 'USD',
  language VARCHAR(10) DEFAULT 'en',
  description TEXT,
  requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Таблиця `user_favorites`

```sql
CREATE TABLE user_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, university_id)
);
```

### Таблиця `user_profiles`

```sql
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name VARCHAR,
  avatar_url VARCHAR,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 5. Налаштування RLS (Row Level Security)

### Для таблиці `universities`:
```sql
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;

-- Дозволити всім читати університети
CREATE POLICY "Universities are viewable by everyone" ON universities
  FOR SELECT USING (true);
```

### Для таблиці `programs`:
```sql
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

-- Дозволити всім читати програми
CREATE POLICY "Programs are viewable by everyone" ON programs
  FOR SELECT USING (true);
```

### Для таблиці `user_favorites`:
```sql
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- Користувач може бачити тільки свої улюблені
CREATE POLICY "Users can view own favorites" ON user_favorites
  FOR SELECT USING (auth.uid() = user_id);

-- Користувач може додавати тільки свої улюблені
CREATE POLICY "Users can insert own favorites" ON user_favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Користувач може видаляти тільки свої улюблені
CREATE POLICY "Users can delete own favorites" ON user_favorites
  FOR DELETE USING (auth.uid() = user_id);
```

### Для таблиці `user_profiles`:
```sql
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Користувач може бачити тільки свій профіль
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Користувач може оновлювати тільки свій профіль
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Користувач може вставляти тільки свій профіль
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

## 6. Додавання тестових даних

Після створення таблиць, додай кілька тестових університетів:

```sql
INSERT INTO universities (name, country, city, type, rating, tuition_fee_min, tuition_fee_max, description, latitude, longitude) VALUES
('Київський національний університет імені Тараса Шевченка', 'Україна', 'Київ', 'public', 8.5, 2000, 5000, 'Один з найстаріших та найпрестижніших університетів України', 50.4501, 30.5234),
('Львівський національний університет імені Івана Франка', 'Україна', 'Львів', 'public', 8.2, 1800, 4500, 'Провідний університет Західної України', 49.8397, 24.0297),
('Харківський національний університет імені В. Н. Каразіна', 'Україна', 'Харків', 'public', 8.0, 1700, 4200, 'Один з найбільших університетів України', 50.0044, 36.2314),
('Одеський національний університет імені І. І. Мечникова', 'Україна', 'Одеса', 'public', 7.8, 1600, 4000, 'Провідний університет Півдня України', 46.4825, 30.7233);
```

## 7. Тестування підключення

Після налаштування всіх змінних, запусти проект:

```bash
npm run dev
```

Перевір консоль браузера - не повинно бути попереджень про відсутність Supabase ключів.

## 8. Наступні кроки

1. ✅ Supabase налаштовано
2. 🔄 Створити компоненти для роботи з базою даних
3. 🔄 Додати автентифікацію користувачів
4. 🔄 Реалізувати пошук та фільтрацію
5. 🔄 Інтегрувати з AI

---

**Порада:** Зберігай ключі в безпеці та ніколи не коміть файл `.env.local` в Git! 