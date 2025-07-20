import UniversityMap from '../components/Map/UniversityMap';
import Navbar from '../components/Navbar';

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Заголовок */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🗺️ Інтерактивна карта університетів
            </h1>
            <p className="text-lg text-gray-600">
              Знайдіть університети на карті та дізнайтеся більше про кожен з них
            </p>
          </div>
        </div>
      </div>

      {/* Основна секція з картою */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <UniversityMap />
        </div>

        {/* Додаткова інформація */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 text-xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Розумний пошук</h3>
            </div>
            <p className="text-gray-600">
              Використовуйте фільтри для пошуку університетів за країною, типом та рейтингом. 
              Клікайте на маркери для детальної інформації.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 text-xl">📍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Географічне розташування</h3>
            </div>
            <p className="text-gray-600">
              Переглядайте університети на інтерактивній карті. 
              Дізнайтеся про їх розташування та транспортну доступність.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600 text-xl">💡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Швидкі дії</h3>
            </div>
            <p className="text-gray-600">
              Додавайте університети до улюблених прямо з карти. 
              Переходите до детальних сторінок для повної інформації.
            </p>
          </div>
        </div>

        {/* Поради по використанню */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            💡 Поради по використанню карти
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
            <ul className="space-y-2">
              <li>• <strong>Зум:</strong> Використовуйте колесо миші або кнопки навігації</li>
              <li>• <strong>Переміщення:</strong> Перетягуйте карту для зміни видимої області</li>
              <li>• <strong>Маркери:</strong> Клікайте на кольорові точки для інформації</li>
            </ul>
            <ul className="space-y-2">
              <li>• <strong>Фільтри:</strong> Обмежуйте результати за країною та типом</li>
              <li>• <strong>Рейтинг:</strong> Встановлюйте мінімальний рейтинг університетів</li>
              <li>• <strong>Повноекранний режим:</strong> Використовуйте кнопку в правому верхньому куті</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 