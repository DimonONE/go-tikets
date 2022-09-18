import React from 'react';
import { View, Dimensions, Pressable } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');
export const CustomCarousel = ({
  data = [],
  card,
  onPress = () => false,
  settings = {
    data: data,
    renderItem: card,
    sliderWidth: 100,
    sliderHeight: 100,
    itemWidth: width - 240,
    hasParallaxImages: true,
    layout: 'default',
  },
  style,
}) => {
  return (
    <Pressable
      style={[
        {
          height: 'auto',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 10,
        },
        style,
      ]}
      onPress={onPress}
    >
      <Carousel {...settings} />
    </Pressable>
  );
};
