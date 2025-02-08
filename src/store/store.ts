import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { filterSliceReducer } from "./slices/filters-slice";
import { skillaAPI } from "../api/api";

const rootReducer = combineReducers({
  filterSliceReducer,
  [skillaAPI.reducerPath]: skillaAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        skillaAPI.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore["dispatch"];
