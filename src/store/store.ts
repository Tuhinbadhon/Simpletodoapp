import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "../services/todoApi";
export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable warnings for non-serializable actions
    }).concat(todoApi.middleware),
});
//dskljfklajdlk