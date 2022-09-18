import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import noTickets from '@Assets/tikets/tiket.png';
import AppText from '@Components/AppText';

export const EmptyTickets = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={noTickets} />
      </View>
      <View>
        <AppText
          style={[styles.text, { marginBottom: 16, marginTop: 46 }]}
          size={20}
          weight={600}
        >
          Here will be your tickets
        </AppText>
        <AppText style={styles.text}>
          Go to the events and find something
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 'auto',
    justifyContent: 'center',
    height: '85%',
  },
  text: {
    textAlign: 'center',
  },
});
