import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false); // Track if no results are found
  const navigate = useNavigate();

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setNoResultsFound(false); // Reset the "no results" flag at the start of the search

    // Simulate the search operation
    setTimeout(() => {
      // Assume no results found for this demo
      setIsSearching(false);
      setNoResultsFound(true); // Set to true if no results are found
    }, 1000); // Simulate a delay
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for recipes..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-recipe-green focus:border-transparent"
          disabled={isSearching}
        />
        <button
          type="submit"
          className="absolute left-0 top-0 h-full px-3 flex items-center justify-center text-gray-500 hover:text-recipe-green"
          disabled={isSearching}
        >
          <Search size={20} />
        </button>
      </form>

      {isSearching && <div>Loading...</div>}

      {/* Show "No results found" only if search term is not empty and no results are found */}
      {noResultsFound && !isSearching && searchTerm.trim() && (
        <div className="mt-4 text-gray-600">No results found for "{searchTerm}".</div>
      )}
    </div>
  );
};

export default SearchBar;
