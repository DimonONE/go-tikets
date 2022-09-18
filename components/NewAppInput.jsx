import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export const AppInput = ({
  multiline,
  numberOfLines,
  label,
  value,
  onChangeText,
  styleInput,
  styleWrap,
  inputProps = {},
  textAlignVertical = 'auto',
}) => {
  return (
    <TextInput
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical={textAlignVertical}
      onChangeText={onChangeText}
      value={value}
      style={[styles.input, styleInput, styleWrap]}
      placeholder={label}
      {...inputProps}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 64,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#DCDCDC',
  },
});
