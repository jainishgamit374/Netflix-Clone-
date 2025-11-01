import { useSelector } from "react-redux";
import VideoBackgrounds from "./VideoBackgrounds";
import VideoTitle from "./VideoTitle";

const ImpContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    const isLoading = useSelector(store => store.movies?.isLoading);

    // Loading State
    if (isLoading) {
        return (
            <div className="relative w-full h-screen bg-black overflow-hidden">
                {/* Skeleton Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>

                {/* Skeleton Content */}
                <div className="relative z-10 flex flex-col justify-end h-full px-6 sm:px-12 md:px-16 lg:px-20 pb-32 sm:pb-40 space-y-4 sm:space-y-6">
                    {/* Title Skeleton */}
                    <div className="space-y-3">
                        <div className="h-8 sm:h-12 md:h-16 bg-gray-700/50 rounded-lg w-3/4 sm:w-2/3 animate-pulse"></div>
                        <div className="h-6 sm:h-8 bg-gray-700/30 rounded-lg w-1/2 sm:w-1/3 animate-pulse delay-75"></div>
                    </div>

                    {/* Overview Skeleton */}
                    <div className="space-y-2 max-w-2xl">
                        <div className="h-4 bg-gray-700/40 rounded w-full animate-pulse delay-150"></div>
                        <div className="h-4 bg-gray-700/40 rounded w-5/6 animate-pulse delay-200"></div>
                        <div className="h-4 bg-gray-700/40 rounded w-4/6 animate-pulse delay-300"></div>
                    </div>

                    {/* Buttons Skeleton */}
                    <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                        <div className="h-12 sm:h-14 w-32 sm:w-40 bg-gray-700/50 rounded-lg animate-pulse"></div>
                        <div className="h-12 sm:h-14 w-32 sm:w-40 bg-gray-700/30 rounded-lg animate-pulse delay-75"></div>
                    </div>
                </div>

                {/* Loading Indicator */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-red-600/30 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-red-600 rounded-full animate-spin"></div>
                        </div>
                        <p className="text-white text-sm font-medium animate-pulse">Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    // No Movies Available
    if (!movies || movies.length === 0) {
        return (
            <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                </div>

                {/* Empty State Content */}
                <div className="relative z-10 text-center px-6 max-w-md space-y-6 animate-fadeInUp">
                    {/* Icon */}
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-red-600/20 rounded-full blur-2xl animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-red-600/20 to-purple-600/20 p-8 rounded-full border border-red-600/30">
                            <svg 
                                className="w-20 h-20 text-red-500" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={1.5} 
                                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" 
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="space-y-3">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white">
                            No Movies Available
                        </h2>
                        <p className="text-gray-400 text-base sm:text-lg">
                            We couldn't find any movies to display right now. Please check back later.
                        </p>
                    </div>

                    {/* Action Button */}
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-6 px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
                            text-white font-semibold rounded-lg shadow-lg hover:shadow-red-500/50 
                            transition-all duration-300 active:scale-95"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        );
    }

    // Main Movie Display
    const mainMovie = movies[0];
    const { original_title, overview, id } = mainMovie;

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Video Background with Fade-in Animation */}
            <div className="absolute inset-0 animate-fadeIn">
                <VideoBackgrounds movieId={id} />
            </div>

            {/* Gradient Overlays for Better Text Visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10"></div>

            {/* Video Title with Slide-in Animation */}
            <div className="relative z-20 animate-slideInLeft">
                <VideoTitle title={original_title} overview={overview} movieId={id} />
            </div>

            {/* Optional: Movie Info Badge */}
            <div className="absolute top-24 sm:top-28 right-6 sm:right-12 md:right-16 lg:right-20 z-20 animate-fadeInDown">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-white text-xs sm:text-sm font-medium">Now Playing</span>
                </div>
            </div>

            {/* Optional: Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden sm:block">
                <div className="flex flex-col items-center gap-2 text-white/60">
                    <span className="text-xs font-medium">Scroll for more</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>

            {/* Optional: Movie Count Indicator */}
            {movies.length > 1 && (
                <div className="absolute bottom-8 right-6 sm:right-12 md:right-16 lg:right-20 z-20 animate-fadeIn">
                    <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-2">
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                        <span className="text-white text-sm font-medium">
                            {movies.length} Movies
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImpContainer;