import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_API;

interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  isProfileComplete: boolean;
  token: string | null;
  user: any;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  isProfileComplete: false,
  token: localStorage.getItem("portfolia-token"),
  user: null,
  error: null,
};

/* ===================== THUNKS ===================== */

export const signup = createAsyncThunk(
  "auth/signup",
  async (body: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw data.message;
      
      // After signup, we just show success message and DON'T store token
      // User needs to login after signup
      toast.success('Signup successful! Please login.');
      return null; // Return null instead of token
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (body: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw data.message;
      return { token: data.token, user: data.user };
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as any).auth.token;
      if (!token) throw new Error("No token found");

      const res = await fetch(`${BACKEND_URL}/auth/verifyuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw data.message;
      return data.user;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

export const getUserEmail = createAsyncThunk(
  "auth/getUserEmail",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as any).auth.token;
      if (!token) throw new Error("No token found");

      const res = await fetch(`${BACKEND_URL}/auth/return-email`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw data.message;
      return data.email;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

export const registerProfile = createAsyncThunk(
  "auth/register",
  async (body: any, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as any).auth.token;
      if (!token) throw new Error("No token found");

      const res = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw data.message;
      return data.user;
    } catch (err: any) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);

/* ===================== SLICE ===================== */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("portfolia-token");
      state.token = null;
      state.isAuthenticated = false;
      state.isProfileComplete = false;
      state.user = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        // Don't set token or isAuthenticated - user needs to login
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.isProfileComplete = action.payload.user?.isProfileComplete || false;
        localStorage.setItem("portfolia-token", action.payload.token);
        toast.success('Login successful!');
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      // Verify User
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isProfileComplete = action.payload.isProfileComplete;
      })
      .addCase(verifyUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        localStorage.removeItem("portfolia-token");
      })

      // Get User Email
      .addCase(getUserEmail.fulfilled, (state, action) => {
        // We don't need to update state here, just return the email
      })

      // Register Profile
      .addCase(registerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isProfileComplete = true;
        toast.success('Profile completed successfully!');
      })
      .addCase(registerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { logOut, clearError } = authSlice.actions;
export default authSlice.reducer;