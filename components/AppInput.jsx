import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';

const AppInput = ({
  label,
  value,
  icon,
  onChangeText,
  styleInput,
  styleLabel,
  styleWrap,
  inputProps = {},
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={[
        styles.formControl,
        focused ? styles.focusedInputColor : styles.inputColor,
        styleWrap,
      ]}
    >
      {label && (
        <Text
          style={[
            styles.label,
            styles.endLabel,
            styles.basic,
            focused ? styles.focusedInputColor : styles.inputColor,
            styleLabel,
          ]}
        >
          {label}
        </Text>
      )}
      <TextInput
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        textAlignVertical='center'
        onChangeText={onChangeText}
        value={value}
        style={[styles.input, styles.focusedInputColor, styleInput]}
        {...inputProps}
      />
      {icon && (
        <View style={[styles.icon, { transform: [{ translateY: 15 }] }]}>
          <SvgXml xml={icon} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
    marginVertical: 5,
    position: 'relative',
  },

  icon: {
    position: 'absolute',
    minWidth: 30,
    height: 30,
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  basic: {
    fontSize: 13,
    marginTop: -7,
    zIndex: 10,
  },
  label: {
    marginVertical: 8,
    color: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    marginTop: 13,
    bottom: 20,
    left: 10,
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  lineLabel: {
    marginVertical: 8,
    fontSize: 15,
    color: 'rgb(60,60,70)',
  },
  endLabel: {
    zIndex: 10,
  },
  inputColor: {
    color: 'rgba(0, 0, 0, 0.3)',
  },
  focusedInputColor: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    paddingHorizontal: 20,
    height: 36,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default AppInput;
