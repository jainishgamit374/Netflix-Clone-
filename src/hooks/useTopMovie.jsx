import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTopMovies } from "../utils/moviesSlice";

const useTopMovies = () => {
  const dispatch = useDispatch();

  const getTopMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?page=1",
        API_OPTIONS
      );
      const json = await data.json();

      dispatch(addTopMovies(json.results));  // ✅ same as your working code
    } catch (error) {
      console.error("Failed to fetch top movies:", error);
    }
  };

  useEffect(() => {
    getTopMovies();  // ✅ call same way as popular
  }, []);
};

export default useTopMovies;
