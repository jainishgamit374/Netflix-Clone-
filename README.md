# Netflix GPT

A modern React application that combines Netflix-style movie browsing with AI-powered movie recommendations using Google Gemini API.

## Features

- 🎬 Browse movies with Netflix-like interface
- 🤖 AI-powered movie recommendations using Google Gemini
- 🔐 User authentication with Firebase
- 🎯 Multi-language support
- 🔍 Search and filter movies
- 📱 Responsive design with Tailwind CSS
- ⚡ Fast development with Vite

## Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **State Management**: Redux Toolkit 2.9.2
- **UI Framework**: Tailwind CSS 3.4.18
- **Backend/Auth**: Firebase 12.4.0
- **AI Integration**: Google Generative AI 0.24.1
- **Routing**: React Router DOM 7.9.4
- **Icons**: React Icons 5.5.0
- **Code Quality**: ESLint 9.36.0

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn package manager
- Git

## Installation Guide

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/Netflix-GPT.git
cd Netflix-GPT-main
```

### Step 2: Install Dependencies

```bash
npm install
```

Or if using yarn:

```bash
yarn install
```

### Step 3: Set Up Environment Variables

1. Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

2. Update the `.env` file with your API keys:

```env
# TMDB (The Movie Database) API Configuration
VITE_TMDB_ACCESS_TOKEN=your_tmdb_access_token_here

# Google Gemini AI API Key
VITE_GEMINI_KEY=your_gemini_api_key_here

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Step 4: Obtaining API Keys

#### TMDB API Key
1. Visit [The Movie Database (TMDB)](https://www.themoviedb.org/)
2. Sign up for a free account
3. Go to Settings → API
4. Copy your API Access Token

#### Google Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Get API Key"
3. Create a new API key
4. Copy the key to your `.env` file

#### Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Go to Project Settings
5. Copy your Firebase configuration to `.env`

### Step 5: Run the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
Netflix-GPT/
├── public/                      # Static assets
│   └── vite.svg
├── src/                         # Source code
│   ├── assets/                  # Images and media files
│   │   └── react.svg
│   ├── components/              # React components
│   │   ├── App.jsx              # Main application component
│   │   ├── Header.jsx           # Navigation header
│   │   ├── Login.jsx            # Authentication component
│   │   ├── Body.jsx             # Main body layout
│   │   ├── Browse.jsx           # Movie browsing page
│   │   ├── VideoBackgrounds.jsx # Video background component
│   │   ├── VideoTitle.jsx       # Movie title and info
│   │   ├── SecondaryContainer.jsx # Additional movie info
│   │   ├── MovieList.jsx        # List of movies
│   │   ├── MovieCard.jsx        # Individual movie card
│   │   ├── GPTSearch.jsx        # GPT search interface
│   │   ├── GptSearchbar.jsx     # Search input component
│   │   ├── GptMovieSuggestion.jsx # AI movie suggestions
│   │   ├── ImpContainer.jsx     # Important container
│   ├── hooks/                   # Custom React hooks
│   │   ├── useMovieTrailer.jsx  # Fetch movie trailers
│   │   ├── useNowPlayingMovie.jsx # Fetch current movies
│   │   ├── usePopularMovies.jsx # Fetch popular movies
│   │   ├── useTopMovie.jsx      # Fetch top-rated movies
│   │   └── useUpcomingMovies.jsx # Fetch upcoming movies
│   ├── utils/                   # Utility functions and constants
│   │   ├── store.jsx            # Redux store configuration
│   │   ├── userSlice.jsx        # User state management
│   │   ├── moviesSlice.jsx      # Movies state management
│   │   ├── gptSlice.jsx         # GPT state management
│   │   ├── configSlice.jsx      # Configuration state
│   │   ├── firebase.jsx         # Firebase initialization
│   │   ├── Gemini.jsx           # Google Gemini API integration
│   │   ├── constants.jsx        # Application constants
│   │   ├── languageContant.jsx  # Language translations
│   │   └── validate.jsx         # Form validation utilities
│   ├── index.css                # Global styles
│   └── main.jsx                 # Application entry point
├── .env                         # Environment variables (not in repo)
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore file
├── .firebaserc                  # Firebase configuration
├── eslint.config.js             # ESLint configuration
├── firebase.json                # Firebase deployment config
├── index.html                   # HTML entry point
├── package.json                 # Project dependencies
├── package-lock.json            # Locked dependencies
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── vite.config.js               # Vite configuration
```

## Component Description

- **App.jsx**: Root component that sets up routing and global state
- **Header.jsx**: Navigation bar with user menu and search access
- **Login.jsx**: User authentication (sign up/login)
- **Body.jsx**: Main layout container
- **Browse.jsx**: Movie browsing interface with recommendations
- **VideoBackgrounds.jsx**: Featured movie/trailer display
- **GPTSearch.jsx**: AI-powered search and recommendations
- **MovieList.jsx**: Grid of movie cards
- **MovieCard.jsx**: Individual movie display

## Custom Hooks

- **useMovieTrailer**: Fetches and caches movie trailers
- **useNowPlayingMovie**: Gets currently playing movies
- **usePopularMovies**: Fetches popular movies
- **useTopMovie**: Gets top-rated movies
- **useUpcomingMovies**: Fetches upcoming movie releases

## State Management

Using Redux Toolkit with the following slices:
- **userSlice**: User authentication state
- **moviesSlice**: Movies data and metadata
- **gptSlice**: GPT search results and settings
- **configSlice**: App configuration and language settings

## Deployment

### Firebase Hosting

```bash
npm run build
firebase deploy
```

### Vercel Deployment

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```
This opens a browser or provides a URL with a code. After authentication, you'll see confirmation in the terminal.

#### Step 3: Build Your Project (Optional)
```bash
npm run build
```

#### Step 4: Deploy to Vercel
```bash
vercel
```

During deployment, you'll be prompted to:
1. **"Set up and deploy [your-directory]?"** → Answer: `yes`
2. **"Which scope should contain your project?"** → Select your account/team
3. **"Link to existing project?"** → Answer: `no` (for new projects)
4. **"What's your project's name?"** → Enter desired name or press Enter for default
5. **"In which directory is your code located?"** → Usually `./`
6. **Auto-detected settings** → Vercel shows detected framework settings
7. **"Want to modify these settings?"** → Usually `no`
8. **"Connect repository?"** → Answer `yes` to enable auto-deployment

#### Step 5: Get Your Live URL
After deployment completes, you'll receive:
- **Production URL**: Your live website link
- **Inspect Dashboard**: Management interface link

#### Step 6: Future Deployments

```bash
vercel --prod
```

### Alternative: Deploy via Vercel Web Interface

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Configure build settings (usually auto-detected)
6. Click "Deploy"

### Environment Variables on Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Navigate to Settings → Environment Variables
4. Add your environment variables from the `.env` file
5. Redeploy if needed

### Other Platforms

```bash
npm run build
# Deploy the 'dist' folder to your hosting platform
```

## Troubleshooting

### API Key Issues
- Ensure all environment variables are correctly set in `.env`
- Verify API keys are valid and not expired
- Check that APIs are enabled in their respective consoles

### Build Errors
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
npm run build
```

### Development Server Issues
- Clear Vite cache: `rm -rf .vite`
- Restart the dev server: `npm run dev`

## Future Enhancements

- [ ] User watchlist functionality
- [ ] Movie ratings and reviews
- [ ] Social sharing features
- [ ] Advanced filtering options
- [ ] Offline support with service workers
- [ ] Mobile app version

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@netflixgpt.com or open an issue in the repository.

---

**Happy Coding! 🚀**
