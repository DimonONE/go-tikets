import React from 'react';
import { Pressable } from 'react-native';
import arrowBack from '../assets/svg/Left.svg';
import { SvgXml } from 'react-native-svg';

export const HeaderBack = ({ onBack, arrowIconXml }) => {
  const onClick = () => {
    if (onBack) return onBack();
  };
  return (
    <Pressable onPress={onClick}>
      <SvgXml xml={arrowIconXml || arrowBack} />
    </Pressable>
  );
};
