import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import AppText from '../AppText';
import close from '@Assets/close.svg';
import { SvgXml } from 'react-native-svg';
import { ContentSlider } from '@Components/Home/ContentSlider';
import { useTheme } from '@react-navigation/native';

const CardItem = (props) => {
  const {
    name = '',
    date = '',
    location = '',
    price = '',
    images = [],
    values = {
      name: 0,
      value: '',
    },
    deleteButton = false,
    editComponents = false,
    onDelete,
    children,
  } = props;
  const [slides, setSlides] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (images.length) {
      console.log('images', images);
      setSlides(images);
    }
  }, [images]);

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).containerImg}>
        <ContentSlider images={slides} />
      </View>
      <View style={styles(theme).info}>
        <View
          style={{ width: deleteButton || !!editComponents ? '85%' : '100%' }}
        >
          <AppText style={styles(theme).boldText}>{name}</AppText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <View>
              <AppText style={styles(theme).textInfo}>{date}</AppText>
              <AppText style={styles(theme).textInfo}>{location}</AppText>
              {!!values.name && (
                <AppText style={[styles(theme).textInfo, { fontSize: 13 }]}>
                  {values.name}: {values.value}
                </AppText>
              )}
            </View>

            {!!price && (
              <AppText style={styles(theme).boldText}>{price}</AppText>
            )}
          </View>
          {children}
        </View>
        {deleteButton && (
          <Pressable
            style={{ height: 20, marginLeft: 'auto' }}
            onPress={onDelete}
          >
            <SvgXml xml={close} />
          </Pressable>
        )}
        {!!editComponents && editComponents}
      </View>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 16,
      flexDirection: 'row',
      marginVertical: 10,
      justifyContent: 'space-between',
    },
    containerImg: {
      width: 100,
      height: 80,
      marginRight: 13,
    },

    info: {
      width: '55%',
      paddingRight: '5%',
      flexDirection: 'row',
    },

    boldText: {
      color: theme.colors.text,
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 19,
    },

    textInfo: {
      marginTop: 3,
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 17,
      color: theme.colors.text,
    },
  });

export default CardItem;
