import React from 'react'
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptMovieSuggestion = () => {

  // const gpt = useSelectorstore(store => store.gpt)
  const {movieNames, movieResults} = useSelector((store) => store.gpt);

  if(!movieNames) return null;

  return (
    <>
      <div className="w-full">
        <div className="">
          {movieNames.map((movieName, index) => (
            <MovieList
              key={movieName}
              title={movieName}
              movies={movieResults[index]}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default GptMovieSuggestion;