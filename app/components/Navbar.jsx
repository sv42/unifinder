import { Link } from 'react-router';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Логотип та назва */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">У</span>
              </div>
              <span className="text-xl font-bold text-gray-900">UniversityFinder</span>
            </Link>
          </div>

          {/* Навігаційні посилання */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Головна
            </Link>
            <Link 
              to="/map" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              🗺️ Карта університетів
            </Link>
            <Link 
              to="/compare" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              📊 Порівняння
            </Link>
            <Link 
              to="/favorites" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              ❤️ Улюблені
            </Link>
            <Link 
              to="/ai-assistant" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              🤖 AI Помічник
            </Link>
          </div>

          {/* Кнопки авторизації */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Увійти
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Зареєструватися
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 