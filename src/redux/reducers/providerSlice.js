import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  providers: [],
};

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    addProvider: (state, action) => {
      state.providers.push(action.payload);
    },
    removeProvider: (state, action) => {
      state.providers = state.providers.filter(
        (provider) => provider !== action.payload
      );
    },
    addProviders: (state, action) => {
      state.providers = action.payload;
    },
  },
});

export const { addProvider, removeProvider, addProviders } =
  providerSlice.actions;

export default providerSlice.reducer;
