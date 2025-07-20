import { useFavorites } from "../hooks/useFavorites";
import UniversityCard from "../components/UniversityCard";
import Navbar from "../components/Navbar";

export default function FavoritesPage() {
  const { favorites, clearFavorites, getFavoritesCount } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">❤️ Мої улюблені</h1>
              <p className="text-gray-600 mt-1">
                Збережені університети: {getFavoritesCount()}
              </p>
            </div>
            
            {favorites.length > 0 && (
              <button
                onClick={clearFavorites}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Очистити всі
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Контент */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              У вас поки немає улюблених університетів
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Додавайте університети в улюблені, натискаючи на сердечко ❤️ на картках університетів
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Знайти університети
            </a>
          </div>
        ) : (
          <>
            {/* Статистика */}
            <div className="mb-8 p-6 bg-white rounded-xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{getFavoritesCount()}</div>
                  <div className="text-gray-600">Всього улюблених</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {[...new Set(favorites.map(f => f.country))].length}
                  </div>
                  <div className="text-gray-600">Країн</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {(favorites.reduce((sum, f) => sum + (parseFloat(f.rating) || 0), 0) / favorites.length).toFixed(1)}
                  </div>
                  <div className="text-gray-600">Середній рейтинг</div>
                </div>
              </div>
            </div>

            {/* Список улюблених */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((university) => (
                <UniversityCard 
                  key={university.id} 
                  university={university} 
                />
              ))}
            </div>

            {/* Додаткова інформація */}
            <div className="mt-12 text-center">
              <p className="text-gray-600">
                💡 <strong>Порада:</strong> Використовуйте улюблені для порівняння університетів та збереження цікавих варіантів
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 