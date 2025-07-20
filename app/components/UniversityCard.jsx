import { useFavorites } from "../hooks/useFavorites";
import { useComparison } from "../hooks/useComparison";

export default function UniversityCard({ university }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { isInComparison, addToComparison } = useComparison();

  const toggleFavorite = () => {
    if (isFavorite(university.id)) {
      removeFromFavorites(university.id);
    } else {
      addToFavorites(university);
    }
  };

  const handleCompare = () => {
    const result = addToComparison(university);
    if (!result.success) {
      alert(result.message);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      {/* Зображення університету */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-xl overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full transition-all duration-200 ${
              isFavorite(university.id)
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white bg-opacity-80 text-gray-600 hover:bg-opacity-100'
            }`}
          >
            <svg className="w-5 h-5" fill={isFavorite(university.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        {/* Рейтинг */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <span className="mr-1">⭐</span>
            {university.rating || "4.5"}
          </div>
        </div>

        {/* Країна */}
        <div className="absolute top-4 left-4">
          <div className="bg-white bg-opacity-90 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            {university.country}
          </div>
        </div>
      </div>

      {/* Контент картки */}
      <div className="p-6">
        {/* Назва університету */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {university.name}
        </h3>

        {/* Місто */}
        <p className="text-gray-600 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {university.city}
        </p>

        {/* Спеціальності */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Популярні спеціальності:</p>
          <div className="flex flex-wrap gap-1">
            {university.programs?.slice(0, 3).map((program, index) => (
              <span
                key={program.id || index}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
              >
                {program.name}
              </span>
            ))}
            {(!university.programs || university.programs.length === 0) && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                Спеціальності не вказані
              </span>
            )}
          </div>
        </div>

        {/* Вартість навчання */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Вартість навчання:</span>
            <span className="font-semibold text-green-600">
              {university.tuition_fee_min && university.tuition_fee_max 
                ? `$${university.tuition_fee_min} - $${university.tuition_fee_max}`
                : university.tuition_fee_min 
                ? `Від $${university.tuition_fee_min}`
                : "Не вказано"
              }
            </span>
          </div>
        </div>

        {/* Кнопки дій */}
        <div className="flex gap-3">
          <a 
            href={`/university/${university.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
          >
            Детальніше
          </a>
          <button 
            onClick={handleCompare}
            disabled={isInComparison(university.id)}
            className={`flex-1 font-medium py-2 px-4 rounded-lg transition-colors ${
              isInComparison(university.id)
                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {isInComparison(university.id) ? '✓ В порівнянні' : 'Порівняти'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Приклад використання з тестовими даними
export function UniversityCardExample() {
  const exampleUniversity = {
    name: "Київський національний університет імені Тараса Шевченка",
    country: "Україна",
    city: "Київ",
    rating: "4.7",
    specialties: ["Комп'ютерні науки", "Медицина", "Право", "Економіка"],
    tuitionFee: "Від $2,000"
  };

  return <UniversityCard university={exampleUniversity} />;
} 