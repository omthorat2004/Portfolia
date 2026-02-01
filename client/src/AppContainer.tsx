import React, { useEffect, useState } from 'react';
import App from './App';
import LoadingIcons from 'react-loading-icons'
import { useNavigate } from 'react-router-dom';

const AppContainer = () => {
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)

    const navigate = useNavigate()

    const checkServer = async ()=>{
        try{
            const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_API}/server-check`)
            if(!response.ok){
                throw new Error('Server has not started!')
            }
            const data = await response.json()
            console.log(data)
        }catch(err){
            console.error(err)
            setError(true)
            navigate('/')
        }finally{
            setLoading(false)
        }
    }


    useEffect(()=>{
        checkServer()
    },[])
    if(loading || error){
        return <div className='flex justify-center items-center h-screen'>
            {error?<p className='text-destructive font-bold text-2xl'>Server has not started</p>:<LoadingIcons.Bars stroke="#ea580c"  speed={.75}/>}
        </div>
    }
  return (
    <div >
        <App/>
    </div>
  );
}

export default AppContainer;
