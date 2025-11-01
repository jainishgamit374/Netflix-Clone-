import React, { useRef, useState } from 'react';
import Header from './Header';
import validate from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleButtonClick = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    
    const message = validate(
      !isSignInForm ? name.current?.value : null,
      email.current.value,
      password.current.value,
      isSignInForm
    );
    
    setErrorMessage(message);
    if (message) return;

    setIsLoading(true);

    try {
      if (!isSignInForm) {
        // Sign Up
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          email.current.value, 
          password.current.value
        );
        
        // Update profile with name
        await updateProfile(userCredential.user, {
          displayName: name.current.value
        });
        
        setSuccessMessage('🎉 Account created successfully!');
      } else {
        // Sign In
        await signInWithEmailAndPassword(
          auth, 
          email.current.value, 
          password.current.value
        );
        setSuccessMessage('✅ Welcome back!');
      }

      // Reset inputs
      email.current.value = "";
      password.current.value = "";
      if (name.current) name.current.value = "";
      
    } catch (error) {
      const friendlyErrors = {
        'auth/email-already-in-use': 'This email is already registered. Please sign in.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/weak-password': 'Password should be at least 6 characters.',
        'auth/invalid-credential': 'Invalid email or password.',
      };
      
      setErrorMessage(friendlyErrors[error.code] || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-black overflow-hidden">
      <Header />
      
      {/* Enhanced Background with Parallax Effect */}
      <div className="fixed inset-0 z-0">
        <img
          className="w-full h-full object-cover scale-110 animate-slow-zoom"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9ba9f0e2-b246-47f4-bd1f-3e84c23a5db8/web/IN-en-20251020-TRIFECTA-perspective_d6da84e9-6145-4b1e-bb51-e402c966a045_large.jpg"
          alt="Background"
        />
        {/* Multi-layer Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-purple-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]"></div>
      </div>

      {/* Login Container */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
        <div className="w-full max-w-md">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-purple-600/20 blur-3xl -z-10 animate-pulse"></div>
          
          {/* Login Card */}
          <div className="bg-black/75 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-fadeInUp">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-red-600/10 to-purple-600/10 px-6 sm:px-10 py-6 border-b border-white/10">
              <h2 className="text-3xl sm:text-4xl font-bold text-center">
                <span className="bg-gradient-to-r from-red-500 via-red-600 to-purple-600 bg-clip-text text-transparent">
                  {isSignInForm ? 'Welcome Back' : 'Get Started'}
                </span>
              </h2>
              <p className="text-gray-400 text-center text-sm mt-2">
                {isSignInForm ? 'Sign in to continue watching' : 'Create your account to start'}
              </p>
            </div>

            {/* Form */}
            <form 
              onSubmit={(e) => e.preventDefault()} 
              className="px-6 sm:px-10 py-8 space-y-5"
            >
              {/* Name Input (Sign Up Only) */}
              {!isSignInForm && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center">
                    <svg className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <input
                      ref={name}
                      type="text"
                      placeholder="Full Name"
                      className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400
                        focus:bg-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all duration-300"
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <svg className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    ref={email}
                    type="email"
                    placeholder="Email Address"
                    className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400
                      focus:bg-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all duration-300"
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <svg className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400
                      focus:bg-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all duration-300"
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 animate-shake">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-400 text-sm">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 animate-fadeIn">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-green-400 text-sm">{successMessage}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleButtonClick}
                disabled={isLoading}
                className="relative w-full py-3.5 mt-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
                  text-white font-semibold rounded-lg shadow-lg hover:shadow-red-500/50 
                  transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                  active:scale-[0.98] overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      {isSignInForm ? 'Sign In' : 'Create Account'}
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </button>

              {/* Toggle Form */}
              <div className="pt-4 text-center border-t border-white/10">
                <p className="text-gray-400 text-sm">
                  {isSignInForm ? "New to Netflix?" : "Already have an account?"}{' '}
                  <button
                    onClick={toggleSignInForm}
                    className="text-white font-semibold hover:text-red-500 transition-colors underline-offset-4 hover:underline"
                  >
                    {isSignInForm ? 'Sign up now' : 'Sign in'}
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-gray-500 text-xs">
              Protected by reCAPTCHA and subject to the Netflix{' '}
              <span className="text-gray-400 hover:underline cursor-pointer">Privacy Policy</span> and{' '}
              <span className="text-gray-400 hover:underline cursor-pointer">Terms of Service</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-6 border-t border-white/5 bg-black/50 backdrop-blur-sm">
        <p className="text-gray-500 text-xs sm:text-sm">
          © 2025 Netflix Clone • Crafted with{' '}
          <span className="text-red-500 animate-pulse">❤️</span> by{' '}
          <span className="text-transparent bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text font-semibold">
            Jainish
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Login;