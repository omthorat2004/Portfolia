import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  isProfileComplete: false,
  token: "",
  user: null,
  error: null,
};

export const signup = createAsyncThunk("auth/signup",async(body,{rejectWithValue})=>{
    try{
        
    }catch(err){

    }
})


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logOut:(state,action)=>{
            localStorage.clear()
            state.token = ""
            state.isAuthenticated = false
            state.isProfileComplete = false
            state.user = null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase()
    }
})