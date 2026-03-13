import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { type RootState } from '../../store/store';

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_API;

export interface Project {
  _id: string;
  name: string;
  intro: string;
  description?: string;
  githubLink: string;
  liveLink?: string;
  teckStack: string[];
  image: string;
  problemStatement: string;
  demo?: string;
  presentationPdf?: string;
  uniqueness?: string;
  portfolioOn: boolean;
  tags?: string[];
  userId: string;
}

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

export const fetchUserProjects = createAsyncThunk(
  'projects/fetchUserProjects',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as any).auth.token;
      if (!token) throw new Error('No token');

      const res = await fetch(`${BACKEND_URL}/projects/my-projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw data.message || 'Failed to fetch projects';
      return data.projects as Project[];
    } catch (err: any) {
      return rejectWithValue(err.message || err);
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as any).auth.token;
      if (!token) throw new Error('No token');

      const res = await fetch(`${BACKEND_URL}/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw data.message || 'Failed to fetch project';
      return data.project as Project;
    } catch (err: any) {
      return rejectWithValue(err.message || err);
    }
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, updateData }: { id: string; updateData: Partial<Project> }, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as any).auth.token;
      if (!token) throw new Error('No token');

      const res = await fetch(`${BACKEND_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });
      const data = await res.json();
      if (!res.ok) throw data.message || 'Failed to update project';
      return data.project as Project;
    } catch (err: any) {
      return rejectWithValue(err.message || err);
    }
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchUserProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || 'Unable to load projects');
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || 'Unable to load project');
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
        // Update in projects list if present
        const index = state.projects.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        toast.success('Project updated successfully');
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || 'Unable to update project');
      });
  },
});

export default projectSlice.reducer;

export const selectProjects = (state: RootState) => state.projects.projects;
export const selectProjectsLoading = (state: RootState) => state.projects.loading;
export const selectProjectsError = (state: RootState) => state.projects.error;
export const selectCurrentProject = (state: RootState) => state.projects.currentProject;
