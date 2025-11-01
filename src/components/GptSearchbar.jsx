import React, { useRef, useState } from "react";
import lang from "../utils/languageContant";
import { useDispatch, useSelector } from "react-redux";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_OPTIONS, GEMINI_KEY } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

let isCalling = false;

const GptSearchbar = () => {
  const dispatch = useDispatch();
  const langkey = useSelector((store) => store.config?.lang) || "en";
  const searchText = useRef();
  const chatContainerRef = useRef();
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(movie) +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    if (isCalling) return;
    isCalling = true;

    const userQuery = searchText.current.value;
    if (!userQuery.trim()) {
      isCalling = false;
      return;
    }

    setIsLoading(true);

    // Push User Message
    setChats((prev) => [...prev, { role: "user", text: userQuery }]);
    setTimeout(scrollToBottom, 100);

    const prompt =
      "Act as a movie recommendation system & suggest movies based on the query: " +
      userQuery +
      ". Only give top 5 movies, comma separated. Example: Gadar, Sholay, Sanam Teri Kasam, 1920, Golmaal";

    try {
      const response = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const output = await response.response.text();

      // Push AI reply
      setChats((prev) => [...prev, { role: "ai", text: output }]);
      setTimeout(scrollToBottom, 100);

      // Extract Movie Names
      const gptMovies = output.split(",").map((m) => m.trim());

      // Search each movie in TMDB
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      console.log("TMDB Movies 👉", tmdbResults);
      dispatch(addGptMovieResults({ movieNames: gptMovies, movieResults: tmdbResults }));
    } catch (error) {
      setChats((prev) => [
        ...prev,
        { 
          role: "ai", 
          text: "⚠️ Oops! Something went wrong. Please try again in a moment.",
          isError: true 
        },
      ]);
      setTimeout(scrollToBottom, 100);
    }

    searchText.current.value = "";
    setIsLoading(false);
    setTimeout(() => (isCalling = false), 6000);
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGptSearchClick();
    }
  };

  // Clear chat
  const handleClearChat = () => {
    setChats([]);
  };

  return (
    <div className="w-full">
      {/* Main Search Card */}
      <div className="w-full max-w-4xl mx-auto bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-white/10 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 rounded-lg blur-md animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base sm:text-lg">AI Movie Assistant</h3>
                <p className="text-gray-400 text-xs sm:text-sm">Powered by Gemini AI</p>
              </div>
            </div>
            
            {chats.length > 0 && (
              <button
                onClick={handleClearChat}
                className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-white/10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Chat Container */}
        <div 
          ref={chatContainerRef}
          className={`px-4 sm:px-6 py-4 space-y-4 overflow-y-auto transition-all duration-300 ${
            chats.length === 0 ? 'max-h-0 py-0' : 'max-h-[300px] sm:max-h-[400px]'
          }`}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#8B5CF6 transparent'
          }}
        >
          {chats.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">Your conversation will appear here</p>
            </div>
          ) : (
            chats.map((chat, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 animate-fadeInUp ${
                  chat.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
                style={{
                  animation: `fadeInUp 0.4s ease-out ${i * 0.1}s backwards`
                }}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                  chat.role === "user"
                    ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white"
                    : "bg-gradient-to-br from-gray-700 to-gray-800 text-gray-200"
                }`}>
                  {chat.role === "user" ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[75%] sm:max-w-[80%] px-4 py-3 rounded-2xl text-sm sm:text-base leading-relaxed ${
                  chat.role === "user"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-tr-sm"
                    : chat.isError
                    ? "bg-red-500/20 border border-red-500/30 text-red-200 rounded-tl-sm"
                    : "bg-white/10 backdrop-blur-sm border border-white/20 text-gray-100 rounded-tl-sm"
                }`}>
                  <p className="whitespace-pre-wrap break-words">{chat.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3 rounded-2xl rounded-tl-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="border-t border-white/10 p-4 sm:p-6 bg-black/40">
          <form
            className="flex items-end gap-2 sm:gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Input Field */}
            <div className="flex-1 relative">
              <textarea
                ref={searchText}
                rows="1"
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none
                  text-sm sm:text-base max-h-32 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent"
                placeholder={lang[langkey]?.gptSearchPlaceholder || "Ask for movie recommendations..."}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                style={{ scrollbarWidth: 'thin' }}
              />
              
              {/* Character count or status */}
              <div className="absolute right-3 bottom-3 text-xs text-gray-500">
                {isLoading ? (
                  <span className="text-purple-400">Processing...</span>
                ) : null}
              </div>
            </div>

            {/* Send Button */}
            <button
              onClick={handleGptSearchClick}
              disabled={isLoading}
              className={`flex-shrink-0 p-3 sm:p-3.5 rounded-xl font-semibold transition-all duration-300 ${
                isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 active:scale-95 shadow-lg hover:shadow-purple-500/50'
              }`}
              type="button"
            >
              {isLoading ? (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </form>

          {/* Helper Text */}
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span>Press Enter to send</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              AI Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GptSearchbar;