import Header from "./Header";
import useNowPlayingMovie from "../hooks/useNowPlayingMovie";
import usePopularMovies from "../hooks/usePopularMovies";
import SecondaryContainer from "./SecondaryContainer";
import ImpContainer from "./ImpContainer";
import GPTSearch from "./GPTSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovie();
  usePopularMovies();

  return (
    <div>
      <Header />

      {showGptSearch ? (
        <GPTSearch />
      ) : (
        <>
          <ImpContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;