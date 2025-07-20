import EnvCheck from "../components/EnvCheck";
import UrlDebug from "../components/UrlDebug";
import DatabaseCheck from "../components/DatabaseCheck";
import SupabaseTest from "../components/SupabaseTest";
import Navbar from "../components/Navbar";

export function meta() {
  return [
    { title: "University Finder - Тестування" },
    { name: "description", content: "Тестування підключення до Supabase та бази даних" },
  ];
}

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🧪 Тестування University Finder
            </h1>
            <p className="text-lg text-gray-600">
              Перевірка підключення до Supabase та бази даних
            </p>
          </div>

          {/* Компоненти тестування */}
          <div className="space-y-6">
            <EnvCheck />
            <UrlDebug />
            <DatabaseCheck />
            <SupabaseTest />
          </div>

          {/* Інформація про тестування */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              ℹ️ Інформація про тестування
            </h2>
            <div className="text-blue-700 space-y-2">
              <p>
                <strong>EnvCheck:</strong> Перевіряє наявність та правильність змінних середовища
              </p>
              <p>
                <strong>UrlDebug:</strong> Детальна перевірка формату Supabase URL
              </p>
              <p>
                <strong>DatabaseCheck:</strong> Перевіряє наявність таблиць та даних в базі
              </p>
              <p>
                <strong>SupabaseTest:</strong> Тестує підключення та показує список університетів
              </p>
            </div>
            <div className="mt-4 p-3 bg-blue-100 rounded">
              <p className="text-blue-800 text-sm">
                <strong>Порада:</strong> Якщо всі компоненти показують ✅, можна переходити до розробки основного функціоналу!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 