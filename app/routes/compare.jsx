import { useState, useEffect } from "react";
import { useComparison } from "../hooks/useComparison";
import { supabase } from "../lib/supabase";
import Layout from "../components/Layout";

export default function ComparePage() {
  const { 
    comparisonItems, 
    removeFromComparison, 
    clearComparison, 
    getComparisonCount,
    getComparisonFields 
  } = useComparison();
  
  const [universitiesWithPrograms, setUniversitiesWithPrograms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Завантаження програм для університетів в порівнянні
  useEffect(() => {
    const fetchProgramsForComparison = async () => {
      if (comparisonItems.length === 0) {
        setUniversitiesWithPrograms([]);
        return;
      }

      setLoading(true);
      try {
        const universityIds = comparisonItems.map(item => item.id);
        
        // Отримуємо програми для всіх університетів в порівнянні
        const { data: programsData } = await supabase
          .from('programs')
          .select('*')
          .in('university_id', universityIds);

        // Групуємо програми по університетах
        const universitiesWithProgramsData = comparisonItems.map(university => ({
          ...university,
          programs: programsData?.filter(p => p.university_id === university.id) || []
        }));

        setUniversitiesWithPrograms(universitiesWithProgramsData);
      } catch (error) {
        console.error('Помилка завантаження програм:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramsForComparison();
  }, [comparisonItems]);

  const comparisonFields = getComparisonFields();

  // Функція для форматування значень
  const formatValue = (value, type) => {
    if (value === null || value === undefined) return "Не вказано";
    
    switch (type) {
      case 'currency':
        return value ? `$${value}` : "Не вказано";
      case 'number':
        return value || "Не вказано";
      default:
        return value || "Не вказано";
    }
  };

  if (comparisonItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Порівняння університетів
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Додайте університети до порівняння, натискаючи кнопку "Порівняти" на картках університетів
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
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">📊 Порівняння університетів</h1>
                <p className="text-gray-600 mt-1">
                  Порівнюємо {getComparisonCount()} університетів
                </p>
              </div>
              
              <button
                onClick={clearComparison}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Очистити порівняння
              </button>
            </div>
          </div>
        </div>

        {/* Контент */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Завантаження даних...
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Таблиця порівняння */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Характеристика
                      </th>
                      {universitiesWithPrograms.map((university) => (
                        <th key={university.id} className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-lg">{university.name}</div>
                              <div className="text-sm text-gray-500">{university.city}, {university.country}</div>
                            </div>
                            <button
                              onClick={() => removeFromComparison(university.id)}
                              className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {comparisonFields.map((field) => (
                      <tr key={field.key} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {field.label}
                        </td>
                        {universitiesWithPrograms.map((university) => (
                          <td key={`${university.id}-${field.key}`} className="px-6 py-4 text-sm text-gray-900">
                            {field.key === 'programs_count' 
                              ? university.programs?.length || 0
                              : formatValue(university[field.key], field.type)
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                    
                    {/* Програми навчання */}
                    <tr className="bg-blue-50">
                      <td className="px-6 py-4 text-sm font-medium text-blue-900">
                        📚 Програми навчання
                      </td>
                      {universitiesWithPrograms.map((university) => (
                        <td key={`${university.id}-programs`} className="px-6 py-4">
                          <div className="space-y-2">
                            {university.programs?.slice(0, 3).map((program) => (
                              <div key={program.id} className="text-xs bg-white p-2 rounded border">
                                <div className="font-medium">{program.name}</div>
                                <div className="text-gray-500">
                                  {program.level} • {program.duration_months} міс.
                                </div>
                                {program.tuition_fee && (
                                  <div className="text-green-600 font-medium">
                                    ${program.tuition_fee}
                                  </div>
                                )}
                              </div>
                            ))}
                            {university.programs?.length > 3 && (
                              <div className="text-xs text-gray-500">
                                +{university.programs.length - 3} ще...
                              </div>
                            )}
                            {(!university.programs || university.programs.length === 0) && (
                              <div className="text-xs text-gray-500">
                                Програми не вказані
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Додаткова інформація */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              💡 <strong>Порада:</strong> Порівнюйте університети за ключовими критеріями та обирайте найкращий варіант для себе
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 