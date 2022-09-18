import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {Button} from "@Components/UI";

const AuthSkipButton = () => {
  const navigation = useNavigation();

  return (
    <Button
      color='white'
      onPress={() => navigation.navigate('TabNavigation')}
    >
        Skip
    </Button>
  );
};

export default AuthSkipButton;
