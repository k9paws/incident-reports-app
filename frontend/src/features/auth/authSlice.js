import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get client from Local Storage, if exists
const client = JSON.parse(localStorage.getItem("client"));

const initialState = {
  client: client ? client : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register New Client
export const register = createAsyncThunk(
  "auth/register",
  async (client, thunkAPI) => {
    try {
      return await authService.register(client);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login Client
export const login = createAsyncThunk(
  "auth/login",
  async (client, thunkAPI) => {
    console.log(client);
  }
);

// Logout Client
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.client = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.client = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
