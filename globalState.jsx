import { proxy, useSnapshot as valtioUseSnapshot } from 'valtio';

export const store = proxy({
  userCurrentLocation: null,
  authorized: null,
  accessToken: null,
  filters: null,
});

export const useSnapshot = valtioUseSnapshot;
