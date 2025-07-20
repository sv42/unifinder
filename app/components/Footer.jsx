export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Логотип та опис */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">University Finder</h3>
                <p className="text-gray-400 text-sm">Знайди свій ідеальний університет</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Використовуй AI помічника для пошуку найкращого навчального закладу. 
              Порівнюй програми, вартість навчання та кар'єрні перспективи.
            </p>
          </div>

          {/* Швидкі посилання */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Швидкі посилання</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Головна
                </a>
              </li>
              <li>
                <a href="/test" className="text-gray-400 hover:text-white transition-colors">
                  Тестування
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Про проект
                </a>
              </li>
            </ul>
          </div>

          {/* Контакти */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакти</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">
                📧 info@university-finder.com
              </li>
              <li className="text-gray-400">
                🌐 university-finder.com
              </li>
              <li className="text-gray-400">
                📱 +380 XX XXX XX XX
              </li>
            </ul>
          </div>
        </div>

        {/* Нижня частина */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 University Finder. Всі права захищені.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Політика конфіденційності
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Умови використання
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 