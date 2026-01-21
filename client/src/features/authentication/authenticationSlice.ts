import { createSlice } from "@reduxjs/toolkit";


type initialState = {
    loading:boolean;
    isAuthenticated:boolean;
    isProfileComplete:boolean;
    token:string;
    error:string;
    user:string;
}

const authSlice = createSlice({
    
})