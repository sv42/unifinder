import { useState, useEffect } from 'react'
import { supabase, universitiesApi } from '../lib/supabase'

export default function SupabaseTest() {
  const [universities, setUniversities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState('checking')

  useEffect(() => {
    // Перевіряємо чи існує supabase клієнт перед тестуванням
    if (!supabase) {
      setConnectionStatus('error')
      setError('Supabase клієнт не налаштований. Перевірте файл .env.local')
      setLoading(false)
      return
    }
    
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      setConnectionStatus('checking')
      
      // Перевіряємо чи існує supabase клієнт
      if (!supabase) {
        throw new Error('Supabase клієнт не налаштований. Перевірте файл .env.local')
      }
      
      // Тестуємо підключення до Supabase
      const { data, error } = await supabase
        .from('universities')
        .select('count')
        .limit(1)
      
      if (error) {
        throw error
      }
      
      setConnectionStatus('connected')
      
      // Завантажуємо університети
      const universitiesData = await universitiesApi.getAll()
      setUniversities(universitiesData)
      setLoading(false)
      
    } catch (err) {
      console.error('Помилка підключення до Supabase:', err)
      setConnectionStatus('error')
      setError(err.message)
      setLoading(false)
    }
  }

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-green-600 bg-green-100'
      case 'error':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-yellow-600 bg-yellow-100'
    }
  }

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return '✅ Підключено до Supabase'
      case 'error':
        return '❌ Помилка підключення'
      default:
        return '⏳ Перевірка підключення...'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Тестування підключення Supabase</h2>
        
        {/* Статус підключення */}
        <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${getStatusColor()}`}>
          {getStatusText()}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-red-800 font-medium mb-2">Помилка:</h3>
            <p className="text-red-700">{error}</p>
            <div className="mt-4">
              <h4 className="text-red-800 font-medium mb-2">Можливі причини:</h4>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Не налаштовані змінні середовища в .env.local</li>
                <li>• Неправильний URL або ключ Supabase</li>
                <li>• URL не починається з https:// або не закінчується на .supabase.co</li>
                <li>• Таблиці не створені в базі даних</li>
                <li>• Проблеми з мережею</li>
              </ul>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <h4 className="text-yellow-800 font-medium mb-2">Перевірте файл .env.local:</h4>
              <pre className="text-xs text-yellow-700 bg-yellow-100 p-2 rounded">
{`VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key`}
              </pre>
            </div>
          </div>
        )}

        {/* Кнопка повторного тестування */}
        <button
          onClick={testConnection}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg mb-6"
        >
          {loading ? 'Тестування...' : 'Тестувати знову'}
        </button>

        {/* Список університетів */}
        {connectionStatus === 'connected' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Університети в базі даних ({universities.length})
            </h3>
            
            {loading ? (
              <div className="text-gray-600">Завантаження університетів...</div>
            ) : universities.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {universities.map((university) => (
                  <div key={university.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-lg mb-2">{university.name}</h4>
                    <p className="text-gray-600 mb-2">{university.city}, {university.country}</p>
                    {university.rating && (
                      <div className="flex items-center mb-2">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-sm">{university.rating}/10</span>
                      </div>
                    )}
                    {university.tuition_fee_min && (
                      <p className="text-sm text-gray-500">
                        Вартість: ${university.tuition_fee_min} - ${university.tuition_fee_max}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-600 bg-gray-50 rounded-lg p-4">
                <p>У базі даних поки немає університетів.</p>
                <p className="text-sm mt-2">
                  Додай тестові дані через Supabase Dashboard або використай SQL з інструкцій.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Інструкції */}
        {connectionStatus === 'error' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <h3 className="text-blue-800 font-medium mb-2">Що робити далі:</h3>
            <ol className="text-blue-700 text-sm space-y-2">
              <li>1. Створи проект на <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a></li>
              <li>2. Створи файл .env.local з твоїми ключами</li>
              <li>3. Створи таблиці в базі даних (див. SUPABASE_SETUP.md)</li>
              <li>4. Додай тестові дані</li>
              <li>5. Перезавантаж сторінку</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  )
} 