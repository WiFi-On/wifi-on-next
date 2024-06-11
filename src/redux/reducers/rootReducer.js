// rootReducer.js
import { combineReducers } from "redux";
import modalReducer from "./modalSlice";
import providerReducer from "./providerSlice";

const rootReducer = combineReducers({
  modal: modalReducer,
  filter: providerReducer,
  // Другие срезы (slices), если есть
});

export default rootReducer;
