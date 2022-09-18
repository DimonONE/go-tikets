import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AppText from '../AppText';
import { useTheme } from '@react-navigation/native';

export const Avatar = ({ name, img, styleName, styleWrap, styleImageWrap }) => {
  const theme = useTheme();
  const source = typeof img === 'string' ? {uri: img} : img
  return (
    <View style={[styles(theme).container, styleWrap]}>
      <View style={[styles(theme).imageWrap, styleImageWrap]}>
        <Image style={styles(theme).image} source={source} />
      </View>
      <AppText style={[styles(theme).name, { ...styleName }]}>{name}</AppText>
    </View>
  );
};

export const AvatarSkeleton = () => {
  return (
    <View style={[styles.container]}>
      <View style={styles.imageWrap}>
        <View
          style={{
            borderRadius: 50,
            width: '100%',
            height: '100%',
            backgroundColor: '#BDBDBD',
          }}
        />
      </View>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text
          style={{
            backgroundColor: '#BDBDBD',
            width: 100,
            height: 20,
            marginRight: 8,
          }}
        />
        <Text style={{ backgroundColor: '#BDBDBD', width: 80, height: 20 }} />
      </View>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    imageWrap: {
      width: 84.55,
      height: 84.55,
      marginBottom: 10,
    },
    image: {
      width: 'auto',
      height: '100%',
      overflow: 'hidden',
      borderRadius: 50
    },
    name: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 28,
      textTransform: 'capitalize',
      lineHeight: 33,
      color: theme.colors.text,
    },
  });
