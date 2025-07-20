import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Перевіряємо чи є необхідні змінні середовища
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase змінні середовища не налаштовані. Перевірте файл .env.local')
}

// Створюємо Supabase клієнт
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// API функції для роботи з університетами
export const universitiesApi = {
  // Отримати всі університети
  async getAll() {
    const { data, error } = await supabase
      .from('universities')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },

  // Отримати університет за ID
  async getById(id) {
    const { data, error } = await supabase
      .from('universities')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Пошук університетів
  async search(query) {
    const { data, error } = await supabase
      .from('universities')
      .select('*')
      .or(`name.ilike.%${query}%,city.ilike.%${query}%,country.ilike.%${query}%`)
      .order('name')
    
    if (error) throw error
    return data
  },

  // Фільтрація університетів
  async filter(filters) {
    let query = supabase
      .from('universities')
      .select('*')

    if (filters.country && filters.country !== 'all') {
      query = query.eq('country', filters.country)
    }

    if (filters.type && filters.type !== 'all') {
      query = query.eq('type', filters.type)
    }

    if (filters.minRating) {
      query = query.gte('rating', filters.minRating)
    }

    if (filters.maxTuition) {
      query = query.lte('tuition_max', filters.maxTuition)
    }

    const { data, error } = await query.order('name')
    
    if (error) throw error
    return data
  },

  // Отримати програми університету
  async getPrograms(universityId) {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('university_id', universityId)
      .order('name')
    
    if (error) throw error
    return data
  },

  // Додати університет до улюблених
  async addToFavorites(userId, universityId) {
    const { data, error } = await supabase
      .from('favorites')
      .insert([
        { user_id: userId, university_id: universityId }
      ])
    
    if (error) throw error
    return data
  },

  // Видалити університет з улюблених
  async removeFromFavorites(userId, universityId) {
    const { data, error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('university_id', universityId)
    
    if (error) throw error
    return data
  },

  // Отримати улюблені університети користувача
  async getFavorites(userId) {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        university_id,
        universities (*)
      `)
      .eq('user_id', userId)
    
    if (error) throw error
    return data.map(item => item.universities)
  }
}

// Функції для роботи з програмами
export const programsApi = {
  // Отримати всі програми
  async getAll() {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },

  // Отримати програму за ID
  async getById(id) {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Пошук програм
  async search(query) {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('name')
    
    if (error) throw error
    return data
  }
}

// Функції для автентифікації
export const authApi = {
  // Реєстрація
  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  // Вхід
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  // Вихід
  async signOut() {
    const { error } = await supabase.auth.signOut()
    
    if (error) throw error
  },

  // Отримати поточного користувача
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) throw error
    return user
  },

  // Підписка на зміни автентифікації
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
} 