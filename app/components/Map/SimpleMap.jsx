import { useState, useEffect } from 'react';

export default function SimpleMap() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMap = async () => {
      try {
        console.log('SimpleMap: Початок завантаження...');
        
        // Додаємо CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
        
        console.log('SimpleMap: CSS додано');
        
        // Імпортуємо Leaflet
        const L = await import('leaflet');
        console.log('SimpleMap: Leaflet імпортовано');
        
        // Створюємо карту
        const map = L.default.map('map').setView([50.0, 20.0], 5);
        console.log('SimpleMap: Карта створена');
        
        // Додаємо тайли
        L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        console.log('SimpleMap: Тайли додано');
        
        // Додаємо маркер
        const marker = L.default.marker([50.4501, 30.5234]).addTo(map);
        marker.bindPopup('Київський університет').openPopup();
        console.log('SimpleMap: Маркер додано');
        
        setMapLoaded(true);
        console.log('SimpleMap: Карта успішно завантажена!');
        
      } catch (err) {
        console.error('SimpleMap: Помилка:', err);
        setError(err.message);
      }
    };

    loadMap();
  }, []);

  if (error) {
    return (
      <div className="w-full h-[600px] bg-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">❌ Помилка завантаження карти</div>
          <div className="text-red-500 mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Спробувати знову
          </button>
        </div>
      </div>
    );
  }

  if (!mapLoaded) {
    return (
      <div className="w-full h-[600px] bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Завантаження простої карти...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] relative">
      <div id="map" className="w-full h-full"></div>
      <div className="absolute top-4 left-4 bg-white p-3 rounded shadow">
        <h3 className="font-semibold">Проста карта</h3>
        <p className="text-sm text-gray-600">Якщо ти бачиш цю карту, то Leaflet працює!</p>
      </div>
    </div>
  );
} 