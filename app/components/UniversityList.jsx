import { useState, useEffect } from "react";
import UniversityCard from "./UniversityCard";
import { useUniversities } from "../hooks/useUniversities";
import { useRipple } from "../hooks/useRipple";

export default function UniversityList({ searchParams = null }) {
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState("grid"); // grid або list
  const [currentPage, setCurrentPage] = useState(1);
  const [universitiesPerPage, setUniversitiesPerPage] = useState(9); // 9 університетів на сторінку для grid 3x3
  const [isPageChanging, setIsPageChanging] = useState(false);
  const createRipple = useRipple();

  const { 
    universities, 
    loading, 
    error, 
    fetchUniversities, 
    searchUniversities 
  } = useUniversities();

  // Завантаження університетів при зміні параметрів пошуку
  useEffect(() => {
    if (searchParams && Object.keys(searchParams).length > 0) {
      searchUniversities(searchParams);
      setCurrentPage(1); // Скидаємо на першу сторінку при новому пошуку
    }
  }, [searchParams]); // Тільки при зміні searchParams

  // Сортування університетів
  const sortedUniversities = [...universities].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return parseFloat(b.rating || 0) - parseFloat(a.rating || 0);
      case "name":
        return (a.name || "").localeCompare(b.name || "");
      case "country":
        return (a.country || "").localeCompare(b.country || "");
      case "tuition_fee":
        return (a.tuition_fee_min || 0) - (b.tuition_fee_min || 0);
      default:
        return 0;
    }
  });

  // Пагінація
  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = sortedUniversities.slice(indexOfFirstUniversity, indexOfLastUniversity);
  const totalPages = Math.ceil(sortedUniversities.length / universitiesPerPage);

  // Зміна сторінки
  const handlePageChange = (pageNumber) => {
    if (pageNumber === currentPage) return; // Не робимо нічого, якщо сторінка та сама
    
    setIsPageChanging(true);
    setCurrentPage(pageNumber);
    
    // Прокручуємо до початку списку з анімацією
    const element = document.querySelector('.py-16.bg-gray-50');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
    
    // Прибираємо індикатор завантаження через короткий час
    setTimeout(() => {
      setIsPageChanging(false);
    }, 400);
  };

  // Генерація номерів сторінок для відображення
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Якщо сторінок мало, показуємо всі
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Якщо сторінок багато, показуємо обмежено
      if (currentPage <= 3) {
        // Початок
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Кінець
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Середина
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Заголовок та контроли */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              🎓 Знайдені університети
            </h2>
            <p className="text-gray-600">
              Знайдено {sortedUniversities.length} університетів
              {totalPages > 1 && (
                <span className="ml-2 text-blue-600">
                  (сторінка {currentPage} з {totalPages})
                </span>
              )}
            </p>
          </div>

          {/* Контроли */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Кнопка оновлення */}
            <button
              onClick={() => {
                fetchUniversities();
                setCurrentPage(1);
              }}
              disabled={loading}
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            {/* Сортування */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Сортувати:</label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1); // Скидаємо на першу сторінку при зміні сортування
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="rating" className="text-gray-900">За рейтингом</option>
                <option value="name" className="text-gray-900">За назвою</option>
                <option value="country" className="text-gray-900">За країною</option>
                <option value="tuition_fee" className="text-gray-900">За вартістю</option>
              </select>
            </div>

            {/* Кількість на сторінку */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Показати:</label>
              <select
                value={universitiesPerPage}
                onChange={(e) => {
                  setUniversitiesPerPage(parseInt(e.target.value));
                  setCurrentPage(1); // Скидаємо на першу сторінку при зміні кількості
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value={6} className="text-gray-900">6 університетів</option>
                <option value={9} className="text-gray-900">9 університетів</option>
                <option value={12} className="text-gray-900">12 університетів</option>
                <option value={18} className="text-gray-900">18 університетів</option>
                <option value={24} className="text-gray-900">24 університети</option>
              </select>
            </div>

            {/* Перемикач виду */}
            <div className="flex items-center bg-white rounded-lg border border-gray-300 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid" 
                    ? "bg-blue-500 text-white" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" 
                    ? "bg-blue-500 text-white" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Стан завантаження */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Завантаження університетів...
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Це може зайняти кілька секунд при першому завантаженні
            </p>
          </div>
        )}

        {/* Помилка */}
        {error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg mb-4">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Помилка: {error}
            </div>
            <button
              onClick={() => {
                fetchUniversities();
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Спробувати знову
            </button>
          </div>
        )}

        {/* Список університетів */}
        {!loading && !error && (
          <>
            {/* Індикатор зміни сторінки */}
            {isPageChanging && (
              <div className="text-center py-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Завантаження сторінки...
                </div>
              </div>
            )}

            {currentUniversities.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Університети не знайдено
                </div>
              </div>
            ) : (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300"
                  : "space-y-4 transition-all duration-300"
              }>
                {currentUniversities.map((university) => (
                  <UniversityCard 
                    key={university.id} 
                    university={university} 
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Пагінація */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-1 bg-white rounded-lg shadow-lg p-2 border border-gray-200">
              {/* Кнопка "Перша сторінка" */}
              <button 
                onClick={(e) => {
                  createRipple(e);
                  handlePageChange(1);
                }}
                disabled={currentPage === 1}
                className="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:border-gray-300 transition-all duration-200 transform hover:scale-105 active:scale-95"
                title="Перша сторінка"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>

              {/* Кнопка "Попередня" */}
              <button 
                onClick={(e) => {
                  createRipple(e);
                  handlePageChange(currentPage - 1);
                }}
                disabled={currentPage === 1}
                className="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:border-gray-300 transition-all duration-200 transform hover:scale-105 active:scale-95"
                title="Попередня сторінка"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Розділювач */}
              <div className="w-px h-6 bg-gray-300 mx-1"></div>

              {/* Номери сторінок */}
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    if (typeof page === 'number') {
                      createRipple(e);
                      handlePageChange(page);
                    }
                  }}
                  disabled={page === '...'}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                    page === currentPage
                      ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 border border-blue-600 shadow-lg shadow-blue-200 animate-pulse'
                      : page === '...'
                      ? 'text-gray-400 bg-white border border-gray-200 cursor-default hover:scale-100'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 hover:shadow-md'
                  }`}
                  title={typeof page === 'number' ? `Сторінка ${page}` : ''}
                >
                  {page}
                </button>
              ))}

              {/* Розділювач */}
              <div className="w-px h-6 bg-gray-300 mx-1"></div>

              {/* Кнопка "Наступна" */}
              <button 
                onClick={(e) => {
                  createRipple(e);
                  handlePageChange(currentPage + 1);
                }}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:border-gray-300 transition-all duration-200 transform hover:scale-105 active:scale-95"
                title="Наступна сторінка"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Кнопка "Остання сторінка" */}
              <button 
                onClick={(e) => {
                  createRipple(e);
                  handlePageChange(totalPages);
                }}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:border-gray-300 transition-all duration-200 transform hover:scale-105 active:scale-95"
                title="Остання сторінка"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        )}

        {/* Інформація про пагінацію */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Показано {indexOfFirstUniversity + 1}-{Math.min(indexOfLastUniversity, sortedUniversities.length)} з {sortedUniversities.length} університетів
          </div>
        )}

        {/* Додаткова інформація */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            💡 <strong>Порада:</strong> Використовуй фільтри для точнішого пошуку або AI помічника для персоналізованих рекомендацій
          </p>
        </div>
      </div>
    </section>
  );
} 