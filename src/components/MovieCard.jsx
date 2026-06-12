import { useState } from 'react';

const MovieCard = ({ movie, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
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
          <button
            className={`like-button ${isLiked ? 'liked' : ''}`}
            onClick={handleLikeClick}
            aria-label={isLiked ? 'Unlike movie' : 'Like movie'}
          >
            {isLiked ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
