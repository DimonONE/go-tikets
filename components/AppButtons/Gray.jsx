import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const GrayButton = ({ onClick, children }) => {
  return (
    <TouchableOpacity style={styles.skipButton} onPress={onClick}>
      <Text style={[styles.buttonText, styles.skipText]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: { textTransform: 'uppercase' },
  skipText: { color: '#000000' },
  skipButton: {
    backgroundColor: '#C4C4C4',
    paddingVertical: 20,
    alignItems: 'center',
  },
});
