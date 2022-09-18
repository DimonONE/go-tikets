import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const GrayRounded = ({ variant = 'contained', onClick, children, style }) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        styles[`${variant}ButtonContainer`],
        style,
      ]}
      onPress={onClick}
    >
      <Text style={[styles.buttonText, styles[`${variant}ButtonText`]]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 6,
    paddingHorizontal: 22,
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
  },
  containedButtonContainer: {
    backgroundColor: '#5B5B5B',
  },
  containedButtonText: {
    color: '#fff',
  },
  outlinedButtonContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#5B5B5B',
  },
  outlinedButtonText: {
    color: '#5B5B5B',
  },
});

export default GrayRounded;
