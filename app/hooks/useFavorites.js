import { useState, useEffect } from "react";

const FAVORITES_KEY = "university_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Завантаження улюблених з localStorage при ініціалізації
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Помилка завантаження улюблених:", error);
        setFavorites([]);
      }
    }
  }, []);

  // Збереження улюблених в localStorage
  const saveFavorites = (newFavorites) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  // Додавання університету в улюблені
  const addToFavorites = (university) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === university.id);
    if (!isAlreadyFavorite) {
      const newFavorites = [...favorites, university];
      saveFavorites(newFavorites);
    }
  };

  // Видалення університету з улюблених
  const removeFromFavorites = (universityId) => {
    const newFavorites = favorites.filter(fav => fav.id !== universityId);
    saveFavorites(newFavorites);
  };

  // Перевірка чи університет в улюблених
  const isFavorite = (universityId) => {
    return favorites.some(fav => fav.id === universityId);
  };

  // Очищення всіх улюблених
  const clearFavorites = () => {
    saveFavorites([]);
  };

  // Отримання кількості улюблених
  const getFavoritesCount = () => {
    return favorites.length;
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
    getFavoritesCount
  };
} 