import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AppText from '@Components/AppText';
import { SvgXml } from 'react-native-svg';

export const NextButton = ({
  children = 'Continue',
  onPress,
  style,
  textStyle,
  variant = 'contained',
  startIcon,
  disabled = false,
}) => {
  const theme = useTheme();
  const isTextVariant = variant === 'text';
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles(theme).continueButton,
        isTextVariant && styles(theme).continueButtonVariantText,
        disabled && { opacity: 0.5 },
        style,
      ]}
      onPress={onPress}
    >
      {startIcon && <SvgXml style={{ marginRight: 10 }} xml={startIcon} />}
      <AppText
        style={[
          styles(theme).buttonText,
          styles(theme).continueText,
          isTextVariant && styles(theme).continueTextVariantText,
          textStyle,
        ]}
      >
        {children}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = ({ colors }) =>
  StyleSheet.create({
    continueText: { color: '#000' },
    buttonText: { textTransform: 'uppercase', fontWeight: '800' },
    continueButton: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      marginBottom: 11,
      alignItems: 'center',
      paddingVertical: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#E57D00',
      borderBottomWidth: 2,
    },
    continueButtonVariantText: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    continueTextVariantText: {
      color: colors.primary,
    },
  });
