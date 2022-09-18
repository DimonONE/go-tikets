import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import closeIcon from '@Assets/closeIcon.svg';
import AppText from '@Components/AppText';
import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import { QRInfo, StatusColor, StatusName } from '@Screens/QRScaner/QRInfo';
// import { BarCodeScanner } from 'expo-barcode-scanner';
import { NextButton } from '@Components/NextButton';
import useQuery from '@Hooks/useQuery';
import { guest as guestRequest } from '@/server';
import Toast from 'react-native-toast-message';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QRScaner = () => {
  const navigation = useNavigation();
  const [hasPermission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const askForCameraPermission = () => {
    (async () => {
      // const { status } = await BarCodeScanner.requestPermissionsAsync();
      // setPermission(status === 'granted');
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeCamera = ({ type, data }) => {
    (async function () {
      const {
        data: guest,
        ok,
        message,
        status,
      } = await useQuery(guestRequest.getById(data));

      if (guest.length || !!guest) {
        Toast.show({
          type: 'error',
          text1: message || 'Error!',
        });
        return;
      }

      navigation.navigate('QRInfo', {
        id: guest.ticket.id,
        isTicketUsed: guest.isTicketUsed,
        address: guest.ticket.event.address,
        endDate: guest.ticket.event.endDate,
        paymentStatus: guest.paymentStatus,
        phone: guest.user.phone,
        creatorName: `${guest.user.name} ${guest.user.surname}`,
        name: guest.ticket.event.name,
        type: guest.ticket.type,
        price: guest.ticket.price,
        priceBonus: guest.ticket.serviceCharge,
      });
    })();
    setScanned(true);
  };

  // if (hasPermission === null) {
  //   return (
  //     <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
  //       <AppText>Requesting for camera permission!</AppText>
  //     </View>
  //   );
  // }

  // if (hasPermission === false) {
  //   return (
  //     <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
  //       <AppText>No access to camera</AppText>
  //       <NextButton onPress={askForCameraPermission}>Allow Camera</NextButton>
  //     </View>
  //   );
  // }

  return (
    <View>
      <HeaderNavigate style={styles.headerNavigate} onBack={() => false}>
        <AppText />
        <AppText style={{ color: '#000000', fontWeight: '800', fontSize: 14 }}>
          QR-scaner
        </AppText>
        <Pressable
          style={{ height: 20 }}
          onPress={() => navigation.navigate('QRInfo')}
        >
          <SvgXml xml={closeIcon} />
        </Pressable>
      </HeaderNavigate>

      <View
        style={{
          justifyContent: 'center',
        }}
      >
        <RNCamera style={styles.rnCamera} onBarCodeRead={true} />

        <NextButton
          style={{ marginTop: 100 }}
          onPress={() => handleBarCodeCamera({ type: '', data: 'tesx' })}
        >
          Test
        </NextButton>

        {scanned && (
          <NextButton
            style={{ marginTop: 100 }}
            onPress={() => setScanned(false)}
          >
            Scan again
          </NextButton>
        )}

        {/*{!scanned && (*/}
        {/*  <BarCodeScanner*/}
        {/*    onBarCodeScanned={scanned ? undefined : handleBarCodeCamera}*/}
        {/*    style={{*/}
        {/*      height: '90%',*/}
        {/*      width: '100%',*/}
        {/*    }}*/}
        {/*  />*/}
        {/*)}*/}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerNavigate: {
    marginTop: 60,
    paddingHorizontal: '5%',
    height: 22,
    backgroundColor: '#fff',
  },

  rnCamera: {
    flex: 1,
    width: '94%',
    alignSelf: 'center',
  },
  topBar: {
    height: 50,
    backgroundColor: '#62d1bc', // green
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitleText: {
    color: '#ffffff', // white
    fontSize: 20,
  },
  caption: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionTitleText: {
    color: '#121B0D', // black
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QRScaner;
