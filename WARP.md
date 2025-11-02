# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server (Vite) at http://localhost:5173
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code quality checks

### Environment Setup
- Copy `.env.example` to `.env` and configure API keys:
  - `VITE_TMDB_ACCESS_TOKEN` - The Movie Database API access token
  - `VITE_GEMINI_KEY` - Google Gemini AI API key  
  - Firebase configuration variables (6 total)

### Testing
- No test framework configured - verify functionality through manual testing
- Test key flows: authentication, movie browsing, AI search, responsive design

## Architecture Overview

### Tech Stack
- **Frontend**: React 19.1.1 with Vite 7.1.7
- **State Management**: Redux Toolkit with 4 main slices
- **Styling**: Tailwind CSS 3.4.18 with custom animations
- **Authentication**: Firebase Auth
- **AI Integration**: Google Generative AI (Gemini)
- **Data Source**: TMDB (The Movie Database) API
- **Routing**: React Router DOM

### State Management Architecture
Redux store with 4 specialized slices:
- `userSlice` - Authentication state and user data
- `moviesSlice` - Movie data from TMDB (now playing, popular, top-rated, upcoming)
- `gptSlice` - AI search state and results
- `configSlice` - App configuration and language settings

### Component Architecture
**Main Layout Flow**:
```
App (Redux Provider) → Body → Browse/Login → Header + Content
```

**Two Primary Views**:
1. **Movie Browsing** (`Browse.jsx`):
   - `ImpContainer` - Hero section with featured movie/trailer
   - `SecondaryContainer` - Movie category lists
2. **AI Search** (`GPTSearch.jsx`):
   - `GptSearchbar` - Chat-like AI interface  
   - `GptMovieSuggestion` - AI-recommended movies

### Custom Hooks Pattern
Data fetching hooks follow consistent pattern:
- `useNowPlayingMovie`, `usePopularMovies`, `useTopMovie`, `useUpcomingMovies`
- Check Redux state first, fetch if empty, dispatch to store
- Handle errors gracefully with try/catch

### API Integration
- **TMDB API**: Movie data with standardized `API_OPTIONS` configuration
- **Gemini AI**: Movie recommendations based on natural language queries
- **Firebase**: Authentication with error handling and safe initialization

## Key Development Patterns

### Environment Variables
All sensitive data uses Vite's `import.meta.env.VITE_*` pattern for client-side access.

### Error Handling
- Firebase initialization with try/catch blocks
- API calls wrapped in error handling
- Graceful fallbacks for missing data

### Responsive Design
Extensive use of Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) with mobile-first approach.

### Component Organization
- `/components` - All React components
- `/hooks` - Custom hooks for data fetching
- `/utils` - Redux slices, API configurations, constants

### Styling Approach
- Tailwind utility classes with custom animations
- Gradient backgrounds and glassmorphism effects
- Consistent spacing and typography scales
- Dark theme with purple/blue accent colors

## API Dependencies

**Required for full functionality**:
- TMDB API access token (free tier available)
- Google Gemini API key (free tier with quotas)
- Firebase project with Authentication enabled

**API Endpoints Used**:
- TMDB: `/movie/now_playing`, `/movie/popular`, `/movie/top_rated`, `/movie/upcoming`
- Images: `https://image.tmdb.org/t/p/w500/`