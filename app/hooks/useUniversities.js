import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

export function useUniversities() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Отримання всіх університетів
  const fetchUniversities = useCallback(async () => {
    // Запобігаємо повторному завантаженню
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Завантажуємо тільки університети
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .order('name');

      if (error) throw error;
      
      setUniversities(data || []);
    } catch (err) {
      console.error('Помилка завантаження університетів:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Пошук університетів
  const searchUniversities = useCallback(async (searchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('universities')
        .select('*');

      // Фільтр по назві університету
      if (searchParams.query) {
        query = query.ilike('name', `%${searchParams.query}%`);
      }

      // Фільтр по країні
      if (searchParams.country) {
        query = query.eq('country', searchParams.country);
      }

      // Фільтр по місту
      if (searchParams.city) {
        query = query.ilike('city', `%${searchParams.city}%`);
      }

      // Фільтр по бюджету (вартість навчання)
      if (searchParams.budgetRange) {
        const budgetRanges = {
          "До 5000$ на рік": { min: 0, max: 5000 },
          "5000-10000$ на рік": { min: 5000, max: 10000 },
          "10000-20000$ на рік": { min: 10000, max: 20000 },
          "20000-30000$ на рік": { min: 20000, max: 30000 },
          "Понад 30000$ на рік": { min: 30000, max: 999999 }
        };
        
        const range = budgetRanges[searchParams.budgetRange];
        if (range) {
          query = query.gte('tuition_fee_min', range.min).lte('tuition_fee_max', range.max);
        }
      }

      // Сортування
      const sortOptions = {
        rating: 'rating',
        name: 'name',
        country: 'country',
        tuition_fee: 'tuition_fee_min'
      };
      
      if (searchParams.sortBy && sortOptions[searchParams.sortBy]) {
        query = query.order(sortOptions[searchParams.sortBy], { ascending: searchParams.sortBy === 'name' || searchParams.sortBy === 'country' });
      } else {
        query = query.order('rating', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;
      
      setUniversities(data || []);
    } catch (err) {
      console.error('Помилка пошуку університетів:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Отримання університетів по спеціальності
  const searchBySpecialty = async (specialty) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .ilike('name', `%${specialty}%`)
        .order('name');

      if (error) throw error;
      
      setUniversities(data || []);
    } catch (err) {
      console.error('Помилка пошуку по спеціальності:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Отримання університетів по країні
  const getUniversitiesByCountry = async (country) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('country', country)
        .order('name');

      if (error) throw error;
      
      setUniversities(data || []);
    } catch (err) {
      console.error('Помилка отримання університетів по країні:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Отримання унікальних країн
  const getCountries = async () => {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('country')
        .order('country');

      if (error) throw error;
      
      const uniqueCountries = [...new Set(data.map(item => item.country))];
      return uniqueCountries;
    } catch (err) {
      console.error('Помилка отримання країн:', err);
      return [];
    }
  };

  // Отримання унікальних спеціальностей (поки що порожній масив)
  const getSpecialties = async () => {
    return [];
  };

  // Завантаження університетів при першому використанні хука
  useEffect(() => {
    // Завантажуємо тільки якщо університети ще не завантажені
    if (universities.length === 0 && !loading) {
      fetchUniversities();
    }
  }, []); // Порожній масив залежностей - викликається тільки один раз

  return {
    universities,
    loading,
    error,
    fetchUniversities,
    searchUniversities,
    searchBySpecialty,
    getUniversitiesByCountry,
    getCountries,
    getSpecialties
  };
} 