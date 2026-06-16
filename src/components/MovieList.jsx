import MovieCard from './MovieCard';

const MovieList = ({ movies, onMovieClick, isLoading, favorites, watched, onToggleFavorite, onToggleWatched }) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

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

  const [featuredMovie, ...regularMovies] = movies;

  return (
    <>
      {/* Featured Movie - Large Hero Card */}
      {featuredMovie && (
        <div
          className="featured-movie"
          onClick={() => onMovieClick(featuredMovie)}
          role="button"
          tabIndex="0"
          onKeyDown={(e) => e.key === 'Enter' && onMovieClick(featuredMovie)}
        >
          <img
            src={`${IMAGE_BASE_URL}${featuredMovie.poster_path}`}
            alt={`${featuredMovie.title} poster`}
            className="featured-poster"
            loading="eager"
          />
          <div className="featured-details">
            <h2 className="featured-title">{featuredMovie.title}</h2>
            <div className="featured-meta">
              <span className="featured-rating">⭐ {featuredMovie.vote_average?.toFixed(1)}</span>
              <span>{new Date(featuredMovie.release_date).getFullYear()}</span>
            </div>
            <div className="featured-actions">
              <button
                className={`like-button ${favorites.has(featuredMovie.id) ? 'liked' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(featuredMovie.id);
                }}
                aria-label={favorites.has(featuredMovie.id) ? 'Unlike movie' : 'Like movie'}
              >
                {favorites.has(featuredMovie.id) ? '🖤' : '🤍'}
              </button>
              <button
                className={`watched-button ${watched.has(featuredMovie.id) ? 'watched' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWatched(featuredMovie.id);
                }}
                aria-label={watched.has(featuredMovie.id) ? 'Mark as unwatched' : 'Mark as watched'}
                title={watched.has(featuredMovie.id) ? 'Watched' : 'Mark as watched'}
              >
                {watched.has(featuredMovie.id) ? '✓' : '+'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Regular Movie Grid */}
      <div className="movie-list">
        {regularMovies.map((movie) => (
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
    </>
  );
};

export default MovieList;
