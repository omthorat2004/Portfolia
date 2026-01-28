import { useEffect, useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { verifyUser } from "../features/authentication/authenticationSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail] = useState<string>()
  const [password,setPassword] = useState<string>()
  const {token,isProfileComplete }= useAppSelector((state)=>state.auth)
  
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Email:",email)
    // console.log("Password:",password)

  };


  

  useEffect(()=>{
    if(token){
      dispatch(verifyUser())
    }
  },[token])

  useEffect(()=>{
    if(token){
      if(isProfileComplete){
        navigate('/dashboard')
      }else{
        navigate('/register')
      }
    }
  },[isProfileComplete])
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-background border-border">
      <form
        onSubmit={handleSubmit}
        className="card border-6 flex flex-col items-center bg-card gap-6 w-[400px]"
      >
        <h2 className="text-2xl font-semibold text-foreground">Login</h2>

        {/* Email Field */}
        <div className="w-full relative">
          <input
            type="email"
            placeholder="Email"
            className="w-full border-4 border-border rounded-md p-3 pr-10 focus:outline-none focus:border-accent focus:ring-0"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <FaEnvelope className="auth-input-icons" />
        </div>

        {/* Password Field */}
        <div className="w-full relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border border-border rounded-md p-3 pr-10 focus:outline-none focus:border-accent focus:ring-0"
            required
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
        <button type="submit" className="button w-full">
          Login
        </button>

        {/* Signup link */}
        <p className="text-sm text-muted">
          Don't have an account?{" "}
          <a href="/signup" className="font-semibold text-link hover:text-link-hover">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
