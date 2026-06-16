const Sidebar = ({ movies, favorites, watched, onMovieClick, onToggleFavorite, onToggleWatched }) => {
  const favoriteMovies = movies.filter(movie => favorites.has(movie.id));
  const watchedMovies = movies.filter(movie => watched.has(movie.id));

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h2>🖤 Favorites ({favoriteMovies.length})</h2>
        {favoriteMovies.length === 0 ? (
          <p className="sidebar-empty">No favorites yet. Click the heart on any movie!</p>
        ) : (
          <ul className="sidebar-list">
            {favoriteMovies.map(movie => (
              <li
                key={movie.id}
                className="sidebar-item"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  className="sidebar-poster"
                  onClick={() => onMovieClick(movie)}
                />
                <div className="sidebar-info" onClick={() => onMovieClick(movie)}>
                  <h3>{movie.title}</h3>
                  <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                </div>
                <button
                  className="sidebar-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(movie.id);
                  }}
                  aria-label="Remove from favorites"
                  title="Remove from favorites"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="sidebar-section">
        <h2>✓ Watched ({watchedMovies.length})</h2>
        {watchedMovies.length === 0 ? (
          <p className="sidebar-empty">No watched movies yet. Click the + button on any movie!</p>
        ) : (
          <ul className="sidebar-list">
            {watchedMovies.map(movie => (
              <li
                key={movie.id}
                className="sidebar-item"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  className="sidebar-poster"
                  onClick={() => onMovieClick(movie)}
                />
                <div className="sidebar-info" onClick={() => onMovieClick(movie)}>
                  <h3>{movie.title}</h3>
                  <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                </div>
                <button
                  className="sidebar-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWatched(movie.id);
                  }}
                  aria-label="Remove from watched"
                  title="Remove from watched"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
