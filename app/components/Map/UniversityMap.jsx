import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useUniversities } from '../../hooks/useUniversities';

// Функція для форматування вартості навчання
const formatTuition = (min, max, currency) => {
  if (min === 0 && max === 0) return "Безкоштовно";
  if (min === max) return `${min} ${currency}/рік`;
  return `${min}-${max} ${currency}/рік`;
};

// Функція для конвертації типу університету
const convertType = (type) => {
  return type === 'public' ? 'Державний' : 'Приватний';
};

// Компонент карти, який рендериться тільки на клієнті
function ClientMap({ filteredUniversities, onUniversitySelect }) {
  const [mapComponents, setMapComponents] = useState(null);

  useEffect(() => {
    // Завантажуємо Leaflet тільки на клієнті
    const loadMap = async () => {
      try {
        console.log('ClientMap: Початок завантаження карти...');
        
        // Додаємо CSS для Leaflet
        if (!document.querySelector('link[href*="leaflet"]')) {
          console.log('ClientMap: Додавання Leaflet CSS...');
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }

        // Динамічно імпортуємо React Leaflet компоненти
        console.log('ClientMap: Імпорт React Leaflet...');
        const { MapContainer, TileLayer, Marker, Popup, ZoomControl } = await import('react-leaflet');
        console.log('ClientMap: Імпорт Leaflet...');
        const L = await import('leaflet');

        // Виправлення для іконок Leaflet
        console.log('ClientMap: Налаштування іконок...');
        delete L.default.Icon.Default.prototype._getIconUrl;
        L.default.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        console.log('ClientMap: Встановлення компонентів карти...');
        setMapComponents({
          MapContainer,
          TileLayer,
          Marker,
          Popup,
          ZoomControl
        });
        console.log('ClientMap: Карта успішно завантажена!');
      } catch (error) {
        console.error('Помилка завантаження карти:', error);
        console.error('Деталі помилки:', error.message);
        console.error('Stack trace:', error.stack);
      }
    };

    loadMap();
  }, []);

  if (!mapComponents) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Завантаження карти Європи...</p>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, ZoomControl } = mapComponents;

  return (
    <MapContainer
      center={[50.0, 20.0]}
      zoom={5}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
      minZoom={3}
      maxZoom={19}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        subdomains={['a', 'b', 'c']}
      />
      <ZoomControl position="topright" />

      {/* Маркери університетів */}
      {filteredUniversities.map((university) => (
        <Marker
          key={university.id}
          position={university.coordinates}
          eventHandlers={{
            click: () => onUniversitySelect(university),
          }}
        >
          <Popup>
            <div className="p-2 max-w-xs">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">
                {university.name}
              </h3>
              
              <div className="space-y-1 text-xs text-gray-600">
                <div>📍 {university.city}, {university.country}</div>
                <div>🏛️ {university.type}</div>
                <div>⭐ Рейтинг: {university.rating.toFixed(1)}/5</div>
                <div>💰 {university.tuition}</div>
              </div>

              {university.description && (
                <div className="mt-3">
                  <h4 className="font-medium text-xs text-gray-700 mb-1">Опис:</h4>
                  <p className="text-xs text-gray-600">
                    {university.description.length > 80 
                      ? `${university.description.substring(0, 80)}...` 
                      : university.description
                    }
                  </p>
                </div>
              )}

              {university.programs && university.programs.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-medium text-xs text-gray-700 mb-1">Програми:</h4>
                  <div className="flex flex-wrap gap-1">
                    {university.programs.slice(0, 3).map((program, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {program}
                      </span>
                    ))}
                    {university.programs.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{university.programs.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-3 flex space-x-2">
                <Link
                  to={`/university/${university.id}`}
                  className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                >
                  Деталі
                </Link>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 transition-colors">
                  ❤️ Улюблене
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default function UniversityMap() {
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [filters, setFilters] = useState({
    country: 'all',
    type: 'all',
    minRating: 0
  });
  const [isClient, setIsClient] = useState(false);

  // Отримуємо університети з бази даних
  const { universities, loading, error, fetchUniversities } = useUniversities();

  // Перевіряємо чи ми на клієнті
  useEffect(() => {
    console.log('UniversityMap: Перевірка клієнта...');
    setIsClient(true);
    console.log('UniversityMap: isClient встановлено в true');
  }, []);

  // Завантажуємо університети при монтуванні компонента
  useEffect(() => {
    console.log('UniversityMap: Завантаження університетів...');
    fetchUniversities();
  }, [fetchUniversities]);

  // Логуємо зміни в даних для діагностики
  useEffect(() => {
    console.log('UniversityMap: Отримано університетів:', universities.length);
    console.log('UniversityMap: Стан завантаження:', loading);
    console.log('UniversityMap: Помилка:', error);
  }, [universities, loading, error]);

  // Конвертуємо дані з БД у формат для карти
  const mapUniversities = universities
    .filter(uni => uni.latitude && uni.longitude) // Фільтруємо тільки університети з координатами
    .map(uni => ({
      id: uni.id,
      name: uni.name,
      country: uni.country,
      city: uni.city,
      coordinates: [parseFloat(uni.latitude), parseFloat(uni.longitude)],
      type: convertType(uni.type),
      rating: uni.rating ? uni.rating / 2 : 0, // Конвертуємо з 10-бальної шкали в 5-бальну
      programs: [], // Поки що порожній масив, можна додати пізніше
      tuition: formatTuition(uni.tuition_fee_min, uni.tuition_fee_max, uni.currency),
      description: uni.description
    }));

  // Fallback дані, якщо БД не працює
  const fallbackUniversities = [
    {
      id: 'fallback-1',
      name: "Київський національний університет імені Тараса Шевченка",
      country: "Україна",
      city: "Київ",
      coordinates: [50.4501, 30.5234],
      type: "Державний",
      rating: 4.5,
      programs: ["Комп'ютерні науки", "Медицина", "Право"],
      tuition: "1500-3000 USD/рік",
      description: "Один з найстаріших та найпрестижніших університетів України"
    },
    {
      id: 'fallback-2',
      name: "Львівський національний університет імені Івана Франка",
      country: "Україна",
      city: "Львів",
      coordinates: [49.8397, 24.0297],
      type: "Державний",
      rating: 4.3,
      programs: ["Історія", "Філологія", "Математика"],
      tuition: "1200-2500 USD/рік",
      description: "Провідний університет Західної України"
    }
  ];

  // Використовуємо дані з БД або fallback
  const universitiesToUse = mapUniversities.length > 0 ? mapUniversities : fallbackUniversities;

  // Фільтрація університетів
  const filteredUniversities = universitiesToUse.filter(uni => {
    if (filters.country !== 'all' && uni.country !== filters.country) return false;
    if (filters.type !== 'all' && uni.type !== filters.type) return false;
    if (uni.rating < filters.minRating) return false;
    return true;
  });

  const getMarkerColor = (type) => {
    switch (type) {
      case 'Державний': return '#3B82F6';
      case 'Приватний': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <div className="w-full h-[600px] relative" style={{ minHeight: '600px' }}>
      {/* Фільтри */}
      <div className="absolute top-4 left-4 z-[1000] bg-white p-4 rounded-lg shadow-lg">
        <h3 className="font-semibold text-gray-900 mb-3">Фільтри</h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Країна
            </label>
            <select 
              value={filters.country}
              onChange={(e) => setFilters({...filters, country: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            >
              <option value="all" className="text-gray-900">Всі країни</option>
              {Array.from(new Set(universitiesToUse.map(uni => uni.country))).sort().map(country => (
                <option key={country} value={country} className="text-gray-900">
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Тип університету
            </label>
            <select 
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            >
              <option value="all" className="text-gray-900">Всі типи</option>
              <option value="Державний" className="text-gray-900">Державний</option>
              <option value="Приватний" className="text-gray-900">Приватний</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Мінімальний рейтинг: {filters.minRating}
            </label>
            <input 
              type="range" 
              min="0" 
              max="5" 
              step="0.1"
              value={filters.minRating}
              onChange={(e) => setFilters({...filters, minRating: parseFloat(e.target.value)})}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Знайдено: {filteredUniversities.length} університетів
          {mapUniversities.length === 0 && universities.length === 0 && !loading && (
            <div className="mt-2 text-xs text-orange-600">
              ⚠️ Використовуються демо-дані (БД недоступна)
            </div>
          )}
        </div>
      </div>

      {/* Індикатор завантаження */}
      {loading && (
        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Завантаження університетів з бази даних...</p>
          </div>
        </div>
      )}

      {/* Помилка */}
      {error && (
        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg mb-4">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Помилка: {error}
            </div>
            <button
              onClick={() => fetchUniversities()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Спробувати знову
            </button>
          </div>
        </div>
      )}

      {/* Карта або fallback */}
      {!loading && !error && isClient ? (
        <>
          {console.log('UniversityMap: Рендеринг ClientMap з', filteredUniversities.length, 'університетів')}
          <ClientMap 
            filteredUniversities={filteredUniversities}
            onUniversitySelect={setSelectedUniversity}
          />
        </>
      ) : !loading && !error && (
        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🗺️ Університети Європи
            </h2>
            
            <div className="space-y-4">
              {filteredUniversities.map((university) => (
                <div 
                  key={university.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedUniversity(university)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: getMarkerColor(university.type) }}
                        ></div>
                        <h3 className="font-semibold text-gray-900">{university.name}</h3>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>📍 {university.city}, {university.country}</div>
                        <div>🏛️ {university.type}</div>
                        <div>⭐ Рейтинг: {university.rating.toFixed(1)}/5</div>
                        <div>💰 {university.tuition}</div>
                      </div>

                      {university.description && (
                        <div className="mt-2 text-xs text-gray-500">
                          {university.description.length > 100 
                            ? `${university.description.substring(0, 100)}...` 
                            : university.description
                          }
                        </div>
                      )}

                      {university.programs && university.programs.length > 0 && (
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {university.programs.slice(0, 2).map((program, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {program}
                              </span>
                            ))}
                            {university.programs.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                +{university.programs.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Link
                        to={`/university/${university.id}`}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors text-center"
                      >
                        Деталі
                      </Link>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 transition-colors">
                        ❤️ Улюблене
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredUniversities.length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 text-6xl mb-4">🗺️</div>
                <p className="text-gray-600">Не знайдено університетів за обраними критеріями</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Попап з детальною інформацією */}
      {selectedUniversity && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001]">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900 text-lg">
                {selectedUniversity.name}
              </h3>
              <button 
                onClick={() => setSelectedUniversity(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3 text-sm text-gray-600">
              <div>📍 {selectedUniversity.city}, {selectedUniversity.country}</div>
              <div>🏛️ {selectedUniversity.type}</div>
              <div>⭐ Рейтинг: {selectedUniversity.rating.toFixed(1)}/5</div>
              <div>💰 {selectedUniversity.tuition}</div>
            </div>

            {selectedUniversity.description && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Опис:</h4>
                <p className="text-sm text-gray-600">
                  {selectedUniversity.description}
                </p>
              </div>
            )}

            <div className="mt-6 flex space-x-3">
              <Link
                to={`/university/${selectedUniversity.id}`}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors text-center"
              >
                Переглянути деталі
              </Link>
              <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition-colors">
                ❤️ Додати до улюблених
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Легенда */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white p-3 rounded-lg shadow-lg">
        <h4 className="font-semibold text-gray-900 text-sm mb-2">Легенда</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Державні університети</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Приватні університети</span>
          </div>
        </div>
      </div>

      {/* Інструкції */}
      <div className="absolute top-4 right-4 z-[1000] bg-white p-3 rounded-lg shadow-lg">
        <h4 className="font-semibold text-gray-900 text-sm mb-2">🗺️ Карта Європи</h4>
        <div className="text-xs text-gray-700 space-y-1">
          <div>• Клікайте на маркери для інформації</div>
          <div>• Використовуйте фільтри зліва</div>
          <div>• Зум та переміщення мишею</div>
        </div>
      </div>
    </div>
  );
} 