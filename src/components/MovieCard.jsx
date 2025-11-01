import React from 'react'
import { IMG_CDN_URL } from "../utils/constants"

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="min-w-[110px] h-[165px] md:min-w-[150px] md:h-[255px] cursor-pointer transition-transform duration-300 hover:scale-105 bg-black text-white">
      <img 
        className="h-full w-full object-cover rounded-lg"
        src={IMG_CDN_URL + posterPath} 
        alt="Movie Card" 
      />
    </div>
  )
}

export default MovieCard
