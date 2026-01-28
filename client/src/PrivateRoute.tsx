import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from './store/hook';

const PrivateRoute = () => {
    const navigate = useNavigate()
    const token = useAppSelector((state)=>state.auth.token)

    

    if(!token){
        navigate('/login')
    }
  return (
    <div>
        <Outlet/>
    </div>
  );
}

export default PrivateRoute;
