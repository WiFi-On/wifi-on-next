export const ADD_PROVIDER = "ADD_PROVIDER";
export const REMOVE_PROVIDER = "REMOVE_PROVIDER";
export const ADD_PROVIDERS = "ADD_PROVIDERS";

export const addProvider = (provider) => ({
  type: ADD_PROVIDER,
  payload: provider,
});

export const removeProvider = (provider) => ({
  type: REMOVE_PROVIDER,
  payload: provider,
});

export const addProviders = (providers) => ({
  type: ADD_PROVIDERS,
  payload: providers,
});
