import React, { useEffect, useState } from 'react';
import AuthWrapper from '@Components/AuthWrapper';
import { ScrollView, StyleSheet } from 'react-native';
import AppInput from '@Components/AppInput';
import AppPicker from '@Components/AppPicker';

const SignUpProfileScreen = ({ handleSignUp }) => {
  const [data, setData] = useState({
      name: '',
      surname: '',
      email: '',
      birthdate: '',
      IDCode: '',
      instagram: '',
      sex: 'selectSex'
  });

  const handlerDataChange = (filed) => (value) => {
      setData((prev) => ({...prev, [filed]: value}))
  }

  const sexItems = [
    { label: 'Select sex', value: 'unknown' },
    { label: 'Male', value: 'men' },
    { label: 'Female', value: 'women' },
  ];

  const signUp = () => {
    handleSignUp(data);
  };

  return (
    <ScrollView>
      <AuthWrapper
        title='Personal Info'
        text='Please provide the information to finish you profile creation'
        onContinueClick={signUp}
        buttonsAlign={'flex-start'}
      >
        <AppInput label='Name*' onChangeText={handlerDataChange('name')} value={data.name} />
        <AppInput label='Surname*' onChangeText={handlerDataChange('surname')} value={data.surname} />
        <AppInput
          label='Email'
          inputProps={{ keyboardType: 'email-address' }}
          onChangeText={handlerDataChange('email')}
          value={data.email}
        />
        <AppInput
          label='Birthday'
          inputProps={{ keyboardType: 'numeric' }}
          onChangeText={handlerDataChange('birthdate')}
          value={data.birthdate}
        />
        <AppInput
          label='ID code'
          inputProps={{ keyboardType: 'numeric' }}
          onChangeText={handlerDataChange('IDCode')}
          value={data.IDCode}
        />
        <AppInput
          label='Instagram'
          onChangeText={handlerDataChange('instagram')}
          value={data.instagram}
        />
        <AppPicker
          items={sexItems}
          selectedValue={data.sex}
          onValueChange={handlerDataChange('sex')}
          style={styles.appPicker}
        />
      </AuthWrapper>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appPicker: {
    marginBottom: 40,
  },
});

export default SignUpProfileScreen;
