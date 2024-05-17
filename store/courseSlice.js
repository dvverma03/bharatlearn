import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "courseId",
  initialState: "",
  reducers: {
    addCourseId: (state, action) => {
      return action.payload;
    },
    removeCourseId: (state) => {
      return null;
    },
  },
});

export const { addCourseId, removeCourseId } = courseSlice.actions;
export default courseSlice.reducer;
