import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import feedReducer from "./reducer/feedReducer";
import categoryReducer from "./reducer/categoryReducer";
import localesReducer from "./reducer/localeReducer";

const rootReducer = combineReducers({
  feedReducer: feedReducer,
  categoryReducer: categoryReducer,
  localeReducer: localesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
