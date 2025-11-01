import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const VideoTitle = ({ title, overview, backdropPath }) => {
  return (
    <div className="relative w-full text-white min-h-[60vh] sm:min-h-[70vh] md:min-h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>
      {/* Content */}
      <div
        className={`
          absolute
          left-1 right-1
          bottom-8
          sm:left-8 sm:right-auto sm:bottom-24
          md:left-16 md:bottom-1/4
          max-w-[98vw] sm:max-w-lg md:max-w-xl
          px-2 sm:px-0
        `}
      >
        {/* Title */}
        <h1 className="
          text-xl
          sm:text-4xl
          md:text-6xl
          font-bold mb-2 sm:mb-4 drop-shadow-xl
          max-w-full break-words
          leading-tight sm:leading-tight md:leading-snug
          line-clamp-2 sm:line-clamp-none
        ">
          {title}
        </h1>
        {/* Overview */}
        <p className="
          text-xs
          sm:text-base
          md:text-lg
          mb-3 sm:mb-5 md:mb-6
          line-clamp-2 sm:line-clamp-3
          drop-shadow-lg
          max-w-full
          opacity-90
        ">
          {overview}
        </p>
        {/* Buttons */}
        <div className="flex gap-2 sm:gap-4 w-full flex-row flex-wrap">
          <button className="
            flex items-center justify-center
            bg-white text-black font-semibold
            px-3 py-2 sm:px-6 sm:py-3
            rounded
            hover:bg-gray-300 transition duration-200 shadow-xl
            text-sm sm:text-lg
            w-full xs:w-auto sm:w-auto
            focus:outline-none
          ">
            <FaPlay className="mr-2 text-sm sm:text-base" />
            Play
          </button>
          <button className="
            flex items-center justify-center
            bg-gray-700 bg-opacity-80 text-white font-semibold
            px-3 py-2 sm:px-6 sm:py-3
            rounded
            hover:bg-opacity-90 transition duration-200 shadow-xl
            text-sm sm:text-lg
            w-full xs:w-auto sm:w-auto
            focus:outline-none
          ">
            <AiOutlineInfoCircle className="mr-2 text-base sm:text-lg" />
            More Info
          </button>
        </div>
      </div>
      {/* Optional bottom fade */}
      <div className="absolute bottom-0 w-full h-12 sm:h-24 md:h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
};

export default VideoTitle;
