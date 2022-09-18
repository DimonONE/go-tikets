import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { PhoneNumberUtil } from 'google-libphonenumber';

const libphonenumber = PhoneNumberUtil.getInstance();

import useQuery from '@Hooks/useQuery';
import SignIn from '@Screens/SignInScreen';
import { auth } from '@Server';

const SignInContainer = () => {
  const navigation = useNavigation();

  const handleGetCode = async (phoneNumber) => {
    const parsedPhoneNumber = libphonenumber.parseAndKeepRawInput(phoneNumber);
    const isValidNumber = libphonenumber.isValidNumber(parsedPhoneNumber);

    if (!isValidNumber) {
      return Toast.show({
        type: 'error',
        text1: 'Number is not valid',
      });
    }

    const { ok, data, message } = await useQuery(auth.getCode(phoneNumber));

    console.log('DATA 123', data);

    if (!ok) {
      Toast.show({
        type: 'error',
        text1: message,
      });
      return;
    }

    navigation.navigate('SignInConfirm', { phoneNumber });
  };

  return <SignIn handleGetCode={handleGetCode} />;
};

export default SignInContainer;
