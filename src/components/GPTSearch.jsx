import React from 'react'
import GptSearchbar from './GptSearchbar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { bg } from '../utils/constants'

const GPTSearch = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Enhanced Background with Multiple Layers */}
      <div className="fixed inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src={bg}
          alt="Background"
        />
        {/* Gradient Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20"></div>
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-start pt-24 sm:pt-28 md:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="w-full max-w-4xl mx-auto mb-8 sm:mb-12 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full border border-purple-500/30 backdrop-blur-sm mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-md animate-pulse"></div>
              <svg className="w-5 h-5 text-purple-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-purple-300">AI Powered Search</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Discover Your Next
            <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
              Favorite Movie
            </span>
          </h1>
          
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Let AI find the perfect movies for you. Just describe what you're in the mood for.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
            
            {/* Search Bar */}
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-1 shadow-2xl">
              <GptSearchbar />
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm text-gray-400 font-medium">Try:</span>
            {['Action thrillers', 'Romantic comedies', 'Sci-fi adventures', 'Horror classics'].map((tip, index) => (
              <button
                key={index}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-full border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
              >
                {tip}
              </button>
            ))}
          </div>
        </div>

        {/* Movie Suggestions Container */}
        <div className="w-full max-w-7xl mx-auto">
          <GptMovieSuggestion />
        </div>

        {/* Feature Highlights (Optional) */}
        <div className="w-full max-w-4xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">Get instant movie recommendations powered by advanced AI</p>
          </div>

          <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Smart Suggestions</h3>
            <p className="text-gray-400 text-sm">AI understands context and your unique preferences</p>
          </div>

          <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Vast Library</h3>
            <p className="text-gray-400 text-sm">Access thousands of movies across all genres</p>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10"></div>
    </div>
  )
}

export default GPTSearch