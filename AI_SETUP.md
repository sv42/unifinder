# Налаштування AI Помічника

## OpenAI API Інтеграція

AI помічник може працювати в двох режимах:
1. **Локальна логіка** - базові відповіді без API
2. **OpenAI API** - розумні відповіді з використанням GPT

### Налаштування OpenAI API

1. **Отримайте API ключ:**
   - Перейдіть на [OpenAI Platform](https://platform.openai.com/)
   - Створіть акаунт або увійдіть
   - Перейдіть в розділ "API Keys"
   - Створіть новий API ключ

2. **Додайте ключ в .env.local:**
   ```bash
   VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. **Перезапустіть сервер розробки:**
   ```bash
   npm run dev
   ```

### Переваги OpenAI API

✅ **Розумні відповіді** - AI розуміє контекст та надає персоналізовані рекомендації  
✅ **Природна мова** - відповіді звучать більш природно та дружньо  
✅ **Гнучкість** - може відповідати на складні запити  
✅ **Контекст** - пам'ятає попередні повідомлення в розмові  

### Локальна логіка (Fallback)

Якщо OpenAI API не налаштований, AI помічник використовує локальну логіку:

- Аналіз ключових слів у запиті
- Фільтрація університетів за критеріями
- Попередньо підготовлені шаблони відповідей
- Базова персоналізація

### Приклади запитів

**Для тестування AI помічника спробуйте:**

```
"Шукаю університет для вивчення комп'ютерних наук з бюджетом до $20,000"
"Які найкращі університети для медицини в Європі?"
"Допоможіть порівняти програми MBA в різних країнах"
"Шукаю недорогий університет для вивчення бізнесу"
"Які вимоги для вступу в медичні університети?"
```

### Безпека

- API ключ зберігається тільки локально в .env.local
- Ключ не передається на сервер (тільки в браузері)
- Використовуйте тільки публічні API ключі
- Не додавайте .env.local в Git

### Вартість

OpenAI API має невелику вартість:
- GPT-3.5-turbo: ~$0.002 за 1K токенів
- Типова розмова: $0.01-0.05
- Місячний ліміт: $5-20 для активного використання

### Альтернативи

Якщо не хочете використовувати OpenAI API:
- AI помічник працює з локальною логікою
- Можна додати інші AI сервіси (Claude, Gemini)
- Можна розширити локальну логіку

### Підтримка

Якщо виникли проблеми:
1. Перевірте правильність API ключа
2. Переконайтеся, що .env.local створений
3. Перезапустіть сервер розробки
4. Перевірте консоль браузера на помилки 