import { createSlice } from "@reduxjs/toolkit";

const signinSlice = createSlice({
  name: "signin",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state) => {
      return null;
    },
  },
});

export const { addUser, removeUser } = signinSlice.actions;
export default signinSlice.reducer;
