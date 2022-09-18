import { actions } from '@/actions';
import { setToken } from '@/token';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useQuery = async (query) => {
  try {
    const res = await query;

    return { data: res.data, ok: true, message: null, status: res.status };
  } catch (error) {
    console.log(
      'ERROR',
      error,
      JSON.parse(JSON.stringify(error)),
      error?.response,
      error?.response?.data
    );
    if (error?.response?.status === 401) {
      await AsyncStorage.removeItem('accessToken');
      actions.setAccessToken(null);
      setToken(false);
    }

    return {
      data: null,
      ok: false,
      message: error?.response?.data?.message || 'Something went wrong',
      status: error?.response?.status,
    };
  }
};

export default useQuery;
