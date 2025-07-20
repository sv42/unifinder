import { useState } from "react";
import { Welcome } from "../welcome/welcome";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchForm from "../components/SearchForm";
import UniversityList from "../components/UniversityList";
import Footer from "../components/Footer";

export function meta() {
  return [
    { title: "University Finder - Пошук університетів" },
    { name: "description", content: "Знайди свій ідеальний університет з AI помічником" },
  ];
}

export default function Home() {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <SearchForm onSearchResults={handleSearchResults} />
      <UniversityList searchParams={searchResults} />
      
      {/* Основний контент */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <Welcome />
          
          {/* Лінк на тестування */}
          <div className="text-center py-8">
            <a 
              href="/test" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🧪 Тестування Supabase
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
} 