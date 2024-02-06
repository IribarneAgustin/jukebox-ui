import React from 'react';
import Autosuggest from 'react-autosuggest';

const SearchInputAuto = ({
  searchQuery,
  setSearchQuery,
  suggestions,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  onBuy
}) => {
  const handleOnChange = (event, { newValue }) => {
    setSearchQuery(newValue);
  };

  const inputProps = {
    placeholder: 'Buscá una canción...',
    value: searchQuery,
    onChange: handleOnChange,
    className: 'border border-purple-700 rounded-md p-2 w-full lg:w-96 mb-4 bg-gray-800 focus:outline-none focus:border-blue-500',
  };

  const renderSuggestion = (suggestion) => (
    <li
      key={suggestion.trackName}
      className="max-w-md rounded overflow-hidden shadow-lg bg-gradient-to-br from-purple-950 to-purple-900 text-white cursor-pointer mb-2 flex items-center"
      onClick={() => onBuy(suggestion)}
    >
      <img className="w-16 h-16 object-cover" src={suggestion.albumCover} alt={suggestion.trackName} />
      <div className="flex-grow p-4">
        {suggestion.length === 0 ? (
          <div className="font-bold text-xl mb-1">No se encontraron resultados</div>
        ) : (
          <div className="font-bold text-xl mb-1">{suggestion.artistName} - {suggestion.trackName}</div>
        )}
      </div>
    </li>
  );

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => suggestion.trackName}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default SearchInputAuto;
