import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setToken } from './token';

const initApp = async () => {
  let token;
  try {
    token = await AsyncStorage.getItem('accessToken').catch((err) => {
      console.error('initApp AsyncStorage error:', err);
    });
  } catch (error) {
    return { token: null };
  }

  let decodedToken;
  try {
    decodedToken = await jwtDecode(token);
  } catch (error) {
    return { token: null };
  }

  if (decodedToken.exp > Date.now() / 1000) {
    setToken(token);
  }

  return { token };
};

export default initApp;
