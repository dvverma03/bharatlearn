import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "./signinSlice.js";
import authReducer from "./tokenSlice.js";
import courseReducer from "./courseSlice.js";
import playerReducer from "./playerSlice.js";

const appStore = configureStore({
  reducer: {
    contact: signinReducer,
    auth: authReducer,
    courseId: courseReducer,
    player: playerReducer,
  },
});

export default appStore;
