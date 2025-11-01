const validate = (name, email, password, isSignInForm = true) => {
  // Only validate the name if it's a Sign Up form
  if (!isSignInForm) {
    if (!name || name.trim().length < 3) {
      return "Full name must be at least 3 characters long.";
    }
  }

  // Email pattern check
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  if (!isEmailValid) {
    return "Please enter a valid email address.";
  }

  // Password pattern check
  const isPasswordValid = password.length >= 6;

  if (!isPasswordValid) {
    return "Password must be at least 6 characters long.";
  }

  // ✅ Everything is valid
  return null;
};

export default validate;
