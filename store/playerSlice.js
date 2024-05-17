import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: { currentChapter: null, courseId: null, title: "" },
  reducers: {
    setCurrentChapter: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCurrentChapter } = playerSlice.actions;
export default playerSlice.reducer;
