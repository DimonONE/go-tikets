import React, { useState } from 'react';
import { Switch } from 'react-native';

export const SwitchButton = ({ style, active, setActive }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () =>
    setActive
      ? setActive((previousState) => !previousState)
      : setIsEnabled((previousState) => !previousState);

  return (
    <Switch
      style={[{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }, style]}
      value={active ?? isEnabled}
      onValueChange={toggleSwitch}
      trackColor={{ false: '#FFDBAA', true: '#FFDBAA' }}
      thumbColor={isEnabled ? '#FF9100' : '#f4f3f4'}
    />
  );
};
