import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import likeFilledIcon from '@Assets/svg/likeActive.svg';
import likeIcon from '@Assets/svg/likeDisabled.svg';
import { SvgXml } from 'react-native-svg';

export const Like = ({ isActive, onPress, style }) => {
  const [active, setActive] = useState(false);

  const onClick = () => {
    setActive((prev) => !prev);
    if (onPress) onPress();
  };

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  return (
    <Pressable
      onPress={onClick}
      style={[
        {
          position: 'absolute',
          zIndex: 3,
          paddingTop: 22,
          right: 16,
        },
        style,
      ]}
    >
      <SvgXml xml={active ? likeFilledIcon : likeIcon} />
    </Pressable>
  );
};
