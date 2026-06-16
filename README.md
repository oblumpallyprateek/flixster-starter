# 🎬 Flixster

A luxury cinema discovery app that helps you explore the latest movies playing in theaters. Built with React and powered by The Movie Database (TMDb) API, featuring AI-powered movie recommendations.

![Flixster Preview](public/movie.png)

## ✨ Features

### Core Features
- **🎥 Now Playing Movies** - Browse current theatrical releases in an elegant grid layout
- **🔍 Smart Search** - Find any movie by title with instant results
- **📄 Load More Pagination** - Seamlessly load additional movies as you browse
- **🔀 Flexible Sorting** - Sort by rating, release date, or title
- **📱 Fully Responsive** - Optimized experience across mobile, tablet, and desktop
- **🎯 Detailed Movie Modal** - View comprehensive movie information including runtime, genres, and overview
- **🤖 AI-Powered Recommendations** - Get personalized watch recommendations powered by OpenRouter API

### Stretch Features
- **🖤 Favorites System** - Mark movies you love with a single click
- **✓ Watched List** - Track movies you've already seen
- **📊 Smart Sidebar** - Manage your favorites and watched lists with one-click removal
- **⭐ Featured Hero Card** - First movie displays in a premium large-format layout

## 🎨 Design Philosophy

Flixster embraces a **luxury minimalist aesthetic** with a sophisticated black, silver, and white color palette. The design draws inspiration from premium streaming services, featuring:

- **Typography**: Playfair Display (serif) for elegant titles, Inter (sans-serif) for clean body text
- **Glass Morphism**: Backdrop blur effects and translucent elements throughout
- **Smooth Animations**: Cubic-bezier easing for premium feel
- **Attention to Detail**: Hover effects, micro-interactions, and refined spacing

## 🚀 Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **APIs**: 
  - The Movie Database (TMDb) API
  - OpenRouter API (for AI recommendations)
- **Fonts**: Google Fonts (Playfair Display, Inter)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- TMDb API Key ([Get one here](https://www.themoviedb.org/settings/api))
- OpenRouter API Key ([Get one here](https://openrouter.ai/keys))

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/flixster-starter.git
   cd flixster-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the project root:
   ```env
   VITE_API_KEY=your_tmdb_api_key_here
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🎯 Usage

### Browsing Movies
- The app loads with the latest "Now Playing" movies from TMDb
- The first movie appears as a featured hero card with a larger layout
- Scroll down to see additional movies in a responsive grid

### Searching
- Use the search bar at the top to find movies by title
- Click "Now Playing" to return to the main browse view

### Managing Lists
- Click the **white heart (🤍)** on any movie to add it to favorites (turns **black 🖤**)
- Click the **plus (+)** on any movie to mark it as watched (turns **checkmark ✓**)
- View your lists in the **sidebar** on the right
- Hover over any sidebar item to reveal a **remove button (✕)**

### Viewing Details
- Click any movie card or sidebar item to open the detail modal
- View runtime, genres, rating, and a full overview
- Get an **AI-generated watch recommendation** based on the movie's details

### Sorting
- Use the "Sort by" dropdown to organize movies by:
  - **Rating** (highest first)
  - **Release Date** (newest first)

## 📁 Project Structure

```
flixster-starter/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header with branding
│   │   ├── SearchBar.jsx       # Search input and sort controls
│   │   ├── MovieList.jsx       # Featured card + movie grid
│   │   ├── MovieCard.jsx       # Individual movie card
│   │   ├── MovieModal.jsx      # Detail modal with AI recommendations
│   │   ├── Sidebar.jsx         # Favorites and watched lists
│   │   └── Footer.jsx          # App footer
│   ├── App.jsx                 # Root component with state management
│   ├── App.css                 # Global styles and component styling
│   ├── index.css               # Base styles and typography
│   └── main.jsx                # React entry point
├── planning.md                 # Project specification and architecture
├── .env                        # Environment variables (not committed)
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🧠 Key Decisions

### State Management
- **Centralized state** in `App.jsx` for favorites and watched lists
- State lifted from `MovieCard` to enable sidebar functionality
- Uses `Set` data structure for O(1) lookup performance

### AI Integration
- **OpenRouter API** with `openrouter/free` model for cost-effective recommendations
- Prompt engineered to avoid spoilers and generic responses
- Graceful fallback for API failures

### Design Choices
- **Featured hero card** for visual hierarchy and premium feel
- **Monochrome hearts** (🤍/🖤) instead of red to maintain luxury aesthetic
- **Sidebar remove buttons** appear on hover for clean UI
- **Glass morphism** for modern, sophisticated appearance

## 🎓 What I Learned

- **Prompt Engineering**: Refined AI prompts to get consistent, high-quality responses
- **State Architecture**: Learned when to lift state vs. keep it local
- **API Integration**: Handled multiple endpoints (Now Playing, Search, Details, AI)
- **Responsive Design**: Built mobile-first with progressive enhancement
- **Component Design**: Created reusable, prop-driven components
- **User Experience**: Balanced aesthetics with usability (hover states, loading indicators, error handling)

## 🔮 Future Enhancements

- **Deployment** - Deploy to Render for public access
- **YouTube Trailers** - Embed official trailers in the movie modal
- **LocalStorage Persistence** - Save favorites/watched across sessions
- **User Authentication** - Personal accounts with cloud-synced lists
- **Advanced Filters** - Filter by genre, year, rating range
- **Dark/Light Mode** - Theme toggle (currently dark-only)
- **Watchlist** - Separate list for "want to watch" movies

## 📝 Planning & Documentation

This project was built following a specification-first approach. See [`planning.md`](planning.md) for:
- Component architecture and hierarchy
- API contracts and endpoints
- State architecture and data flow
- AI feature specification and decisions log

## 🙏 Acknowledgments

- **The Movie Database (TMDb)** - Movie data and imagery
- **OpenRouter** - AI model access
- **CodePath** - Project requirements and guidance
- **Google Fonts** - Playfair Display and Inter typefaces

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with 🖤 by Prateek Oblumpally**

*Part of CodePath's Summer Internship for Tech Excellence (SITE) program*
