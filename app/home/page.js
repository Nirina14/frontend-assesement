'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    // Fetch data dari API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setResults(data);
        setFilteredResults(data);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = results.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-white pt-10">
      <div className="w-full max-w-md">
        <form onSubmit={handleSearch} className="text-left">
          <h2 className="text-2xl font-normal mb-6 text-center">Telusur</h2>
          <div className="mb-4 mx-auto w-[783px]">
            <input
              className="shadow appearance-none border rounded w-full h-[67px] px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="search"
              type="text"
              placeholder="Masukkan keyword"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
          </div>
        </form>
        {filteredResults.length > 0 ? (
          <div className="text-black mx-auto w-[783px]">
            {filteredResults.map((user) => (
              <div key={user.id} className="mb-2">
                {user.name}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">Tidak ada hasil yang ditemukan</p>
        )}
      </div>
    </div>
  );
}
