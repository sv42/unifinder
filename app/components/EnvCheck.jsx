import { useState, useEffect } from 'react'

export default function EnvCheck() {
  const [envStatus, setEnvStatus] = useState({
    supabaseUrl: false,
    supabaseKey: false,
    hasValidUrl: false
  })

  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    setEnvStatus({
      supabaseUrl: !!supabaseUrl,
      supabaseKey: !!supabaseKey,
      hasValidUrl: supabaseUrl && 
                   supabaseUrl.startsWith('https://') && 
                   supabaseUrl.endsWith('.supabase.co') &&
                   supabaseUrl !== 'your_supabase_url'
    })
  }, [])

  const allValid = envStatus.supabaseUrl && envStatus.supabaseKey && envStatus.hasValidUrl

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">Перевірка змінних середовища</h3>
      
      <div className="space-y-2">
        <div className="flex items-center">
          <span className={`w-4 h-4 rounded-full mr-2 ${envStatus.supabaseUrl ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className={envStatus.supabaseUrl ? 'text-green-700' : 'text-red-700'}>
            VITE_SUPABASE_URL: {envStatus.supabaseUrl ? '✅ Налаштовано' : '❌ Відсутній'}
          </span>
        </div>
        
        <div className="flex items-center">
          <span className={`w-4 h-4 rounded-full mr-2 ${envStatus.supabaseKey ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className={envStatus.supabaseKey ? 'text-green-700' : 'text-red-700'}>
            VITE_SUPABASE_ANON_KEY: {envStatus.supabaseKey ? '✅ Налаштовано' : '❌ Відсутній'}
          </span>
        </div>
        
        <div className="flex items-center">
          <span className={`w-4 h-4 rounded-full mr-2 ${envStatus.hasValidUrl ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className={envStatus.hasValidUrl ? 'text-green-700' : 'text-red-700'}>
            Формат URL: {envStatus.hasValidUrl ? '✅ Правильний' : '❌ Неправильний'}
          </span>
        </div>
      </div>

      {!allValid && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <h4 className="text-blue-800 font-medium mb-2">Як виправити:</h4>
          <ol className="text-blue-700 text-sm space-y-1">
            <li>1. Створи файл .env.local в корені проекту</li>
            <li>2. Додай правильні значення з Supabase Dashboard</li>
            <li>3. Перезапусти сервер (npm run dev)</li>
          </ol>
          <div className="mt-3">
            <h5 className="text-blue-800 font-medium mb-1">Приклад .env.local:</h5>
            <pre className="text-xs text-blue-700 bg-blue-100 p-2 rounded">
{`VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
} 