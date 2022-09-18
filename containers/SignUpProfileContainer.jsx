import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';

import useQuery from '@Hooks/useQuery';
import { auth } from '@Server';
import isValid from '@Helpers/isValid';
import SignUpProfileScreen from '@Screens/SignUpProfileScreen';
import sleep from '@/helpers/sleep';
import { actions } from '@/actions';

const SignUpProfileContainer = ({ route }) => {
  const phoneNumber = route.params?.phoneNumber;

  const navigation = useNavigation();

  useEffect(() => {
    if (!phoneNumber) {
      navigation.navigate('SignIn');
    }
  }, [phoneNumber]);

  const handleSignUp = async (dataPerson) => {
    if (!dataPerson.name || !dataPerson.surname) {
      Toast.show({
        type: 'error',
        text1: 'Name and surname is required',
      });
      return;
    }

    if (dataPerson.email && !isValid.email(dataPerson.email)) {
      Toast.show({
        type: 'error',
        text1: 'Write correct email',
      });
      return;
    }

    const { ok, data, message } = await useQuery(
      auth.signUp({...dataPerson, phone: phoneNumber})
    );

    if (!ok) {
      if (Array.isArray(message)) {
        message.forEach(async (content) => {
          Toast.show({
            type: 'error',
            text1: content,
          });
          await sleep(1500);
        });
        return;
      }
      Toast.show({
        type: 'error',
        text1: message,
      });
      return;
    }

    await AsyncStorage.setItem('accessToken', data.token);
    actions.setAccessToken(data.token);
    actions.setAuthorized(true);

    navigation.navigate('TabNavigation');
  };

  return <SignUpProfileScreen handleSignUp={handleSignUp} />;
};

export default SignUpProfileContainer;
