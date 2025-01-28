import baseAPI from "@/services/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(baseAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export default store;
