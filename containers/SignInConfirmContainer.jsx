import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';

import useQuery from '@Hooks/useQuery';
import SignInConfirmScreen from '@Screens/SignInConfirmScreen';
import { auth } from '@/server';
import { actions } from '@/actions';
import messaging from '@react-native-firebase/messaging';

const SignInConfirmContainer = ({ route }) => {
  const phoneNumber = route.params?.phoneNumber;

  const navigation = useNavigation();

  useEffect(() => {
    if (!phoneNumber) {
      navigation.navigate('SignIn');
    }
  }, [phoneNumber]);

  const handleConfirm = async (code) => {
    const token = await messaging().getToken()

    const { ok, data, message } = await useQuery(
      auth.signIn(phoneNumber, Number(code), token)
    );

    if (!ok) {
      Toast.show({ type: 'error', text1: message });
      return;
    }

    console.log('data', data);

    if (data?.token) {
      await AsyncStorage.setItem('accessToken', data.token).catch((err) =>
        console.log('Sign in confirm AsyncStorage error', err)
      );
      actions.setAccessToken(data.token);
      actions.setAuthorized(true);
      navigation.navigate('TabNavigation');
      return;
    }

    if (!data?.authorized) {
      navigation.navigate('SignUpProfile', { phoneNumber });
      return;
    }
  };

  const handleResendCode = async () => {
    const { ok, data, message } = await useQuery(auth.getCode(phoneNumber));

    console.log('DATA', data);

    if (!ok) {
      Toast.show({ type: 'error', text1: message });
    }
  };

  return (
    <SignInConfirmScreen
      handleConfirm={handleConfirm}
      phoneNumber={phoneNumber}
      handleResendCode={handleResendCode}
    />
  );
};

export default SignInConfirmContainer;
