import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useEffect, useState } from "react";

const VideoBackgrounds = ({ movieId }) => {
  useMovieTrailer(movieId);

  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  // Handles responsive updates on resize (for mobile border radius and sizing)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    // Initial check
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!trailerVideo?.key) return null;

  return (
    <div
      className={`
        w-full h-full absolute inset-0 -z-10 overflow-hidden
        aspect-video
        min-h-[180px] sm:min-h-[300px]
        lg:min-h-[480px] xl:min-h-[620px]
        ${isMobile ? 'max-h-[35vh]' : 'max-h-[60vh] sm:max-h-[80vh] md:max-h-[90vh] lg:max-h-[95vh] xl:max-h-[900px]'}
      `}
      style={{
        minHeight: isMobile ? "180px" : "200px",
        maxHeight: isMobile ? "35vh" : "900px",
        height: isMobile ? "35vh" : undefined,
        background: "#111", // fallback color for loading
      }}
    >
      <div className="w-full h-full">
        <iframe
          width="100%"
          height="100%"
          className={`
            object-cover
            w-full h-full
            min-h-[180px] sm:min-h-[300px]
            lg:min-h-[480px] xl:min-h-[620px]
            ${isMobile ? "rounded-none" : "sm:rounded-xl"}
            aspect-video
          `}
          src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo.key}`}
          title="Movie Trailer"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          style={{
            aspectRatio: "16/9",
            minHeight: isMobile ? 180 : 200,
            maxHeight: isMobile ? "35vh" : "900px",
            border: 0,
            width: "100%",
            height: "100%",
            display: "block",
            borderRadius: isMobile ? 0 : "0.75rem",
            objectFit: "cover",
            // Improve touch interaction issues on mobile
            pointerEvents: "none",
          }}
        ></iframe>
      </div>
      {/* Enhanced overlays for legibility, a bit stronger on mobile */}
      <div
        className={`absolute inset-0 pointer-events-none
          ${isMobile
            ? "bg-gradient-to-t from-black/90 via-black/70 to-transparent"
            : "bg-gradient-to-t from-black via-black/60 to-transparent"
          }
        `}
      ></div>
      <div
        className={`
          absolute inset-x-0 bottom-0 h-1/4 
          ${isMobile
            ? "bg-gradient-to-t from-black/90 via-transparent to-transparent"
            : "bg-gradient-to-t from-black via-transparent to-transparent"
          }
          pointer-events-none
        `}
      ></div>
    </div>
  );
};

export default VideoBackgrounds;
