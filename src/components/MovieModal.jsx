import { useState, useEffect } from 'react';

const MovieModal = ({ movie, onClose, isOpen }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState(null);

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    if (!movie || !isOpen) return;

    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${import.meta.env.VITE_API_KEY}`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie, isOpen]);

  if (!isOpen || !movie) return null;

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : '/movie.png';

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {isLoading ? (
          <div className="modal-loading">Loading details...</div>
        ) : (
          <>
            <div className="modal-header">
              <img
                src={posterUrl}
                alt={`${movie.title} poster`}
                className="modal-poster"
              />
              <div className="modal-info">
                <h2>{movie.title}</h2>
                <p className="modal-rating">⭐ {movie.vote_average?.toFixed(1)} / 10</p>
                {movieDetails?.runtime && (
                  <p className="modal-runtime">Runtime: {movieDetails.runtime} min</p>
                )}
                {movieDetails?.genres && (
                  <p className="modal-genres">
                    {movieDetails.genres.map(g => g.name).join(', ')}
                  </p>
                )}
              </div>
            </div>

            <div className="modal-body">
              <h3>Overview</h3>
              <p>{movie.overview}</p>

              {aiInsight && (
                <div className="ai-recommendation">
                  <h3>🤖 AI Recommendation</h3>
                  <p>{aiInsight}</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
