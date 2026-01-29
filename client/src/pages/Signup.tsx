import React, { useEffect, useState } from "react";
import { FaEnvelope, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { useNavigate } from "react-router-dom";
import { signup, clearError } from "../features/authentication/authenticationSlice"; // Import actions

const defaultData ={
  name:'',
  email:'',
  password:''
}

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData,setFormData] = useState(defaultData)

  const isAuthenticated = useAppSelector((state)=>state.auth.isAuthenticated)
  const loading = useAppSelector((state)=>state.auth.loading)
  const error = useAppSelector((state)=>state.auth.error)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear any previous errors
    dispatch(clearError());
    
    // Dispatch signup action
    await dispatch(signup(formData));
    
    // If signup successful (no error), redirect to login
    if (!error) {
      navigate('/login');
    }
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  // Redirect if already authenticated (logged in)
  useEffect(()=>{
    if(isAuthenticated){
      navigate('/dashboard');
    }
  },[isAuthenticated, navigate])

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="card flex bg-card flex-col items-center gap-6 w-[400px] p-6 rounded-lg border border-border"
      >
        <h2 className="text-2xl font-semibold text-foreground">Sign Up</h2>

        {error && (
          <div className="w-full p-3 bg-destructive/10 text-destructive rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="w-full relative">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            className="w-full border-1 border-border rounded-md p-3 pl-10 focus:outline-none focus:border-accent focus:ring-0"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <FaUser className="auth-input-icons right-3 top-[50%] translate-y-[-50%]" />
        </div>

        <div className="w-full relative">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-border rounded-md p-3 pl-10 focus:outline-none focus:border-accent focus:ring-0"
            required
            disabled={loading}
          />
          <FaEnvelope className="auth-input-icons  top-[50%] translate-y-[-50%]" />
        </div>

        <div className="w-full relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            className="w-full border border-border rounded-md p-3 pr-10 focus:outline-none focus:border-accent focus:ring-0"
            value={formData.password}
            onChange={handleChange}
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

        {/* Signup Button */}
        <button 
          type="submit" 
          className="button w-full"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        {/* Login link */}
        <p className="text-sm text-muted">
          Already have an account?{" "}
          <a 
            href="/login" 
            className="font-semibold text-link hover:text-link-hover"
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;