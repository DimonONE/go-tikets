import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import AppText from './AppText';

const NoInternetConnection = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <AppText
          weight={500}
          size={24}
          style={{ marginBottom: 12, color: '#5B5B5B' }}
        >
          You are not connected
        </AppText>
        <AppText weight={500} style={{ marginBottom: 40, color: '#5B5B5B' }}>
          Connect to the internet to continue
        </AppText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#D8D8D8',
    padding: 10,
  },
});

export default NoInternetConnection;
