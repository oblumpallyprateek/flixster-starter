import { useState } from 'react';

const SearchBar = ({ onSearch, sortBy, onSortChange, onNowPlaying, viewMode }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleNowPlaying = () => {
    setInputValue('');
    onNowPlaying();
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for movies..."
          className="search-input"
          aria-label="Search for movies"
        />
        <button type="submit" className="search-button">
          Search
        </button>
        {viewMode === 'search' && (
          <button type="button" className="now-playing-button" onClick={handleNowPlaying}>
            Now Playing
          </button>
        )}
      </form>

      <div className="sort-controls">
        <label htmlFor="sort-select">Sort by:</label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          <option value="rating">Rating</option>
          <option value="release_date">Release Date</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
