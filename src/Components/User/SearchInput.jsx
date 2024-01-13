import React from 'react';

const SearchInput = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Buscá una canción..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-700 rounded-md p-2 w-full mb-4 bg-gray-600 focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchInput;
