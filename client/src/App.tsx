// src/App.tsx
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HowItWorks from "./pages/HowItWorks";
import Footer from "./components/Footer";
import Projects from "./pages/Projects";
import Register from "./pages/Register";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { logOut, verifyUser } from "./features/authentication/authenticationSlice";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";


function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { token, isAuthenticated, isProfileComplete } = useAppSelector(
    (state) => state.auth
  );


  useEffect(() => {
    if (token) {
      dispatch(verifyUser());
    }
  }, [token]);


  useEffect(() => {
    if (!token) {
      dispatch(logOut())
      return;
    }

    // if (isAuthenticated) {
    //   if (isProfileComplete) {
    //     navigate("/dashboard");
    //   } else {
    //     navigate("/register");
    //   }
    // }
  }, [isAuthenticated, isProfileComplete]);

  return (
    <>

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/howitworks" element={<HowItWorks />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile/>}/>
          </Route>
        </Routes>
        <Footer />

    </>
  );
}

export default App;
