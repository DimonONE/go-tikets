import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlackButton } from './AppButtons/Black';
import AppText from './AppText';

export const NotAuthorized = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AppText
          weight={500}
          size={24}
          style={{ marginBottom: 12, color: '#5B5B5B' }}
        >
          You are not authorized
        </AppText>
        <AppText weight={500} style={{ marginBottom: 40, color: '#5B5B5B' }}>
          Authorize to get access to this page
        </AppText>
        <BlackButton onPress={() => navigation.navigate('SignIn')}>
          Authorize
        </BlackButton>
      </View>
    </SafeAreaView>
  );
};
