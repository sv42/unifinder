import { Link } from "react-router";
import { useFavorites } from "../hooks/useFavorites";
import { useComparison } from "../hooks/useComparison";

export default function Header() {
  const { getFavoritesCount } = useFavorites();
  const { getComparisonCount } = useComparison();
  
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">University Finder</h1>
              <p className="text-sm text-gray-500">Знайди свій ідеальний університет</p>
            </div>
          </div>

          {/* Навігація */}
          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Головна
            </Link>
            <Link 
              to="/favorites" 
              className="text-gray-500 hover:text-blue-600 transition-colors relative"
            >
              <span className="flex items-center">
                ❤️ Улюблені
                {getFavoritesCount() > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {getFavoritesCount()}
                  </span>
                )}
              </span>
            </Link>
            <Link 
              to="/compare" 
              className="text-gray-500 hover:text-blue-600 transition-colors relative"
            >
              <span className="flex items-center">
                📊 Порівняти
                {getComparisonCount() > 0 && (
                  <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {getComparisonCount()}
                  </span>
                )}
              </span>
            </Link>

            <Link 
              to="/map" 
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              🗺️ Карта
            </Link>
            <Link 
              to="/ai-assistant" 
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              🤖 AI Помічник
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
} 