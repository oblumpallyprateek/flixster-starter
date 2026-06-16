const MovieCard = ({ movie, onClick, isLiked, isWatched, onToggleFavorite, onToggleWatched }) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  const handleWatchedClick = (e) => {
    e.stopPropagation();
    onToggleWatched();
  };

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : '/movie.png';

  return (
    <div
      className="movie-card"
      onClick={() => onClick(movie)}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => e.key === 'Enter' && onClick(movie)}
    >
      <img
        src={posterUrl}
        alt={`${movie.title} poster`}
        className="movie-poster"
        loading="lazy"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-rating">⭐ {movie.vote_average?.toFixed(1)}</span>
          <div className="movie-actions">
            <button
              className={`like-button ${isLiked ? 'liked' : ''}`}
              onClick={handleLikeClick}
              aria-label={isLiked ? 'Unlike movie' : 'Like movie'}
            >
              {isLiked ? '❤️' : '🤍'}
            </button>
            <button
              className={`watched-button ${isWatched ? 'watched' : ''}`}
              onClick={handleWatchedClick}
              aria-label={isWatched ? 'Mark as unwatched' : 'Mark as watched'}
              title={isWatched ? 'Watched' : 'Mark as watched'}
            >
              {isWatched ? '✓' : '○'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
