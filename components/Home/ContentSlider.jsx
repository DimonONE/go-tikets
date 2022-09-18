import React, { Component } from 'react';
import { View, Image, Dimensions, Pressable, Linking } from 'react-native';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');
import crash from '@Assets/crash.svg';
import { SvgXml } from 'react-native-svg';

const styles = {
  container: {
    height: '100%',
    width: '100%',
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  image: {
    width,
    flex: 1,
  },
};

export const ContentSlider = ({ images = [crash] }) => {
  const renderImages = images?.length
    ? images
    : [
        {
          id: 1,
          img: images[0],
        },
      ];

  return (
    <View style={styles.container}>
      <Swiper
        height={'100%'}
        autoplay
        activeDot={
          <View
            style={{
              backgroundColor: '#4F4F4F',
              width: 5,
              height: 5,
              borderRadius: 50,
              marginLeft: 5,
            }}
          />
        }
        dot={
          <View
            style={{
              backgroundColor: '#C4C4C4',
              width: 5,
              height: 5,
              borderRadius: 50,
              marginLeft: 5,
            }}
          />
        }
      >
        {renderImages.map((image, index) => (
          <Pressable
            key={index}
            style={styles.slide1}
            onPress={() => {
              if (!image?.link) {
                return;
              }
              Linking.openURL(image.link || 'https://www.google.com/');
            }}
          >
            {!!image.img ? (
              <SvgXml style={{ height: '100%', width: '100%' }} xml={crash} />
            ) : (
              <Image
                source={{ uri: image.img }}
                style={{ height: '100%', width: '100%' }}
              />
            )}
          </Pressable>
        ))}
      </Swiper>
    </View>
  );
};
