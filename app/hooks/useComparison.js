import { useState, useEffect } from "react";

const COMPARISON_KEY = "university_comparison";
const MAX_COMPARISON_ITEMS = 4; // Максимум 4 університети для порівняння

export function useComparison() {
  const [comparisonItems, setComparisonItems] = useState([]);

  // Завантаження порівняння з localStorage при ініціалізації
  useEffect(() => {
    const savedComparison = localStorage.getItem(COMPARISON_KEY);
    if (savedComparison) {
      try {
        setComparisonItems(JSON.parse(savedComparison));
      } catch (error) {
        console.error("Помилка завантаження порівняння:", error);
        setComparisonItems([]);
      }
    }
  }, []);

  // Збереження порівняння в localStorage
  const saveComparison = (newComparison) => {
    localStorage.setItem(COMPARISON_KEY, JSON.stringify(newComparison));
    setComparisonItems(newComparison);
  };

  // Додавання університету до порівняння
  const addToComparison = (university) => {
    const isAlreadyInComparison = comparisonItems.some(item => item.id === university.id);
    
    if (isAlreadyInComparison) {
      return { success: false, message: "Університет вже в порівнянні" };
    }
    
    if (comparisonItems.length >= MAX_COMPARISON_ITEMS) {
      return { success: false, message: `Максимум ${MAX_COMPARISON_ITEMS} університетів для порівняння` };
    }
    
    const newComparison = [...comparisonItems, university];
    saveComparison(newComparison);
    return { success: true, message: "Додано до порівняння" };
  };

  // Видалення університету з порівняння
  const removeFromComparison = (universityId) => {
    const newComparison = comparisonItems.filter(item => item.id !== universityId);
    saveComparison(newComparison);
  };

  // Перевірка чи університет в порівнянні
  const isInComparison = (universityId) => {
    return comparisonItems.some(item => item.id === universityId);
  };

  // Очищення всіх порівнянь
  const clearComparison = () => {
    saveComparison([]);
  };

  // Отримання кількості університетів в порівнянні
  const getComparisonCount = () => {
    return comparisonItems.length;
  };

  // Перевірка чи можна додати ще університетів
  const canAddMore = () => {
    return comparisonItems.length < MAX_COMPARISON_ITEMS;
  };

  // Отримання унікальних характеристик для порівняння
  const getComparisonFields = () => {
    return [
      { key: 'name', label: 'Назва', type: 'text' },
      { key: 'country', label: 'Країна', type: 'text' },
      { key: 'city', label: 'Місто', type: 'text' },
      { key: 'rating', label: 'Рейтинг', type: 'number' },
      { key: 'tuition_fee_min', label: 'Мін. вартість', type: 'currency' },
      { key: 'tuition_fee_max', label: 'Макс. вартість', type: 'currency' },
      { key: 'programs_count', label: 'Кількість програм', type: 'number' }
    ];
  };

  return {
    comparisonItems,
    addToComparison,
    removeFromComparison,
    isInComparison,
    clearComparison,
    getComparisonCount,
    canAddMore,
    getComparisonFields,
    maxItems: MAX_COMPARISON_ITEMS
  };
} 