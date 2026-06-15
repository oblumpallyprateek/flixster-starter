import { useState, useEffect } from 'react';

const MovieModal = ({ movie, onClose, isOpen }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  const getMovieInsight = async (title, genres, overview, rating) => {
    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

    // Gracefully skip if no API key
    if (!API_KEY) {
      console.warn('OpenRouter API key not found');
      return null;
    }

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-70b-instruct:free",
          messages: [
            {
              role: "system",
              content: "You are an enthusiastic but honest film critic who gives practical watch recommendations. Write 2-3 sentences that help users decide if a movie is worth their evening. Focus on who would enjoy it and why. Mention tone, pacing, or standout elements when relevant. Keep it conversational and honest. Never use 'I think' or 'I recommend' - write as if it's a fact. No spoilers beyond what's in the overview. No generic phrases like 'must-see'."
            },
            {
              role: "user",
              content: `Give a watch recommendation for:\n\nTitle: ${title}\nGenres: ${genres}\nOverview: ${overview}\nRating: ${rating}/10`
            }
          ]
        })
      });

      if (!response.ok) throw new Error(`OpenRouter error: ${response.status}`);

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("AI insight failed:", error);
      return "We couldn't generate a recommendation for this one — check out the overview above!";
    }
  };

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

  useEffect(() => {
    if (!movieDetails || aiInsight !== null) return;

    const fetchAiInsight = async () => {
      setLoadingInsight(true);
      const genres = movieDetails.genres?.map(g => g.name).join(', ') || 'Unknown';
      const insight = await getMovieInsight(
        movie.title,
        genres,
        movie.overview || 'No overview available',
        movie.vote_average
      );
      setAiInsight(insight);
      setLoadingInsight(false);
    };

    fetchAiInsight();
  }, [movieDetails, aiInsight, movie]);

  useEffect(() => {
    // Reset AI insight state when modal closes
    if (!isOpen) {
      setAiInsight(null);
      setLoadingInsight(false);
      setMovieDetails(null);
    }
  }, [isOpen]);

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

              {/* AI Recommendation Section */}
              {(loadingInsight || aiInsight) && (
                <div className="ai-recommendation">
                  <h3>🤖 AI Recommendation</h3>
                  {loadingInsight ? (
                    <p className="ai-loading">✨ Getting a recommendation...</p>
                  ) : (
                    <p>{aiInsight}</p>
                  )}
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
