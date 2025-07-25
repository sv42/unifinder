# 🗺️ Налаштування інтерактивної карти

## Кроки для налаштування Mapbox

### 1. Реєстрація на Mapbox
1. Перейдіть на [mapbox.com](https://mapbox.com)
2. Створіть безкоштовний акаунт
3. Перейдіть до Dashboard
4. Скопіюйте ваш **Public Access Token**

### 2. Налаштування в проекті

#### Додайте токен до змінних середовища:
Створіть файл `.env` в корені проекту:
```env
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

#### Оновіть компонент карти:
В файлі `app/components/Map/UniversityMap.jsx` замініть:
```javascript
mapboxAccessToken="YOUR_MAPBOX_TOKEN"
```
на:
```javascript
mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
```

### 3. Встановлення залежностей
```bash
npm install mapbox-gl react-map-gl
```

### 4. Додавання CSS
Додайте в `app/root.jsx`:
```javascript
import 'mapbox-gl/dist/mapbox-gl.css';
```

## Функціональність карти

### ✅ Що вже реалізовано:
- Відображення університетів на карті
- Фільтрація по країнах
- Фільтрація по типу університету
- Фільтрація по рейтингу
- Попапи з інформацією
- Кольорові маркери за типом

### 🚀 Планується додати:
- Кластеризація маркерів
- Пошук по назві
- Вимірювання відстані
- Побудова маршрутів
- Фото кампусів
- Транспортна інформація

## Структура даних університетів

```javascript
{
  id: 1,
  name: "Назва університету",
  location: [довгота, широта],
  type: "state" | "private",
  rating: 4.5,
  country: "Україна",
  city: "Київ",
  address: "Повна адреса",
  website: "https://example.com",
  phone: "+380123456789",
  email: "info@university.edu"
}
```

## Альтернативи Mapbox

### Безкоштовні варіанти:
1. **Leaflet** - відкрита бібліотека
2. **OpenStreetMap** - безкоштовні карти
3. **Google Maps** - безкоштовний ліміт

### Платні варіанти:
1. **Mapbox** - найкращі карти
2. **Google Maps** - популярний вибір
3. **HERE Maps** - хороша альтернатива

## Оптимізація продуктивності

### Для великої кількості маркерів:
1. Використовуйте кластеризацію
2. Завантажуйте маркери по регіонах
3. Використовуйте віртуалізацію
4. Кешуйте дані

### Приклади коду:
```javascript
// Кластеризація
import Supercluster from 'supercluster';

// Віртуалізація
import { FixedSizeList as List } from 'react-window';
```

## Безпека

### Важливо:
- Ніколи не публікуйте токен в публічних репозиторіях
- Використовуйте змінні середовища
- Обмежте доступ до токена в налаштуваннях Mapbox
- Регулярно оновлюйте токени

### Приклад .gitignore:
```gitignore
.env
.env.local
.env.production
``` 