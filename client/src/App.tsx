// src/App.tsx
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { logOut, verifyUser } from "./features/authentication/authenticationSlice";
import CreateProject from "./features/projects/components/CreateProject";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectPortfolio from "./pages/ProjectPortfolio";
import Projects from "./pages/Projects";
import Register from "./pages/Register";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";
import { useAppDispatch, useAppSelector } from "./store/hook";


function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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


  }, [isAuthenticated, isProfileComplete]);

  // Don't show navbar on public portfolio pages
  const publicPortfolioRoutes = ['/portfolio', '/portfolio/project'];
  const shouldShowNavbar = !publicPortfolioRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>

      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/portfolio/:userId" element={<Portfolio />} />
        <Route path="/portfolio/project/:projectId" element={<ProjectPortfolio />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-profile" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Route>
      </Routes>
      <Footer />

    </>
  );
}

export default App;