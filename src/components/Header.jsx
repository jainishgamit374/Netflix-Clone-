import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, dp, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const selectedLanguage = useSelector((state) => state.config.language);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => navigate("/error"));
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
    setMenuOpen(false);
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/95 backdrop-blur-md shadow-lg' 
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
        }`}
      >
        <div className="max-w-[1920px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6 lg:gap-8">
            <img
              className="w-24 sm:w-28 md:w-32 lg:w-36 cursor-pointer transition-transform duration-300 hover:scale-105"
              src={LOGO}
              alt="Netflix Logo"
              onClick={() => navigate("/browse")}
            />
          </div>

          {user && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-3 lg:gap-4">
                {/* Language Selector (shown when GPT Search is active) */}
                {showGptSearch && (
                  <div className="relative group">
                    <select
                      className="appearance-none bg-black/60 text-white border border-white/20 rounded-lg px-4 py-2.5 pr-10 
                        text-sm font-medium cursor-pointer transition-all duration-200
                        hover:bg-black/80 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      value={selectedLanguage}
                      onChange={handleLanguageChange}
                    >
                      {SUPPORTED_LANGUAGES.map((language) => (
                        <option
                          key={language.identifier}
                          value={language.identifier}
                          className="bg-black text-white"
                        >
                          {language.name}
                        </option>
                      ))}
                    </select>
                    <svg 
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 pointer-events-none"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}

                {/* GPT Search Toggle */}
                <button
                  className="relative px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-semibold 
                    rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
                  onClick={handleGptSearchClick}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {showGptSearch ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Homepage
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        AI Search
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>

                {/* Profile Dropdown */}
                <div className="relative group">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <img
                      className="h-9 w-9 lg:h-10 lg:w-10 rounded object-cover ring-2 ring-transparent group-hover:ring-red-500 transition-all duration-300"
                      src={dp}
                      alt="Profile"
                    />
                    <svg 
                      className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-180" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-3 w-56 bg-black/95 backdrop-blur-xl rounded-lg shadow-2xl 
                    border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                    transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2">
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <img src={dp} alt="Profile" className="h-10 w-10 rounded object-cover" />
                        <div>
                          <p className="text-white font-medium text-sm">{user?.displayName || "User"}</p>
                          <p className="text-gray-400 text-xs truncate max-w-[140px]">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <button className="w-full px-4 py-2.5 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Account
                      </button>
                      <button className="w-full px-4 py-2.5 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </button>
                      <div className="my-2 border-t border-white/10"></div>
                      <button 
                        onClick={handleSignOut}
                        className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-3 font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle Menu"
              >
                <svg
                  className="w-6 h-6 text-white transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay & Drawer */}
      {user && (
        <>
          {/* Backdrop */}
          <div
            className={`md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${
              menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer */}
          <div
            className={`md:hidden fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-black via-neutral-900 to-black z-50 
              shadow-2xl transform transition-transform duration-300 ease-out ${
              menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-white text-lg font-semibold">Menu</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close Menu"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Profile Section */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <img src={dp} alt="Profile" className="h-14 w-14 rounded-lg object-cover ring-2 ring-red-500" />
                <div className="flex-1">
                  <p className="text-white font-semibold text-base">{user?.displayName || "User"}</p>
                  <p className="text-gray-400 text-sm truncate">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-6 space-y-3">
              <button
                onClick={handleGptSearchClick}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg 
                  font-semibold text-base hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg 
                  hover:shadow-purple-500/50 flex items-center justify-center gap-2"
              >
                {showGptSearch ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Homepage
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    AI Search
                  </>
                )}
              </button>

              {showGptSearch && (
                <select
                  className="w-full p-3.5 bg-white/5 text-white border border-white/20 rounded-lg 
                    text-base font-medium cursor-pointer hover:bg-white/10 focus:outline-none 
                    focus:ring-2 focus:ring-red-500 transition-all"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                >
                  {SUPPORTED_LANGUAGES.map((language) => (
                    <option
                      key={language.identifier}
                      value={language.identifier}
                      className="bg-black text-white"
                    >
                      {language.name}
                    </option>
                  ))}
                </select>
              )}

              <button className="w-full py-3.5 px-4 bg-white/5 text-white rounded-lg text-base hover:bg-white/10 transition-all flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account
              </button>

              <button className="w-full py-3.5 px-4 bg-white/5 text-white rounded-lg text-base hover:bg-white/10 transition-all flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </button>

              <div className="pt-3 border-t border-white/10">
                <button
                  onClick={handleSignOut}
                  className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg 
                    font-semibold text-base transition-all shadow-lg hover:shadow-red-500/50 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;