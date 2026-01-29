import React, { useEffect, useState } from "react";
import { FaEnvelope, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { signup } from "../features/authentication/authenticationSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const defaultData ={
  name:'',
  email:'',
  password:''
}

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData,setFormData] = useState(defaultData)

  const isAuthenticated = useAppSelector((state)=>state.auth.isAuthenticated)
  const error = useAppSelector((state)=>state.auth.error)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(formData)
    dispatch(signup(formData))
  };




  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/register')
    }
  },[isAuthenticated])



  return (
    <div className="flex justify-center items-center w-screen h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="card flex bg-card flex-col items-center gap-6 w-[400px]"
      >
        <h2 className="text-2xl font-semibold text-foreground">Sign Up</h2>

        <div className="w-full relative">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            className="w-full border-1 border-border rounded-md p-3 pl-10 focus:outline-none focus:border-accent focus:ring-0"
            value={formData.name}
            onChange={handleChange}
            required

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
        <button type="submit" className="button w-full">
          Sign Up
        </button>

        {/* Login link */}
        <p className="text-sm text-muted">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-link hover:text-link-hover">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
