import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <section className="relative z-30 bg-gradient-to-b from-[#141414] via-[#18181b] to-[#0f0f0f] -mt-40 px-2 xs:px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24 pb-4 w-full">
      <div className="flex flex-col gap-y-4 sm:gap-y-8 w-full max-w-7xl mx-auto">
        {/* Responsive Movie Lists with Netflix colors */}
        <MovieList
          title={<span className="text-red-600 font-bold">Now Playing</span>}
          movies={movies.nowPlayingMovies}
        />
        <MovieList
          title={<span className="text-red-700 font-bold">Top Rated</span>}
          movies={movies.topMovies}
        />
        <MovieList
          title={<span className="text-[#d81f26] font-bold">Horror Movie</span>}
          movies={movies.nowPlayingMovies}
        />
        <MovieList
          title={<span className="text-[#e50914] font-bold">Popular</span>}
          movies={movies.popularMovies}
        />
        <MovieList
          title={<span className="text-red-500 font-bold">Upcoming Movies</span>}
          movies={movies.upcomingMovies}
        />
      </div>
    </section>
  );
};

export default SecondaryContainer;
