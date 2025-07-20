CREATE TABLE IF NOT EXISTS universities (
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

CREATE TABLE IF NOT EXISTS programs (
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

CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, university_id)
);

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name VARCHAR,
  avatar_url VARCHAR,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies (додаємо IF NOT EXISTS)
DO $$ 
BEGIN
    -- Universities RLS
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'universities' AND policyname = 'Universities are viewable by everyone') THEN
        ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Universities are viewable by everyone" ON universities
          FOR SELECT USING (true);
    END IF;

    -- Programs RLS
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'programs' AND policyname = 'Programs are viewable by everyone') THEN
        ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Programs are viewable by everyone" ON programs
          FOR SELECT USING (true);
    END IF;

    -- User favorites RLS
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_favorites' AND policyname = 'Users can view own favorites') THEN
        ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Users can view own favorites" ON user_favorites
          FOR SELECT USING (auth.uid() = user_id);
        CREATE POLICY "Users can insert own favorites" ON user_favorites
          FOR INSERT WITH CHECK (auth.uid() = user_id);
        CREATE POLICY "Users can delete own favorites" ON user_favorites
          FOR DELETE USING (auth.uid() = user_id);
    END IF;

    -- User profiles RLS
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_profiles' AND policyname = 'Users can view own profile') THEN
        ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Users can view own profile" ON user_profiles
          FOR SELECT USING (auth.uid() = id);
        CREATE POLICY "Users can update own profile" ON user_profiles
          FOR UPDATE USING (auth.uid() = id);
        CREATE POLICY "Users can insert own profile" ON user_profiles
          FOR INSERT WITH CHECK (auth.uid() = id);
    END IF;
END $$;

-- Додаємо тестові дані тільки якщо їх ще немає
INSERT INTO universities (name, country, city, type, rating, tuition_fee_min, tuition_fee_max, description, latitude, longitude) 
SELECT 
  'Київський національний університет імені Тараса Шевченка', 'Україна', 'Київ', 'public', 8.5, 2000, 5000, 'Один з найстаріших та найпрестижніших університетів України', 50.4501, 30.5234
WHERE NOT EXISTS (
  SELECT 1 FROM universities WHERE name = 'Київський національний університет імені Тараса Шевченка'
);

INSERT INTO universities (name, country, city, type, rating, tuition_fee_min, tuition_fee_max, description, latitude, longitude) 
SELECT 
  'Львівський національний університет імені Івана Франка', 'Україна', 'Львів', 'public', 8.2, 1800, 4500, 'Провідний університет Західної України', 49.8397, 24.0297
WHERE NOT EXISTS (
  SELECT 1 FROM universities WHERE name = 'Львівський національний університет імені Івана Франка'
);

INSERT INTO universities (name, country, city, type, rating, tuition_fee_min, tuition_fee_max, description, latitude, longitude) 
SELECT 
  'Харківський національний університет імені В. Н. Каразіна', 'Україна', 'Харків', 'public', 8.0, 1700, 4200, 'Один з найбільших університетів України', 50.0044, 36.2314
WHERE NOT EXISTS (
  SELECT 1 FROM universities WHERE name = 'Харківський національний університет імені В. Н. Каразіна'
);

INSERT INTO universities (name, country, city, type, rating, tuition_fee_min, tuition_fee_max, description, latitude, longitude) 
SELECT 
  'Одеський національний університет імені І. І. Мечникова', 'Україна', 'Одеса', 'public', 7.8, 1600, 4000, 'Провідний університет Півдня України', 46.4825, 30.7233
WHERE NOT EXISTS (
  SELECT 1 FROM universities WHERE name = 'Одеський національний університет імені І. І. Мечникова'
);