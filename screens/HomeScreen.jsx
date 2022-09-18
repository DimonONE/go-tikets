import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

import searchIcon from '@Assets/searchIcon.svg';
import locationIcon from '@Assets/locationIcon.svg';
import filtersSVG from '@Assets/filter.svg';

import AppText from '@Components/AppText';
import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import { HomeContainer } from '@/containers/HomeContainer';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <HeaderNavigate style={styles.headerNavigate}>
        <Pressable style={{ height: 19 }} onPress={() => alert('location')}>
          <SvgXml xml={locationIcon} />
        </Pressable>
        <AppText style={{ color: '#000000', fontWeight: '800', fontSize: 14 }}>
          Events
        </AppText>
        <Pressable
          style={{ height: 18 }}
          onPress={() => navigation.navigate('HomeSearch')}
        >
          <SvgXml xml={searchIcon} />
        </Pressable>
      </HeaderNavigate>
      <HomeContainer />
      <Pressable
        style={styles.buttonFilter}
        onPress={() => navigation.navigate('HomeFilters')}
      >
        <SvgXml xml={filtersSVG} />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerNavigate: {
    width: '100%',
    height: 100,
    alignItems: 'flex-end',
    paddingHorizontal: 25,
    paddingBottom: 25,
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'white',
  },

  buttonFilter: {
    position: 'absolute',
    bottom: 0,
    left: screenWidth / 2 - 90 / 2,
    width: 90,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9100',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
});

export default HomeScreen;
