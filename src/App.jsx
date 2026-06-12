import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import Footer from './components/Footer';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('now-playing');

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  const fetchNowPlayingMovies = async () => {
    setIsLoading(true);
    setViewMode('now-playing');

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}&page=1`
      );

      if (!response.ok) {
        throw new Error('Unable to fetch movies');
      }

      const data = await response.json();
      const filteredMovies = data.results.filter(movie => movie.poster_path !== null);
      setMovies(filteredMovies);
    } catch (err) {
      console.error('Error fetching movies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      return;
    }

    setIsLoading(true);
    setViewMode('search');

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(query)}&page=1`
      );

      if (!response.ok) {
        throw new Error('Unable to fetch movies');
      }

      const data = await response.json();
      const filteredMovies = data.results.filter(movie => movie.poster_path !== null);
      setMovies(filteredMovies);
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

  return (
    <div className="App">
      <Header />
      <SearchBar
        onSearch={handleSearch}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
      <MovieList
        movies={movies}
        onMovieClick={handleMovieClick}
        isLoading={isLoading}
      />
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
