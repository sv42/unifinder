import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useUniversities } from "../hooks/useUniversities";

export default function SearchForm({ onSearchResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [countries, setCountries] = useState([]);
  const [specialties, setSpecialties] = useState([]);

  const { searchUniversities, getCountries, getSpecialties } = useUniversities();

  const budgetRanges = [
    "До 5000$ на рік",
    "5000-10000$ на рік", 
    "10000-20000$ на рік",
    "20000-30000$ на рік",
    "Понад 30000$ на рік"
  ];

  // Завантаження країн та спеціальностей при монтуванні компонента
  useEffect(() => {
    const loadFilterData = async () => {
      const countriesData = await getCountries();
      const specialtiesData = await getSpecialties();
      
      setCountries(countriesData);
      setSpecialties(specialtiesData);
    };

    loadFilterData();
  }, [getCountries, getSpecialties]);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    const searchParams = {
      query: searchQuery,
      country: selectedCountry,
      specialty: selectedSpecialty,
      budgetRange: budgetRange
    };

    console.log("Пошук:", searchParams);
    
    try {
      await searchUniversities(searchParams);
      // Викликаємо callback з результатами
      if (onSearchResults) {
        onSearchResults(searchParams);
      }
    } catch (error) {
      console.error("Помилка пошуку:", error);
    }
  };

  const handleQuickSearch = async (query) => {
    setSearchQuery(query);
    
    // Автоматичний пошук для швидких запитів
    const searchParams = { query };
    try {
      await searchUniversities(searchParams);
      if (onSearchResults) {
        onSearchResults(searchParams);
      }
    } catch (error) {
      console.error("Помилка швидкого пошуку:", error);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Заголовок секції */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🔍 Знайди свій університет
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Використовуй розширені фільтри або AI помічника для пошуку ідеального навчального закладу
          </p>
        </div>

        {/* Основна форма пошуку */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Основний пошук */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Введіть назву університету, спеціальність або місто..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
              />
            </div>

            {/* Швидкі пошуки */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 mr-2">Популярні запити:</span>
              {["Медицина в Польщі", "IT в Чехії", "Бізнес в Німеччині", "Мистецтво в Італії"].map((query) => (
                <button
                  key={query}
                  type="button"
                  onClick={() => handleQuickSearch(query)}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>

            {/* Розширені фільтри */}
            <div className="border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                <svg className={`h-5 w-5 mr-2 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Розширені фільтри
              </button>

              {showAdvanced && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                  {/* Країна */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🌍 Країна
                    </label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    >
                      <option value="" className="text-gray-900">Всі країни</option>
                      {countries.map((country) => (
                        <option key={country} value={country} className="text-gray-900">{country}</option>
                      ))}
                    </select>
                  </div>

                  {/* Спеціальність */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📚 Спеціальність
                    </label>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    >
                      <option value="" className="text-gray-900">Всі спеціальності</option>
                      {specialties.map((specialty) => (
                        <option key={specialty} value={specialty} className="text-gray-900">{specialty}</option>
                      ))}
                    </select>
                  </div>

                  {/* Бюджет */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      💰 Бюджет на рік
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    >
                      <option value="" className="text-gray-900">Будь-який бюджет</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range} className="text-gray-900">{range}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Кнопки дій */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🔍 Почати пошук
              </button>
              <Link
                to="/ai-assistant"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 text-center flex items-center justify-center"
              >
                🤖 AI помічник
              </Link>
            </div>
          </form>
        </div>

        {/* Додаткова інформація */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            💡 <strong>Порада:</strong> Використовуй AI помічника для отримання персоналізованих рекомендацій
          </p>
        </div>
      </div>
    </section>
  );
} 