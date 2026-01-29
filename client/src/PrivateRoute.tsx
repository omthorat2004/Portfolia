import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./store/hook";

const PrivateRoute = () => {
  const token = useAppSelector((state) => state.auth.token);
  const isProfileComplete = useAppSelector((state) => state.auth.isProfileComplete);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in but hasn't completed profile, redirect to register
  if (!isProfileComplete) {
    return <Navigate to="/register" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;