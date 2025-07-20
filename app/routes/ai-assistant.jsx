import { useState, useRef, useEffect } from "react";
import { useAI } from "../hooks/useAI";
import Layout from "../components/Layout";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [conversationStarted, setConversationStarted] = useState(false);
  const messagesEndRef = useRef(null);
  const { generateResponse, isLoading } = useAI();

  // Автоматичне прокручування до останнього повідомлення
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Завантаження збереженої історії розмов
  useEffect(() => {
    const savedMessages = localStorage.getItem('ai-assistant-history');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
        setConversationStarted(parsedMessages.length > 0);
      } catch (error) {
        console.error('Помилка завантаження історії:', error);
      }
    }
  }, []);

  // Збереження історії розмов
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('ai-assistant-history', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Початкове привітання від Custom GPT
  const startConversation = () => {
    const welcomeMessage = {
      id: Date.now(),
      type: "assistant",
      content: `🎓 Привіт! Я ваш AI помічник з вибору університету!

Я можу допомогти вам:
• Знайти ідеальний університет за вашими критеріями
• Порівняти різні програми навчання
• Розрахувати вартість освіти
• Порадити щодо вступних вимог
• Відповісти на будь-які питання про вищу освіту

Просто опишіть, що вас цікавить, і я надам персоналізовані рекомендації! 

Наприклад:
"Шукаю університет для вивчення комп'ютерних наук з бюджетом до $20,000"
"Які найкращі університети для MBA в Європі?"
"Допоможіть порівняти програми медицини в Канаді та Австралії"

Що вас цікавить? 🤔`,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages([welcomeMessage]);
    setConversationStarted(true);
  };

  // Генерація відповіді від AI
  const generateGPTResponse = async (userMessage) => {
    try {
      const response = await generateResponse(userMessage);
      
      const assistantMessage = {
        id: Date.now(),
        type: "assistant",
        content: response,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Помилка генерації відповіді:', error);
      
      const errorMessage = {
        id: Date.now(),
        type: "assistant",
        content: "Вибачте, сталася помилка. Спробуйте ще раз або зверніться до підтримки.",
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  // Відправка повідомлення
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    
    await generateGPTResponse(inputMessage);
  };

  // Обробка Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Очищення історії розмов
  const clearHistory = () => {
    setMessages([]);
    setConversationStarted(false);
    localStorage.removeItem('ai-assistant-history');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  🤖 AI Помічник
                </h1>
                              <p className="text-gray-600">
                Персоналізовані рекомендації університетів від AI експерта
              </p>
              <div className="mt-2 text-xs text-gray-500">
                {import.meta.env.VITE_OPENAI_API_KEY && import.meta.env.VITE_OPENAI_API_KEY !== 'your_openai_api_key' ? (
                  <span className="text-green-600">✅ OpenAI API підключено</span>
                ) : (
                  <span className="text-yellow-600">⚠️ Використовується локальна логіка (додайте OpenAI API ключ для кращих результатів)</span>
                )}
              </div>
              </div>
              {conversationStarted && (
                <button
                  onClick={clearHistory}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  title="Очистити історію розмов"
                >
                  🗑️ Очистити
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {!conversationStarted ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
                <span className="text-3xl">🤖</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Готові отримати персоналізовані рекомендації?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Наш AI помічник проаналізує ваші потреби та надасть найкращі рекомендації університетів. 
                Просто почніть розмову та опишіть, що вас цікавить!
              </p>
              <button
                onClick={startConversation}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg"
              >
                🚀 Почати розмову з AI
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Чат-контейнер */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-3xl rounded-lg p-4 ${
                        message.type === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className={`text-xs mt-2 ${
                        message.type === "user" ? "text-blue-100" : "text-gray-500"
                      }`}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-gray-600 text-sm">AI думає...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Поле вводу */}
              <div className="border-t bg-gray-50 p-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Напишіть ваше повідомлення..."
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                        isLoading 
                          ? 'text-gray-500 bg-gray-100 cursor-not-allowed' 
                          : 'text-gray-900 bg-white'
                      }`}
                      rows="2"
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      inputMessage.trim() && !isLoading
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    📤
                  </button>
                </div>
                
                <div className="mt-3 text-xs text-gray-500 text-center">
                  Натисніть Enter для відправки, Shift+Enter для нового рядка
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 