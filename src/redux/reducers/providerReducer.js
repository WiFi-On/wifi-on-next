// src/reducers/providerReducer.js

import {
  ADD_PROVIDER,
  REMOVE_PROVIDER,
  ADD_PROVIDERS,
} from "../actions/providerAction";

const initialState = {
  providers: [],
};

const providerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROVIDER:
      return {
        ...state,
        providers: [...state.providers, action.payload],
      };
    case REMOVE_PROVIDER:
      return {
        ...state,
        providers: state.providers.filter(
          (provider) => provider !== action.payload
        ),
      };
    case ADD_PROVIDERS:
      return {
        ...state,
        providers: action.payload,
      };
    default:
      return state;
  }
};

export default providerReducer;
