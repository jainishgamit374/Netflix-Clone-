import React, { useRef, useState } from 'react';
import MovieCard from './MovieCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const MovieList = ({ title, movies, showTitle = true }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  if (!movies || movies.length === 0) return null;

  // Scroll functionality
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.8; // Scroll 80% of container width
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  // Handle scroll to show/hide arrows
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.offsetWidth - 10
    );
  };

  return (
    <div className="relative w-full group">
      {/* Title Section */}
      {showTitle && (
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white 
            group-hover:text-transparent group-hover:bg-clip-text 
            group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-purple-500
            transition-all duration-300">
            {title}
          </h2>
          
          {/* Optional: Explore All Link */}
          <button className="text-sm text-gray-400 hover:text-white transition-colors 
            flex items-center gap-1 group/link">
            <span className="hidden sm:inline">Explore All</span>
            <svg 
              className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-0 bottom-0 z-40 w-12 sm:w-16 md:w-20 
            bg-gradient-to-r from-black/90 via-black/70 to-transparent
            flex items-center justify-start pl-2 sm:pl-3 md:pl-4
            transition-all duration-300 group/arrow
            ${showLeftArrow ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          aria-label="Scroll Left"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black/80 hover:bg-black 
            rounded-full flex items-center justify-center
            border border-white/20 hover:border-white/40 hover:scale-110
            transition-all duration-300 shadow-xl">
            <FaChevronLeft className="text-white text-lg sm:text-xl" />
          </div>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-0 bottom-0 z-40 w-12 sm:w-16 md:w-20 
            bg-gradient-to-l from-black/90 via-black/70 to-transparent
            flex items-center justify-end pr-2 sm:pr-3 md:pr-4
            transition-all duration-300 group/arrow
            ${showRightArrow ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          aria-label="Scroll Right"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black/80 hover:bg-black 
            rounded-full flex items-center justify-center
            border border-white/20 hover:border-white/40 hover:scale-110
            transition-all duration-300 shadow-xl">
            <FaChevronRight className="text-white text-lg sm:text-xl" />
          </div>
        </button>

        {/* Movies Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-2 sm:gap-3 md:gap-4 
            px-4 sm:px-6 md:px-8 lg:px-12 pb-4 sm:pb-6
            scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 
                transform transition-all duration-300
                hover:scale-105 hover:z-10
                first:ml-0 last:mr-0"
              style={{
                animation: `fadeInScale 0.5s ease-out ${index * 0.05}s backwards`
              }}
            >
              <MovieCard 
                posterPath={movie?.poster_path}
                title={movie?.title || movie?.name}
                rating={movie?.vote_average}
                releaseDate={movie?.release_date || movie?.first_air_date}
                movieId={movie?.id}
              />
            </div>
          ))}

          {/* Load More Card (Optional) */}
          {movies.length >= 10 && (
            <div className="flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56">
              <div className="aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 
                rounded-lg border border-white/10 flex flex-col items-center justify-center 
                cursor-pointer hover:border-white/30 hover:bg-gradient-to-br 
                hover:from-gray-700 hover:to-gray-800 transition-all duration-300 group/more">
                <div className="text-4xl mb-2 group-hover/more:scale-110 transition-transform">➕</div>
                <p className="text-white text-sm font-semibold">See More</p>
                <p className="text-gray-400 text-xs mt-1">Browse all</p>
              </div>
            </div>
          )}
        </div>

        {/* Progress Indicator (Optional) */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 mt-2">
          <div className="h-0.5 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-purple-600 transition-all duration-300"
              style={{
                width: showLeftArrow ? '50%' : '0%'
              }}
            />
          </div>
        </div>
      </div>

      {/* Movie Count Badge */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 mt-2">
        <span className="text-xs text-gray-500">
          {movies.length} {movies.length === 1 ? 'title' : 'titles'}
        </span>
      </div>
    </div>
  );
};

export default MovieList;