import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      return data.token;
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
      return data.token;
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

export const registerProfile = createAsyncThunk(
  "auth/register",
  async (body: any, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as any).auth.token;

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
  },
  extraReducers: (builder) => {
    builder

      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("portfolia-token", action.payload);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("portfolia-token", action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Verify User
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isProfileComplete = action.payload.isProfileComplete;
      })

      // Register Profile
      .addCase(registerProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isProfileComplete = true;
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
