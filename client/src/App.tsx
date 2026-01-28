// src/App.tsx
import { useState, useEffect } from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HowItWorks from "./pages/HowItWorks";
import Footer from "./components/Footer";
import Projects from "./pages/Projects";
import Register from "./pages/Register";
import { useAppDispatch } from "./store/hook";
import { logOut } from "./features/authentication/authenticationSlice";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useAppDispatch()

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(()=>{
    try{
      
    }catch(err){
      console.error(err)
      dispatch(logOut())
    }
  },[])


  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/howitworks" element={<HowItWorks/>}/>
      <Route path="/projects" element={<Projects/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
