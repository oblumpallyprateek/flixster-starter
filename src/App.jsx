import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('now-playing');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [watched, setWatched] = useState(new Set());

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  const fetchNowPlayingMovies = async (page = 1) => {
    setIsLoading(true);
    setViewMode('now-playing');
    setSearchQuery('');

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`
      );

      if (!response.ok) {
        throw new Error('Unable to fetch movies');
      }

      const data = await response.json();
      const filteredMovies = data.results.filter(movie => movie.poster_path !== null);

      if (page === 1) {
        setMovies(filteredMovies);
      } else {
        setMovies(prevMovies => [...prevMovies, ...filteredMovies]);
      }

      setCurrentPage(data.page);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error('Error fetching movies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query, page = 1) => {
    if (!query.trim()) {
      return;
    }

    setIsLoading(true);
    setViewMode('search');

    if (page === 1) {
      setSearchQuery(query);
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
      );

      if (!response.ok) {
        throw new Error('Unable to fetch movies');
      }

      const data = await response.json();
      const filteredMovies = data.results.filter(movie => movie.poster_path !== null);

      if (page === 1) {
        setMovies(filteredMovies);
      } else {
        setMovies(prevMovies => [...prevMovies, ...filteredMovies]);
      }

      setCurrentPage(data.page);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error('Error searching movies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    const sortedMovies = [...movies].sort((a, b) => {
      if (newSortBy === 'rating') {
        return b.vote_average - a.vote_average;
      } else if (newSortBy === 'release_date') {
        return new Date(b.release_date) - new Date(a.release_date);
      } else if (newSortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
    setMovies(sortedMovies);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleToggleFavorite = (movieId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(movieId)) {
        newFavorites.delete(movieId);
      } else {
        newFavorites.add(movieId);
      }
      return newFavorites;
    });
  };

  const handleToggleWatched = (movieId) => {
    setWatched(prev => {
      const newWatched = new Set(prev);
      if (newWatched.has(movieId)) {
        newWatched.delete(movieId);
      } else {
        newWatched.add(movieId);
      }
      return newWatched;
    });
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    if (viewMode === 'search') {
      handleSearch(searchQuery, nextPage);
    } else {
      fetchNowPlayingMovies(nextPage);
    }
  };

  const showLoadMore = currentPage < totalPages && !isLoading;

  return (
    <div className="App">
      <Header />
      <SearchBar
        onSearch={handleSearch}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        onNowPlaying={fetchNowPlayingMovies}
        viewMode={viewMode}
      />
      <div className="main-content">
        <div className="content-area">
          <MovieList
            movies={movies}
            onMovieClick={handleMovieClick}
            isLoading={isLoading}
            favorites={favorites}
            watched={watched}
            onToggleFavorite={handleToggleFavorite}
            onToggleWatched={handleToggleWatched}
          />
          {showLoadMore && (
            <div className="load-more-container">
              <button className="load-more-button" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          )}
        </div>
        <Sidebar
          movies={movies}
          favorites={favorites}
          watched={watched}
          onMovieClick={handleMovieClick}
          onToggleFavorite={handleToggleFavorite}
          onToggleWatched={handleToggleWatched}
        />
      </div>
      <MovieModal
        movie={selectedMovie}
        onClose={handleCloseModal}
        isOpen={!!selectedMovie}
      />
      <Footer />
    </div>
  );
};

export default App;
