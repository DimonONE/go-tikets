import React from 'react';
import { useMemo } from 'react';
import { Text } from 'react-native';

const AppText = ({ weight, children, style = {}, size }) => {
  const fontFamily = {
    400: 'Roboto_400Regular',
    500: 'Roboto_500Medium',
    700: 'Roboto_700Bold',
  };

  const componentStyle = useMemo(
    () => ({
      fontFamily: fontFamily[fontFamily[weight] ? weight : 400],
    }),
    [weight]
  );

  const styleArr = useMemo(
    () =>
      size
        ? [componentStyle, style, { fontSize: size }]
        : [componentStyle, style],
    [size, style, weight]
  );

  return <Text style={styleArr}>{children}</Text>;
};

export default AppText;
