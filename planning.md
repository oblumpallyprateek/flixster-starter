# Flixster Project Planning

## Component Architecture

### Component Hierarchy
```
App
├── Header
├── SearchBar
├── MovieList
│   └── MovieCard (multiple)
├── MovieModal
└── Footer
```

### Component Specifications

#### **App** (`App.jsx`)
- **Responsibility**: Root component that manages global state and orchestrates all other components
- **Renders**: Header, SearchBar, MovieList, MovieModal (conditionally), Footer
- **Props**: None (root component)
- **State**:
  - `movies` (array): Current list of movies to display
  - `searchQuery` (string): Current search term
  - `currentPage` (number): Pagination state
  - `selectedMovie` (object | null): Movie selected for modal display
  - `isLoading` (boolean): Loading state for API calls
  - `error` (string | null): Error messages from API
  - `sortBy` (string): Current sort option ('rating' | 'release_date')
  - `viewMode` (string): 'now-playing' | 'search'

#### **Header**
- **Responsibility**: Display app branding and navigation
- **Renders**: App title/logo
- **Props**: None
- **State**: None

#### **SearchBar**
- **Responsibility**: Handle user search input and sort controls
- **Renders**: Search input field, search button, sort dropdown
- **Props**:
  - `onSearch` (function): Callback to trigger search
  - `sortBy` (string): Current sort option
  - `onSortChange` (function): Callback when sort changes
- **State**:
  - `inputValue` (string): Local input field value (controlled input)

#### **MovieList**
- **Responsibility**: Render grid of movie cards
- **Renders**: Grid container with multiple MovieCard components
- **Props**:
  - `movies` (array): Array of movie objects to display
  - `onMovieClick` (function): Callback when a movie card is clicked
  - `isLoading` (boolean): Show loading state
- **State**: None (presentational component)

#### **MovieCard**
- **Responsibility**: Display individual movie information in card format
- **Renders**: Movie poster, title, rating, like button
- **Props**:
  - `movie` (object): Movie data (id, title, poster_path, vote_average, release_date)
  - `onClick` (function): Callback when card is clicked
- **State**:
  - `isLiked` (boolean): Like state for this movie

#### **MovieModal**
- **Responsibility**: Display detailed movie information in a modal overlay
- **Renders**: Modal overlay with movie details (poster, title, overview, genres, runtime, rating)
- **Props**:
  - `movie` (object | null): Selected movie object
  - `onClose` (function): Callback to close modal
  - `isOpen` (boolean): Controls modal visibility
- **State**:
  - `movieDetails` (object | null): Full movie details including runtime and genres
  - `isLoading` (boolean): Loading state for details fetch
  - `aiInsight` (string | null): AI-generated watch recommendation

#### **Footer**
- **Responsibility**: Display footer information and credits
- **Renders**: Footer content (copyright, TMDb attribution)
- **Props**: None
- **State**: None

---

## API Contracts

### Base Configuration
- **Base URL**: `https://api.themoviedb.org/3`
- **Image Base URL**: `https://image.tmdb.org/t/p/w500` (for poster paths)
- **Authentication**: API key via query parameter `?api_key=${VITE_API_KEY}`

### Endpoints

#### **1. Now Playing Movies**
- **URL**: `/movie/now_playing`
- **Method**: GET
- **Required Parameters**:
  - `api_key` (string): TMDb API key
  - `page` (number): Page number for pagination (default: 1)
- **Response Fields Used**:
  - `results[]` (array of objects):
    - `id` (number): Movie ID
    - `title` (string): Movie title
    - `poster_path` (string): Poster image path
    - `vote_average` (number): Rating (0-10)
    - `release_date` (string): Release date (YYYY-MM-DD)
    - `overview` (string): Movie description
  - `page` (number): Current page
  - `total_pages` (number): Total available pages
- **Error Cases**:
  - 401: Invalid API key
  - 404: Resource not found
  - Network errors: Display "Unable to fetch movies"

#### **2. Search Movies**
- **URL**: `/search/movie`
- **Method**: GET
- **Required Parameters**:
  - `api_key` (string): TMDb API key
  - `query` (string): Search term
  - `page` (number): Page number (default: 1)
- **Response Fields Used**: Same as Now Playing
- **Error Cases**: Same as Now Playing, plus:
  - Empty query: Display message "Please enter a search term"

#### **3. Movie Details**
- **URL**: `/movie/{movie_id}`
- **Method**: GET
- **Required Parameters**:
  - `api_key` (string): TMDb API key
  - `movie_id` (number): ID of movie to fetch
- **Response Fields Used**:
  - All fields from Now Playing, plus:
    - `runtime` (number): Runtime in minutes
    - `genres[]` (array of objects):
      - `id` (number): Genre ID
      - `name` (string): Genre name
- **Error Cases**:
  - 404: Movie not found
  - Network errors: Display "Unable to load movie details"

---

## State Architecture

### Global State (App Component)

| State Variable | Type | Initial Value | Owner | Update Triggers |
|---------------|------|---------------|-------|-----------------|
| `movies` | `Array<Object>` | `[]` | App | Successful API response (Now Playing or Search) |
| `searchQuery` | `string` | `''` | App | User submits search form |
| `currentPage` | `number` | `1` | App | User clicks pagination controls |
| `selectedMovie` | `Object \| null` | `null` | App | User clicks a MovieCard |
| `isLoading` | `boolean` | `false` | App | Before/after API calls |
| `error` | `string \| null` | `null` | App | API errors occur |
| `sortBy` | `string` | `'rating'` | App | User changes sort dropdown |
| `viewMode` | `string` | `'now-playing'` | App | User searches or returns to Now Playing |

### Local State

#### SearchBar Component
- `inputValue` (string): Controlled input value, resets after search submission

#### MovieCard Component
- `isLiked` (boolean): Per-card like state, initialized to `false`

#### MovieModal Component
- `movieDetails` (object | null): Detailed movie data from `/movie/{id}` endpoint
- `isLoading` (boolean): Loading state while fetching details
- `aiInsight` (string | null): AI-generated recommendation text

---

## Data Flow

### Now Playing Flow
1. **App component mounts** → `useEffect` triggers fetch to `/movie/now_playing`
2. **API returns data** → Store in `movies` state after optional transformation
3. **Data transformation** (if needed):
   - Filter out movies without poster images: `movie.poster_path !== null`
   - Format rating to 1 decimal place: `vote_average.toFixed(1)`
4. **Render flow**:
   - App passes `movies` array to MovieList
   - MovieList maps over array, renders MovieCard for each item
   - MovieCard receives individual `movie` object as prop
   - MovieCard constructs image URL: `${IMAGE_BASE_URL}${movie.poster_path}`

### Search Flow
1. **User types in SearchBar** → Local `inputValue` state updates
2. **User submits form** → `onSearch` callback fires with search query
3. **App component** → Sets `searchQuery` state, sets `viewMode` to 'search'
4. **useEffect watches `searchQuery`** → Triggers fetch to `/search/movie?query=${searchQuery}`
5. **API returns data** → Store in `movies` state (replaces Now Playing results)
6. **Render flow**: Same as Now Playing

### Movie Details Flow (Modal)
1. **User clicks MovieCard** → `onClick` callback fires with `movie.id`
2. **App component** → Sets `selectedMovie` state to the clicked movie object
3. **MovieModal renders** → Receives `movie` prop, triggers `useEffect` to fetch `/movie/{movie.id}`
4. **API returns details** → Stores in local `movieDetails` state (includes runtime, genres)
5. **Modal displays** → Shows data from both `movie` prop (basic info) and `movieDetails` (runtime, genres)
6. **User clicks close** → `onClose` callback sets `selectedMovie` to `null`, modal unmounts

### Sort Flow
1. **User changes sort dropdown** → `onSortChange` callback fires with new sort option
2. **App component** → Sets `sortBy` state
3. **useEffect or inline sort** → Sorts current `movies` array:
   - 'rating': `movies.sort((a, b) => b.vote_average - a.vote_average)`
   - 'release_date': `movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))`
4. **Re-render** → MovieList displays sorted movies

---

## AI Feature Spec

### Feature: Personalized Watch Recommendation

#### Finalized Prompt Spec

**Role**: An enthusiastic but honest film critic who gives practical watch recommendations

**Task**: Write a 2-3 sentence watch recommendation that helps users decide if this movie is worth their evening

**Inputs**:
- Movie `title` (string)
- Movie `genres` (comma-separated string from genre names)
- Movie `overview` (string)
- Movie `vote_average` (number)

**Output Format**: 
- Plain text, 2-3 sentences
- No spoilers beyond what's in the overview
- No "I think" or "I recommend" statements (write as if it's a fact)
- No generic phrases like "this film is a must-see"

**Constraints**:
- Focus on who would enjoy this movie and why
- Mention the tone, pacing, or standout elements when relevant
- Keep it conversational and honest

**Failure Behavior**: 
If the AI call fails, display: "We couldn't generate a recommendation for this one — check out the overview above!"

#### OpenRouter Configuration
- **Endpoint**: `https://openrouter.ai/api/v1/chat/completions`
- **Model**: `meta-llama/llama-3.3-70b-instruct:free` (free tier)
- **API Key**: Stored in `.env` as `VITE_OPENROUTER_API_KEY`

#### State Variables
- `aiInsight` (string | null): Holds the AI-generated recommendation text
- `loadingInsight` (boolean): Loading state while AI call is in progress
- Both in MovieModal component, initialized to `null` and `false`

#### Trigger
When the modal opens and movie details have been successfully fetched (in a `useEffect` that watches `movieDetails`)

#### UI Display
- Section in modal below movie overview
- Header: "🤖 AI Recommendation"
- Loading state: "✨ Getting a recommendation..."
- Success state: Display the AI-generated text
- Error/No Key state: Section doesn't render (graceful degradation)

#### Implementation Notes
- Reset `aiInsight` and `loadingInsight` when modal closes
- Only call AI once per modal open (don't re-fetch if already loaded)
- Handle missing API key gracefully (check if key exists before calling)

### AI Feature — Decisions Log
*To be filled during implementation*

- **What the API returned initially:** 
- **What I changed in my prompt:** 
- **What fallback behavior I implemented:** 
- **What I learned:**

---

## Implementation Notes

### Responsive Design
- Grid layout: CSS Grid with `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))`
- Breakpoint at 600px (already in App.css): Movie cards stack to full width on mobile
- SearchBar switches to column layout on mobile

### Error Handling Strategy
- Network errors: Display banner with retry button
- Empty search results: Show "No movies found" message with button to return to Now Playing
- Invalid API key: Display setup instructions

### Performance Considerations
- Debounce search input (wait 300ms after user stops typing before API call)
- Lazy load images with loading placeholder
- Limit initial Now Playing fetch to 20 movies (1 page)

### Accessibility
- Movie cards: `role="button"`, `tabIndex="0"`, keyboard enter support
- Modal: Focus trap, Escape key to close, `aria-modal="true"`
- Search form: Proper `<label>` for input field

---

## Responsive Design Breakpoints (Milestone 3)

### Breakpoint Strategy
- **Mobile (< 600px)**: 1 card per row, stacked layout
- **Tablet (600px - 1024px)**: 2-3 cards per row
- **Desktop (> 1024px)**: 4-6 cards per row (auto-fill based on viewport)

### Grid Behavior
- Use CSS Grid with `auto-fill` and `minmax(200px, 1fr)` for natural reflow
- Cards maintain minimum 200px width to stay legible
- Search bar stacks vertically on mobile
- Modal header switches from horizontal to vertical layout on mobile

---

## Next Steps (Milestone 1+)
1. ✅ Create component files and folder structure
2. ✅ Implement Now Playing fetch and MovieCard rendering
3. ✅ Add SearchBar and search functionality
4. ✅ Build MovieModal with detail fetch
5. ✅ Implement sort controls
6. ✅ Make responsive for all devices
7. Add like/unlike functionality with localStorage
8. Integrate pagination
9. Implement AI feature
10. Testing and deployment
