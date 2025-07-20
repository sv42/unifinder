import { useState, useEffect } from 'react'

export default function UrlDebug() {
  const [urlDetails, setUrlDetails] = useState({
    url: '',
    startsWithHttps: false,
    endsWithSupabase: false,
    hasValidFormat: false,
    issues: []
  })

  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
    
    const issues = []
    let startsWithHttps = false
    let endsWithSupabase = false
    
    // Перевіряємо чи починається з https://
    if (supabaseUrl.startsWith('https://')) {
      startsWithHttps = true
    } else {
      issues.push('URL не починається з https://')
    }
    
    // Перевіряємо чи закінчується на .supabase.co
    if (supabaseUrl.endsWith('.supabase.co')) {
      endsWithSupabase = true
    } else {
      issues.push('URL не закінчується на .supabase.co')
    }
    
    // Перевіряємо загальний формат
    const hasValidFormat = startsWithHttps && endsWithSupabase && supabaseUrl.length > 20
    
    setUrlDetails({
      url: supabaseUrl,
      startsWithHttps,
      endsWithSupabase,
      hasValidFormat,
      issues
    })
  }, [])

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3 text-yellow-800">Детальна перевірка URL</h3>
      
      <div className="mb-4">
        <h4 className="text-yellow-800 font-medium mb-2">Поточний URL:</h4>
        <pre className="text-sm bg-yellow-100 p-2 rounded border text-yellow-700 break-all">
          {urlDetails.url || '(порожній)'}
        </pre>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center">
          <span className={`w-4 h-4 rounded-full mr-2 ${urlDetails.startsWithHttps ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className={urlDetails.startsWithHttps ? 'text-green-700' : 'text-red-700'}>
            Починається з https://: {urlDetails.startsWithHttps ? '✅' : '❌'}
          </span>
        </div>
        
        <div className="flex items-center">
          <span className={`w-4 h-4 rounded-full mr-2 ${urlDetails.endsWithSupabase ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className={urlDetails.endsWithSupabase ? 'text-green-700' : 'text-red-700'}>
            Закінчується на .supabase.co: {urlDetails.endsWithSupabase ? '✅' : '❌'}
          </span>
        </div>
      </div>
      
      {urlDetails.issues.length > 0 && (
        <div className="mb-4">
          <h4 className="text-red-800 font-medium mb-2">Проблеми:</h4>
          <ul className="text-red-700 text-sm space-y-1">
            {urlDetails.issues.map((issue, index) => (
              <li key={index}>• {issue}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="bg-blue-50 border border-blue-200 rounded p-3">
        <h4 className="text-blue-800 font-medium mb-2">Як виправити:</h4>
        <p className="text-blue-700 text-sm mb-2">
          URL має виглядати так:
        </p>
        <pre className="text-xs text-blue-700 bg-blue-100 p-2 rounded">
{`VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co`}
        </pre>
        <p className="text-blue-700 text-sm mt-2">
          Де <code className="bg-blue-200 px-1 rounded">abcdefghijklmnop</code> - це ID твого проекту з Supabase Dashboard.
        </p>
      </div>
      
      <div className="mt-4 bg-green-50 border border-green-200 rounded p-3">
        <h4 className="text-green-800 font-medium mb-2">Як отримати правильний URL:</h4>
        <ol className="text-green-700 text-sm space-y-1">
          <li>1. Перейди в <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">Supabase Dashboard</a></li>
          <li>2. Виберіть твій проект</li>
          <li>3. Перейди в Settings → API</li>
          <li>4. Скопіюй "Project URL" (виглядає як https://xxx.supabase.co)</li>
          <li>5. Встав в .env.local файл</li>
          <li>6. Перезапусти сервер</li>
        </ol>
      </div>
    </div>
  )
} 