import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import AppText from '../AppText';
import { HeaderNavigate } from '../Profile/HeaderNavigate';
import arrowBackIcon from '@Assets/arrowBackIcon.svg';
import { useNavigation } from '@react-navigation/native';
import { AppIconInput } from '../AppIconInput';
import { store, useSnapshot } from '@/globalState';
import * as Location from 'expo-location';

import { Wrapper } from '@Components/Wrapper';

import searchIcon from '@Assets/searchIcon.svg';
import { Divider } from '@react-native-material/core';
import {Button} from "@Components/UI";

const renderItem = ({ item }) => {
  return (
    <View style={{ marginBottom: 20, paddingHorizontal: 26 }}>
      <View>
        <AppText weight={500} style={{ fontSize: 24 }}>
          {item.city}
        </AppText>
      </View>
      <View>
        <AppText style={{ color: '#828282' }}>
          {item.city}, {item.country}
        </AppText>
      </View>
    </View>
  );
};
export const CitySelect = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const [popularLocations, setPopularLocations] = useState([
    {
      id: 1,
      city: 'Kharkiv',
      country: 'Kiev',
    },
    {
      id: 2,
      city: 'Tashkent',
      country: 'Uzbekistan',
    },
    {
      id: 3,
      city: 'London',
      country: 'United Kingdom',
    },
    {
      id: 4,
      city: 'Washington',
      country: 'United States',
    },
    {
      id: 5,
      city: 'New York',
      country: 'United States',
    },
    {
      id: 6,
      city: 'New York',
      country: 'United States',
    },
    {
      id: 7,
      city: 'New York',
      country: 'United States',
    },
    {
      id: 8,
      city: 'New York',
      country: 'United States',
    },
  ]);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permission to access location was denied',
        });
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      console.log('getLocation', location);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return (
    <>
      <HeaderNavigate style={styles.headerNavigate}>
        <Pressable onPress={() => navigation.navigate('TabNavigation')}>
          <SvgXml xml={arrowBackIcon} />
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('CitySelect')}
          style={[
            styles.centeredItem,
            {
              marginLeft: 'auto',
              marginRight: 'auto',
            },
          ]}
        >
          <AppText>City</AppText>
        </Pressable>
      </HeaderNavigate>
      <Wrapper style={{ marginTop: 90 }}>
        <AppIconInput
          icon={searchIcon}
          onChangeText={setSearchText}
          value={searchText}
          placeholder='Find events in...'
          style={{ marginBottom: 20 }}
        />

        <Button variant='text' onPress={getLocation} styleText={{ fontWeight: '400' }}>Use current location</Button>

        <Divider style={{marginBottom: 28 }} />

        <AppText weight={500} style={{ marginBottom: 20 }}>
          Popular locations
        </AppText>
      </Wrapper>
      <FlatList
        data={popularLocations}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id}
      />
    </>
  );
};

const styles = StyleSheet.create({
  centeredItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerNavigate: {
    width: '100%',
    height: 70,
    alignItems: 'flex-end',
    paddingHorizontal: 25,
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'white',
    marginBottom: 22,
  },

  checkBoxWrapper: {
    width: '23.3%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    marginRight: 30,
  },
  checkBoxContainer: {
    width: '23.3%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    marginRight: 30,
  },
  placeText: {
    color: '#BDBDBD',
    fontSize: 14,
  },

  textInfo: {
    marginTop: 3,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 17,
    color: '#5B5B5B',
  },
});
