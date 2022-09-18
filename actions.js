import { store } from '@/globalState';

const setAccessToken = (token) => {
  store.accessToken = token;
};

const setAuthorized = (authorized) => {
  store.authorized = authorized;
};

const setFiltersForHome = (filters) => {
  store.filters = filters;
};

const setUserLocation = (location) => {
  store.userCurrentLocation = location;
}

export const actions = {
  setAccessToken,
  setAuthorized,
  setFiltersForHome,
  setUserLocation
};
