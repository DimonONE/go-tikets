import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Wrapper = ({ children, style }) => {
  return <View style={[styles.wrapper, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 60,
    paddingHorizontal: '5%',
  },
});
