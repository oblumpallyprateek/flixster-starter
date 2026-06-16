import MovieCard from './MovieCard';

const MovieList = ({ movies, onMovieClick, isLoading, favorites, watched, onToggleFavorite, onToggleWatched }) => {
  if (isLoading) {
    return <div className="loading">Loading movies...</div>;
  }

  if (movies.length === 0) {
    return (
      <div className="no-movies">
        <p>No movies found</p>
      </div>
    );
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={onMovieClick}
          isLiked={favorites.has(movie.id)}
          isWatched={watched.has(movie.id)}
          onToggleFavorite={() => onToggleFavorite(movie.id)}
          onToggleWatched={() => onToggleWatched(movie.id)}
        />
      ))}
    </div>
  );
};

export default MovieList;
