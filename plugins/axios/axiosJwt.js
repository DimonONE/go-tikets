import { store } from '@/globalState';
import axios from 'axios';

const setTokenOnSubmit = (req) => {
  try {
    const token = store.accessToken;

    console.log('setTokenOnSubmit', token);
    req.headers['Authorization'] = `Bearer ${token}`;
    return req;
  } catch (error) {
    console.log('ERROR setTokenOnSubmit', error);
    return req;
  }
};

const axiosInstance = axios.create({
  baseURL: 'https://go-ticket-back.herokuapp.com',
});

axiosInstance.interceptors.request.use(setTokenOnSubmit);

export default axiosInstance;
