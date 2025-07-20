import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { supabase } from "../lib/supabase";
import { useFavorites } from "../hooks/useFavorites";
import Layout from "../components/Layout";

export default function UniversityDetailsPage() {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  // Завантаження даних університету
  useEffect(() => {
    const fetchUniversityDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // Отримуємо університет
        const { data: universityData, error: universityError } = await supabase
          .from('universities')
          .select('*')
          .eq('id', id)
          .single();

        if (universityError) throw universityError;

        // Отримуємо програми університету
        const { data: programsData, error: programsError } = await supabase
          .from('programs')
          .select('*')
          .eq('university_id', id)
          .order('name');

        if (programsError) throw programsError;

        setUniversity(universityData);
        setPrograms(programsData || []);
      } catch (err) {
        console.error('Помилка завантаження університету:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUniversityDetails();
    }
  }, [id]);

  const toggleFavorite = () => {
    if (isFavorite(university.id)) {
      removeFromFavorites(university.id);
    } else {
      addToFavorites(university);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Завантаження університету...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg mb-4">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Помилка: {error}
          </div>
          <a
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Повернутися на головну
          </a>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg mb-4">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Університет не знайдено
          </div>
          <a
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Повернутися на головну
          </a>
        </div>
      </div>
    );
  }

    return (
    <Layout>
      <div className="bg-gray-50">
        {/* Header з зображенням */}
      <div className="relative h-64 bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-8 h-full flex items-end">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">{university.name}</h1>
            <p className="text-xl opacity-90 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {university.city}, {university.country}
            </p>
          </div>
        </div>
      </div>

      {/* Контент */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основна інформація */}
          <div className="lg:col-span-2 space-y-8">
            {/* Основні характеристики */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🏫 Про університет</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-yellow-600 text-xl">⭐</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Рейтинг</p>
                    <p className="text-lg font-semibold text-gray-900">{university.rating || "Не вказано"}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-green-600 text-xl">💰</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Вартість навчання</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {university.tuition_fee_min && university.tuition_fee_max 
                        ? `$${university.tuition_fee_min} - $${university.tuition_fee_max}`
                        : university.tuition_fee_min 
                        ? `Від $${university.tuition_fee_min}`
                        : "Не вказано"
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-600 text-xl">🌍</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Країна</p>
                    <p className="text-lg font-semibold text-gray-900">{university.country}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-purple-600 text-xl">🏙️</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Місто</p>
                    <p className="text-lg font-semibold text-gray-900">{university.city}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Програми навчання */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Програми навчання</h2>
              
              {programs.length > 0 ? (
                <div className="space-y-4">
                  {programs.map((program) => (
                    <div key={program.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.name}</h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                              {program.level}
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                              {program.duration_months} місяців
                            </span>
                          </div>
                          <p className="text-gray-600">
                            Вартість: {program.tuition_fee ? `$${program.tuition_fee}` : "Не вказано"}
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Детальніше
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Програми навчання не вказані</p>
                </div>
              )}
            </div>
          </div>

          {/* Бічна панель */}
          <div className="space-y-6">
            {/* Кнопки дій */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-4">
                <button
                  onClick={toggleFavorite}
                  className={`w-full flex items-center justify-center px-4 py-3 rounded-lg transition-colors ${
                    isFavorite(university.id)
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill={isFavorite(university.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {isFavorite(university.id) ? 'Видалити з улюблених' : 'Додати в улюблені'}
                </button>

                <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  📧 Зв\'язатися з університетом
                </button>

                <button className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  📝 Подати заявку
                </button>
              </div>
            </div>

            {/* Швидкі посилання */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🔗 Швидкі посилання</h3>
              <div className="space-y-3">
                <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">
                  🌐 Офіційний сайт
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">
                  📞 Контакти
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">
                  📍 Як дістатися
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">
                  📋 Вимоги для вступу
                </a>
              </div>
            </div>

            {/* Подібні університети */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🎓 Подібні університети</h3>
              <p className="text-gray-600 text-sm">
                Рекомендації завантажуються...
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
} 