import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import AppText from '@Components/AppText';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import { SvgXml } from 'react-native-svg';
import closeIcon from '@Assets/closeIcon.svg';
import { NextButton } from '@Components/NextButton';
import { Wrapper } from '@Components/Wrapper';
import useQuery from '@Hooks/useQuery';
import Toast from 'react-native-toast-message';
import { guest } from '@/server';

export const StatusColor = {
  pending: '#BB6BD9',
  booked: '#FF9100',
  purchased: '#27AE60',
  declined: '#DC0042',
};
export const StatusName = {
  pending: 'pending',
  booked: '#FF9100booked',
  purchased: 'purchased',
  declined: 'declined',
};

export const QRInfo = (props) => {
  const navigation = useNavigation();
  const [disabled, setDisabled] = useState(false);

  if (!props?.route?.params) {
    navigation.navigate('QRScaner');
    return <></>;
  }

  const { id, address, endDate, paymentStatus, phone, name, type, price } =
    props.route.params;

  const dateTime = `${address} — ${dayjs(endDate).format('MMM D, HH:mm')}`;

  const statusButton = (status) => {
    switch (status.toLowerCase()) {
      case 'purchased': {
        return 'Ticket done';
      }
      case 'booked': {
        return 'Purchased';
      }
      default:
        return 'Next';
    }
  };

  const nextButton = (id) => {
    (async function () {
      const { data, ok, message, status } = await useQuery(
        guest.setStatus({ id, status: 'accepted' })
      );

      if (!ok) {
        Toast.show({
          type: 'error',
          text1: message || message[0] || 'Error!',
        });
        return;
      }
      Toast.show({
        type: 'success',
        text1: 'Success!',
      });
      navigation.navigate('QRScaner');
    })();
  };

  return (
    <Wrapper>
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
      <Pressable
        onPress={() => navigation.navigate('DownloadChek', { id: 111 })}
        style={styles.container}
      >
        <View style={[styles.spaceBetween, styles.ticketTextBottom]}>
          <AppText size={12}>{dateTime}</AppText>
          <AppText
            size={15}
            weight={700}
            style={{
              textTransform: 'uppercase',
              color: StatusColor[paymentStatus],
            }}
          >
            {paymentStatus}
          </AppText>
        </View>
        <View style={[styles.spaceBetween, { marginBottom: 38 }]}>
          <AppText size={15} weight={700}>
            {name}
          </AppText>
          <AppText size={12}>{type}</AppText>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <View>
            {StatusName.booked ? (
              <View>
                <AppText size={12} weight={500} style={{ marginBottom: 3 }}>
                  {name}
                </AppText>
                <AppText size={12} weight={500}>
                  {phone}
                </AppText>
              </View>
            ) : (
              <AppText weight={500}>1/2</AppText>
            )}
          </View>
          <View style={styles.flexEnd}>
            <View style={[styles.flexCenter, styles.alignCenter]}>
              <AppText weight={700}>$ {price || 0}</AppText>
            </View>
            <View style={[styles.flexCenter, styles.alignCenter]}>
              <AppText weight={200}> + ${price} Free</AppText>
            </View>
          </View>
        </View>
      </Pressable>

      <View
        style={{
          marginTop: '90%',
        }}
      >
        {disabled && (
          <AppText
            style={{
              color: '#DC0042',
              fontWeight: '400',
              fontSize: 14,
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            Tcket already used
          </AppText>
        )}

        <NextButton onPress={() => nextButton(id)} disabled={disabled}>
          {statusButton(paymentStatus)}
        </NextButton>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  headerNavigate: {
    height: 22,
    backgroundColor: '#fff',
    marginBottom: 32,
  },

  container: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 22,
    paddingVertical: 20,
    marginBottom: 10,
    borderRadius: 15,
    shadowOffset: 2,
    shadowColor: '#00000011',
  },
  spaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexEnd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  flexCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  ticketTextBottom: {
    marginBottom: 4,
  },
  ticketTextRight: {
    marginRight: 4,
  },
});
