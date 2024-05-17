import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const initializeToken = createAsyncThunk(
  "auth/initializeToken",
  async (_, { dispatch }) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isAuthenticated: false,
    loading: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      AsyncStorage.setItem("token", action.payload);
    },
    clearToken: (state) => {
      state.token = "";
      state.isAuthenticated = false;
      AsyncStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(initializeToken.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(initializeToken.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
