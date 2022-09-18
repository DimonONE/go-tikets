import React, { useState } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import AppText from '@Components/AppText';
import { useNavigation } from '@react-navigation/native';
import closeICO from '@Assets/close.png';
import GuestContainer from '@Components/Event/GuestContainer';
import GuestBackdrop from '@Components/Event/GuestBackdrop';

const GuestList = ({ route }) => {
  const { eventId } = route.params;
  const [guestSelect, setGuestSelect] = useState(null);
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView>
        <HeaderNavigate style={style.headerNavigate}>
          <Pressable
            style={{ height: 14 }}
            onPress={() => navigation.navigate('Home')}
          >
            <Image style={{ height: '100%' }} source={closeICO} />
          </Pressable>
          <AppText
            style={{
              color: '#000000',
              fontWeight: '800',
              fontSize: 14,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Guest list
          </AppText>
        </HeaderNavigate>
        <GuestContainer eventId={eventId} onSelectGuest={setGuestSelect} />
      </SafeAreaView>
      <GuestBackdrop
        isOpen={guestSelect}
        setIsOpen={setGuestSelect}
        guestId={guestSelect}
      />
    </>
  );
};

const style = StyleSheet.create({
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
});

export default GuestList;
