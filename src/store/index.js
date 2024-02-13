import { configureStore } from "@reduxjs/toolkit";
import user from "./AuthSlice";

export default configureStore({
  reducer: {
    user,
  }
})