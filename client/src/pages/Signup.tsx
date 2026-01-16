import React, { useState } from "react";
import { FaEnvelope, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle signup logic here
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="card flex flex-col items-center gap-6 w-[350px]"
      >
        <h2 className="text-2xl font-semibold text-foreground">Sign Up</h2>

        {/* Name Field */}
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-border rounded-md p-3 pl-10 focus:outline-none focus:border-accent focus:ring-0"
            required
          />
          <FaUser className="auth-input-icons left-3 top-[50%] translate-y-[-50%]" />
        </div>

        {/* Email Field */}
        <div className="w-full relative">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-border rounded-md p-3 pl-10 focus:outline-none focus:border-accent focus:ring-0"
            required
          />
          <FaEnvelope className="auth-input-icons left-3 top-[50%] translate-y-[-50%]" />
        </div>

        {/* Password Field */}
        <div className="w-full relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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
