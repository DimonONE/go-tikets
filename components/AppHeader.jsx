import React from 'react';
import { View } from 'react-native';

export const AppHeader = ({ children, style }) => {
  return (
    <View
      style={[
        {
          marginVertical: 30,
          paddingHorizontal: '5%',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
