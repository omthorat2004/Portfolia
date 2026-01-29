import { useState, useEffect } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { useNavigate } from "react-router-dom";
import { login, clearError } from "../features/authentication/authenticationSlice"; // Import actions

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isProfileComplete = useAppSelector((state) => state.auth.isProfileComplete);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear any previous errors
    dispatch(clearError());
    
    // Dispatch login action
    await dispatch(login({ email, password }));
  };

  // Handle redirects based on authentication and profile completion status
  useEffect(() => {
    if (isAuthenticated) {
      if (isProfileComplete) {
        // If profile is complete, go to dashboard
        navigate('/dashboard');
      } else {
        // If logged in but profile is not complete, go to register
        navigate('/register');
      }
    }
  }, [isAuthenticated, isProfileComplete, navigate]);

  // If already authenticated and profile complete, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated && isProfileComplete) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-background border-border">
      <form
        onSubmit={handleSubmit}
        className="card border-6 flex flex-col items-center bg-card gap-6 w-[400px] p-6 rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-foreground">Login</h2>

        {error && (
          <div className="w-full p-3 bg-destructive/10 text-destructive rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Email Field */}
        <div className="w-full relative">
          <input
            type="email"
            placeholder="Email"
            className="w-full border-4 border-border rounded-md p-3 pr-10 focus:outline-none focus:border-accent focus:ring-0"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <FaEnvelope className="auth-input-icons" />
        </div>

        {/* Password Field */}
        <div className="w-full relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-border rounded-md p-3 pr-10 focus:outline-none focus:border-accent focus:ring-0"
            required
            disabled={loading}
          />
          {showPassword ? (
            <FaEyeSlash
              className="auth-input-icons cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaEye
              className="auth-input-icons cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="button w-full"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Signup link */}
        <p className="text-sm text-muted">
          Don't have an account?{" "}
          <a 
            href="/signup" 
            className="font-semibold text-link hover:text-link-hover"
            onClick={(e) => {
              e.preventDefault();
              navigate('/signup');
            }}
          >
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;