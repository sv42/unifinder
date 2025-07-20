import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Отримання контексту про університети для AI
  const getUniversitiesContext = useCallback(async () => {
    try {
      const { data: universities, error } = await supabase
        .from('universities')
        .select(`
          *,
          programs (*)
        `)
        .order('rating', { ascending: false })
        .limit(50);

      if (error) throw error;
      return universities || [];
    } catch (error) {
      console.error('Помилка отримання університетів:', error);
      return [];
    }
  }, []);

  // Аналіз запиту користувача та генерація контексту
  const analyzeUserQuery = useCallback((message, universities) => {
    const lowerMessage = message.toLowerCase();
    const analysis = {
      intent: 'general',
      fields: [],
      budget: null,
      countries: [],
      programs: [],
      level: 'bachelor'
    };

    // Визначення наміру
    if (lowerMessage.includes('комп\'ютер') || lowerMessage.includes('програмування') || lowerMessage.includes('it') || lowerMessage.includes('техніч')) {
      analysis.intent = 'computer_science';
      analysis.programs.push('Комп\'ютерні науки', 'Програмна інженерія', 'Інформаційні технології');
    } else if (lowerMessage.includes('медицина') || lowerMessage.includes('лікар') || lowerMessage.includes('медичн')) {
      analysis.intent = 'medicine';
      analysis.programs.push('Медицина', 'Стоматологія', 'Фармація');
    } else if (lowerMessage.includes('бізнес') || lowerMessage.includes('mba') || lowerMessage.includes('менеджмент') || lowerMessage.includes('економ')) {
      analysis.intent = 'business';
      analysis.programs.push('Бізнес-адміністрування', 'Менеджмент', 'Економіка', 'Маркетинг');
    } else if (lowerMessage.includes('право') || lowerMessage.includes('юридичн')) {
      analysis.intent = 'law';
      analysis.programs.push('Право', 'Юриспруденція');
    } else if (lowerMessage.includes('мистецтво') || lowerMessage.includes('дизайн') || lowerMessage.includes('архітектур')) {
      analysis.intent = 'arts';
      analysis.programs.push('Мистецтво', 'Дизайн', 'Архітектура');
    }

    // Визначення бюджету
    if (lowerMessage.includes('до 5000') || lowerMessage.includes('до $5000')) {
      analysis.budget = 5000;
    } else if (lowerMessage.includes('до 10000') || lowerMessage.includes('до $10000')) {
      analysis.budget = 10000;
    } else if (lowerMessage.includes('до 20000') || lowerMessage.includes('до $20000')) {
      analysis.budget = 20000;
    } else if (lowerMessage.includes('до 30000') || lowerMessage.includes('до $30000')) {
      analysis.budget = 30000;
    }

    // Визначення країн
    const countries = ['україна', 'польща', 'чехія', 'німеччина', 'франція', 'італія', 'іспанія', 'нідерланди', 'швеція', 'канада', 'австралія', 'сша', 'великобританія'];
    countries.forEach(country => {
      if (lowerMessage.includes(country)) {
        analysis.countries.push(country);
      }
    });

    // Визначення рівня освіти
    if (lowerMessage.includes('магістр') || lowerMessage.includes('master')) {
      analysis.level = 'master';
    } else if (lowerMessage.includes('доктор') || lowerMessage.includes('phd')) {
      analysis.level = 'phd';
    }

    return analysis;
  }, []);

  // Фільтрація університетів на основі аналізу
  const filterUniversities = useCallback((universities, analysis) => {
    let filtered = universities;

    // Фільтр по країнах
    if (analysis.countries.length > 0) {
      filtered = filtered.filter(uni => 
        analysis.countries.some(country => 
          uni.country?.toLowerCase().includes(country)
        )
      );
    }

    // Фільтр по бюджету
    if (analysis.budget) {
      filtered = filtered.filter(uni => 
        uni.tuition_fee_min && uni.tuition_fee_min <= analysis.budget
      );
    }

    // Фільтр по програмах
    if (analysis.programs.length > 0) {
      filtered = filtered.filter(uni => 
        uni.programs?.some(program => 
          analysis.programs.some(targetProgram => 
            program.name?.toLowerCase().includes(targetProgram.toLowerCase())
          )
        )
      );
    }

    // Сортування по рейтингу
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return filtered.slice(0, 5); // Повертаємо топ-5
  }, []);

  // Генерація відповіді з OpenAI (якщо API ключ налаштований)
  const generateOpenAIResponse = useCallback(async (message, context) => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey || apiKey === 'your_openai_api_key') {
      return null; // Повертаємо null якщо API не налаштований
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Ти експерт з вищої освіти та допомагаєш студентам знайти ідеальний університет. 
              Використовуй наданий контекст про університети для надання персоналізованих рекомендацій.
              Відповідай українською мовою, бути дружнім та корисним.`
            },
            {
              role: 'user',
              content: `Контекст про університети: ${JSON.stringify(context)}
              
              Повідомлення користувача: ${message}`
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      const data = await response.json();
      return data.choices?.[0]?.message?.content || null;
    } catch (error) {
      console.error('Помилка OpenAI API:', error);
      return null;
    }
  }, []);

  // Генерація локальної відповіді (fallback)
  const generateLocalResponse = useCallback((message, universities, analysis) => {
    const filteredUniversities = filterUniversities(universities, analysis);
    
    let response = '';

    switch (analysis.intent) {
      case 'computer_science':
        response = `💻 Чудовий вибір! Комп'ютерні науки - це дуже перспективна галузь.

Ось мої рекомендації для вас:

${filteredUniversities.map((uni, index) => `
**${index + 1}. ${uni.name}**
📍 ${uni.city}, ${uni.country}
⭐ Рейтинг: ${uni.rating || "Не вказано"}
💰 Вартість: ${uni.tuition_fee_min ? `від $${uni.tuition_fee_min}` : "Не вказано"}
🎯 Програми: ${uni.programs?.map(p => p.name).join(', ') || 'Комп\'ютерні науки'}
`).join('\n')}

**Чому ці університети?**
• Високі рейтинги в технічних дисциплінах
• Сучасні лабораторії та обладнання
• Зв'язки з IT-компаніями
• Стажування та кар'єрна підтримка

Хочете дізнатися більше про конкретний університет або порівняти програми?`;
        break;

      case 'medicine':
        response = `🏥 Медицина - це благородна професія! 

Ось найкращі університети для медичної освіти:

${filteredUniversities.map((uni, index) => `
**${index + 1}. ${uni.name}**
📍 ${uni.city}, ${uni.country}
⭐ Рейтинг: ${uni.rating || "Не вказано"}
💰 Вартість: ${uni.tuition_fee_min ? `від $${uni.tuition_fee_min}` : "Не вказано"}
🎯 Програми: ${uni.programs?.map(p => p.name).join(', ') || 'Медицина'}
`).join('\n')}

**Важливі аспекти медичної освіти:**
• Тривалість навчання: 6-8 років
• Практика в клініках
• Ліцензування після закінчення
• Можливості для спеціалізації

Чи цікавить вас конкретна спеціалізація або країна?`;
        break;

      case 'business':
        response = `💼 Бізнес-освіта - це інвестиція в майбутнє!

Топ університети для бізнес-освіти:

${filteredUniversities.map((uni, index) => `
**${index + 1}. ${uni.name}**
📍 ${uni.city}, ${uni.country}
⭐ Рейтинг: ${uni.rating || "Не вказано"}
💰 Вартість: ${uni.tuition_fee_min ? `від $${uni.tuition_fee_min}` : "Не вказано"}
🎯 Програми: ${uni.programs?.map(p => p.name).join(', ') || 'Бізнес-адміністрування'}
`).join('\n')}

**Переваги бізнес-освіти:**
• Мережа контактів (networking)
• Практичні кейси
• Стажування в компаніях
• Високі зарплати після закінчення

Який рівень освіти вас цікавить: бакалавр, магістр чи MBA?`;
        break;

      default:
        response = `🤔 Цікаве питання! Давайте розберемо детальніше.

${filteredUniversities.length > 0 ? `
Ось кілька університетів, які можуть вас зацікавити:

${filteredUniversities.map((uni, index) => `
**${index + 1}. ${uni.name}**
📍 ${uni.city}, ${uni.country}
⭐ Рейтинг: ${uni.rating || "Не вказано"}
💰 Вартість: ${uni.tuition_fee_min ? `від $${uni.tuition_fee_min}` : "Не вказано"}
`).join('\n')}
` : ''}

Щоб надати вам найкращі рекомендації, мені потрібно знати:

**🎯 Ваші цілі:**
• Яка сфера вас цікавить?
• Який рівень освіти (бакалавр/магістр/доктор)?
• Плануєте працювати після навчання?

**💰 Фінансові можливості:**
• Який ваш бюджет?
• Чи потрібні стипендії?
• Готові працювати під час навчання?

**🌍 Географічні вподобання:**
• Які країни вас цікавлять?
• Важливий клімат?
• Мовні вимоги?

Розкажіть більше про ваші цілі та вподобання!`;
    }

    return response;
  }, [filterUniversities]);

  // Основна функція генерації відповіді
  const generateResponse = useCallback(async (message) => {
    setIsLoading(true);
    
    try {
      // Отримуємо контекст про університети
      const universities = await getUniversitiesContext();
      
      // Аналізуємо запит користувача
      const analysis = analyzeUserQuery(message, universities);
      
      // Створюємо контекст для AI
      const context = {
        universities: universities.slice(0, 10), // Перші 10 для контексту
        analysis,
        userQuery: message
      };

      // Спочатку пробуємо OpenAI
      let response = await generateOpenAIResponse(message, context);
      
      // Якщо OpenAI не працює, використовуємо локальну логіку
      if (!response) {
        response = generateLocalResponse(message, universities, analysis);
      }

      return response;
    } catch (error) {
      console.error('Помилка генерації відповіді:', error);
      return 'Вибачте, сталася помилка. Спробуйте ще раз або зверніться до підтримки.';
    } finally {
      setIsLoading(false);
    }
  }, [getUniversitiesContext, analyzeUserQuery, generateOpenAIResponse, generateLocalResponse]);

  return {
    generateResponse,
    isLoading
  };
}; 