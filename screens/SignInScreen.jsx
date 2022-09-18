import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-native-phone-input';
import { StyleSheet, Text, View } from 'react-native';

import AuthWrapper from '@Components/AuthWrapper';
import stylization from "@Helpers/stylization";

const SignIn = ({ handleGetCode }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const getCode = async () => {
    await handleGetCode(phoneNumber);
  };

  useEffect(() => {
    return () => {
      setPhoneNumber('');
    };
  }, []);

  return (
    <AuthWrapper
      title='Sign In'
      text='Enter your phone number to verify your account'
      onContinueClick={getCode}
    >
      <View style={[styles.formControl, styles.inputColor]}>
        <PhoneInput
          style={[styles.input]}
          onChangePhoneNumber={setPhoneNumber}
        />
      </View>
      <Text style={styles.agreementText}>
        By signing in you agree to the Selector
      </Text>
      <Text style={styles.agreementText}>Terms of Use & Privacy Policy</Text>
    </AuthWrapper>
  );
};

const styles = stylization(() => ({
  phoneInput: {
    marginBottom: 27,
    marginHorizontal: 'auto',
  },
  agreementText: { textAlign: 'center' },
  formControl: {
    width: '100%',
    marginVertical: 10,
  },
  basic: {
    fontSize: 13,
    marginTop: -7,
    zIndex: 10,
  },
  label: {
    marginVertical: 8,
    color: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    marginTop: 13,
    bottom: 20,
    left: 10,
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  lineLabel: {
    marginVertical: 8,
    fontSize: 15,
    color: 'rgb(60,60,70)',
  },
  endLabel: {
    zIndex: 10,
  },
  inputColor: {
    color: 'rgba(0, 0, 0, 0.3)',
  },
  focusedInputColor: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    paddingHorizontal: 20,
    height: 64,
    borderWidth: 1,
    borderRadius: 15,
  },
}));

export default SignIn;
