import React from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const LogOut = (props) => {
  const theme = useTheme();
  const { onPress, title = 'LOG OUT' } = props;
  return (
    <Pressable
      style={styles(theme).button}
      onPress={() => (onPress ? onPress() : null)}
    >
      <Text style={styles(theme).text}>{title}</Text>
    </Pressable>
  );
};

export const LogOutSkeleton = () => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles(theme).button,
        {
          backgroundColor: '#5B5B5B',
          width: '70%',
          marginTop: 10,
          alignSelf: 'center',
        },
      ]}
    />
  );
};

const styles = ({ colors }) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      borderRadius: 4,
      borderColor: 'none',
    },
    text: {
      letterSpacing: 0.25,
      color: colors.primary,
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 18,
    },
  });
