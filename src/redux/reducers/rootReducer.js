// src/reducers/rootReducer.js

import { combineReducers } from "redux";
import providerReducer from "./providerReducer";
// импортируйте другие редукторы, если есть

const rootReducer = combineReducers({
  filter: providerReducer,
});

export default rootReducer;
