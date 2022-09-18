import React, { useState } from 'react';
import { Switch } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const SwitchButton = ({ style }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const { colors } = useTheme();
  return (
    <Switch
      style={[{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }, style]}
      value={isEnabled}
      onValueChange={toggleSwitch}
      trackColor={{ false: '#f4f3f4', true: '#FFDBAA' }}
      thumbColor={isEnabled ? colors.primary : '#fff'}
    />
  );
};
