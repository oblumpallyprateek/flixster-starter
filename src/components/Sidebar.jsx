const Sidebar = ({ movies, favorites, watched, onMovieClick }) => {
  const favoriteMovies = movies.filter(movie => favorites.has(movie.id));
  const watchedMovies = movies.filter(movie => watched.has(movie.id));

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h2>❤️ Favorites ({favoriteMovies.length})</h2>
        {favoriteMovies.length === 0 ? (
          <p className="sidebar-empty">No favorites yet. Click the heart on any movie!</p>
        ) : (
          <ul className="sidebar-list">
            {favoriteMovies.map(movie => (
              <li
                key={movie.id}
                className="sidebar-item"
                onClick={() => onMovieClick(movie)}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => e.key === 'Enter' && onMovieClick(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  className="sidebar-poster"
                />
                <div className="sidebar-info">
                  <h3>{movie.title}</h3>
                  <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="sidebar-section">
        <h2>✓ Watched ({watchedMovies.length})</h2>
        {watchedMovies.length === 0 ? (
          <p className="sidebar-empty">No watched movies yet. Click the circle on any movie!</p>
        ) : (
          <ul className="sidebar-list">
            {watchedMovies.map(movie => (
              <li
                key={movie.id}
                className="sidebar-item"
                onClick={() => onMovieClick(movie)}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => e.key === 'Enter' && onMovieClick(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  className="sidebar-poster"
                />
                <div className="sidebar-info">
                  <h3>{movie.title}</h3>
                  <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
