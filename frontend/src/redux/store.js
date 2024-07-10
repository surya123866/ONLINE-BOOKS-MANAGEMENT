import { configureStore } from "@reduxjs/toolkit";
import { authReducer, bookReducer } from "./slices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
  },
});

export default store;
