import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const GlobalLoader = () => (
  <View style={styles.container}>
    <ActivityIndicator color='#636366' />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
});

export default GlobalLoader;
