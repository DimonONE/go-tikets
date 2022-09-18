import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const BlackButton = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.continueButton, style]} onPress={onPress}>
      <Text style={[styles.buttonText, styles.continueText]}> {children} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  continueText: { color: '#FFFFFF' },
  buttonText: { textTransform: 'uppercase' },
  continueButton: {
    backgroundColor: '#000000',
    marginBottom: 11,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
});
