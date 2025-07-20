import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function DatabaseCheck() {
  const [dbStatus, setDbStatus] = useState({
    universities: false,
    programs: false,
    userFavorites: false,
    userProfiles: false,
    hasData: false,
    loading: true,
    error: null
  })

  useEffect(() => {
    checkDatabase()
  }, [])

  const checkDatabase = async () => {
    if (!supabase) {
      setDbStatus(prev => ({ ...prev, loading: false, error: 'Supabase клієнт не налаштований' }))
      return
    }

    try {
      setDbStatus(prev => ({ ...prev, loading: true, error: null }))

      // Перевіряємо чи існують таблиці
      const tables = ['universities', 'programs', 'user_favorites', 'user_profiles']
      const tableStatus = {}

      for (const table of tables) {
        try {
          const { data, error } = await supabase
            .from(table)
            .select('count')
            .limit(1)
          
          if (error) {
            tableStatus[table] = false
          } else {
            tableStatus[table] = true
          }
        } catch (err) {
          tableStatus[table] = false
        }
      }

      // Перевіряємо чи є дані в таблиці universities
      let hasData = false
      if (tableStatus.universities) {
        try {
          const { data, error } = await supabase
            .from('universities')
            .select('id')
            .limit(1)
          
          hasData = !error && data && data.length > 0
        } catch (err) {
          hasData = false
        }
      }

      setDbStatus({
        universities: tableStatus.universities || false,
        programs: tableStatus.programs || false,
        userFavorites: tableStatus.user_favorites || false,
        userProfiles: tableStatus.user_profiles || false,
        hasData,
        loading: false,
        error: null
      })

    } catch (err) {
      setDbStatus(prev => ({ 
        ...prev, 
        loading: false, 
        error: err.message 
      }))
    }
  }

  const getStatusColor = (status) => {
    return status ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
  }

  const getStatusText = (status) => {
    return status ? '✅ Створена' : '❌ Відсутня'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6">Перевірка бази даних</h2>
      
      {dbStatus.loading && (
        <div className="text-gray-600">Перевірка таблиць...</div>
      )}

      {dbStatus.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-red-800 font-medium mb-2">Помилка:</h3>
          <p className="text-red-700">{dbStatus.error}</p>
        </div>
      )}

      {!dbStatus.loading && !dbStatus.error && (
        <>
          <div className="space-y-3 mb-6">
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(dbStatus.universities)}`}>
              Таблиця universities: {getStatusText(dbStatus.universities)}
            </div>
            
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(dbStatus.programs)}`}>
              Таблиця programs: {getStatusText(dbStatus.programs)}
            </div>
            
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(dbStatus.userFavorites)}`}>
              Таблиця user_favorites: {getStatusText(dbStatus.userFavorites)}
            </div>
            
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(dbStatus.userProfiles)}`}>
              Таблиця user_profiles: {getStatusText(dbStatus.userProfiles)}
            </div>
          </div>

          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(dbStatus.hasData)}`}>
            Дані в таблиці universities: {dbStatus.hasData ? '✅ Є дані' : '❌ Немає даних'}
          </div>

          {/* Кнопка повторної перевірки */}
          <button
            onClick={checkDatabase}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
          >
            Перевірити знову
          </button>
        </>
      )}

      {/* Інструкції якщо таблиці відсутні */}
      {!dbStatus.loading && !dbStatus.universities && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <h3 className="text-yellow-800 font-medium mb-2">Таблиці не створені!</h3>
          <p className="text-yellow-700 mb-3">
            Потрібно створити таблиці в Supabase. Використай SQL код з файлу uni.md
          </p>
          <div className="bg-yellow-100 p-3 rounded">
            <h4 className="text-yellow-800 font-medium mb-2">Як створити:</h4>
            <ol className="text-yellow-700 text-sm space-y-1">
              <li>1. Перейди в Supabase Dashboard</li>
              <li>2. Відкрий SQL Editor</li>
              <li>3. Скопіюй код з файлу uni.md</li>
              <li>4. Натисни "Run"</li>
              <li>5. Перезавантаж цю сторінку</li>
            </ol>
          </div>
        </div>
      )}

      {/* Інструкції якщо таблиці є, але немає даних */}
      {!dbStatus.loading && dbStatus.universities && !dbStatus.hasData && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h3 className="text-blue-800 font-medium mb-2">Таблиці створені, але немає даних!</h3>
          <p className="text-blue-700 mb-3">
            Таблиці існують, але в них немає університетів. SQL код з uni.md автоматично додасть тестові дані.
          </p>
          <div className="bg-blue-100 p-3 rounded">
            <h4 className="text-blue-800 font-medium mb-2">Що робити:</h4>
            <ol className="text-blue-700 text-sm space-y-1">
              <li>1. Переконайся, що запустив весь SQL код з uni.md</li>
              <li>2. Код має додати 4 українських університети</li>
              <li>3. Перевір в Table Editor чи є дані</li>
              <li>4. Натисни "Перевірити знову"</li>
            </ol>
          </div>
        </div>
      )}

      {/* Успіх */}
      {!dbStatus.loading && dbStatus.universities && dbStatus.hasData && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
          <h3 className="text-green-800 font-medium mb-2">✅ База даних готова!</h3>
          <p className="text-green-700">
            Всі таблиці створені і є тестові дані. Можна переходити до наступного етапу розробки!
          </p>
        </div>
      )}
    </div>
  )
} 