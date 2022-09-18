import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import { Wrapper } from '@Components/Wrapper';
import AppText from '@Components/AppText';
import {
  StatusColor,
  StatusName,
  TicketButton,
} from '@Screens/Tikets/TicketCard';
import share from '@Assets/svg/share.svg';
import reload from '@Assets/svg/reload.svg';
import locationIcon from '@Assets/svg/location.svg';
import clockIcon from '@Assets/svg/clock.svg';
import QRCode from 'react-native-qrcode-svg';
import { SvgXml } from 'react-native-svg';

export const DownloadChek = (props) => {
  const navigation = useNavigation();
  const {
    id,
    location,
    dateTime,
    status,
    price,
    bonus,
    ticket,
    paymentStatus,
    phone,
    nameCreator,
    nameEvent,
  } = props.route.params;

  return (
    <Wrapper style={{ marginTop: 0, paddingTop: 40, paddingVertical: 28 }}>
      <HeaderNavigate
        style={{
          justifyContent: 'space-between',
          backgroundColor: 'inherit',
          height: 20,
          marginBottom: 32,
        }}
        arrowBack
        onBack={() => navigation.navigate('Tickets')}
      >
        <AppText
          style={{
            color: '#000000',
            fontSize: 16,
            fontWeight: '700',
          }}
        >
          Tickets
        </AppText>
        <AppText
          style={{
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          }}
        >
          {ticket}
        </AppText>
      </HeaderNavigate>
      <View style={styles.container}>
        <View style={[styles.spaceBetween, styles.ticketTextBottom]}>
          <View style={{ flexDirection: 'row' }}>
            <SvgXml xml={locationIcon} />
            <AppText style={{ marginLeft: 10 }} size={12}>
              {location}
            </AppText>
          </View>

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
        <View style={styles.spaceBetween}>
          <View style={{ flexDirection: 'row' }}>
            <SvgXml xml={clockIcon} />
            <AppText style={{ marginLeft: 10 }} size={12} weight={600}>
              {dateTime}
            </AppText>
          </View>

          <AppText size={12}>{status}</AppText>
        </View>
        <View
          style={[
            styles.spaceBetween,
            styles.ticketTextBottom,
            { marginBottom: 38, marginTop: 5 },
          ]}
        >
          <AppText size={14} weight={700}>
            {nameEvent}
          </AppText>
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
                  {nameCreator}
                </AppText>
                <AppText size={12} weight={500}>
                  {phone}
                </AppText>
              </View>
            ) : (
              <AppText weight={500}>{ticket}</AppText>
            )}
          </View>
          <View style={styles.flexEnd}>
            <View style={[styles.flexCenter, styles.alignCenter]}>
              <AppText weight={700}>$ {price}</AppText>
            </View>
            <View style={[styles.flexCenter, styles.alignCenter]}>
              <AppText weight={200}> + ${bonus} Free</AppText>
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginVertical: 30 }}>
          <QRCode value={id.toString()} size={230} />
        </View>

        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 2,
            borderColor: '#DCDCDC',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <TicketButton
              title='Share'
              svg={share}
              style={{ marginRight: 20 }}
            />
            <TicketButton title='Reload' svg={reload} color='#DC0042' />
          </View>
        </View>
      </View>

      <Pressable
        style={{ marginRight: 'auto', marginLeft: 'auto', marginBottom: 22 }}
      >
        <AppText size={14} weight={600} style={{ textTransform: 'uppercase' }}>
          Download the check
        </AppText>
      </Pressable>
      <AppText
        style={{ color: '#999999', marginRight: 'auto', marginLeft: 'auto' }}
      >
        After the event the tickets are kept for one more day
      </AppText>
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  content: {
    marginTop: 3,
    height: '86%',
  },
  container: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 22,
    paddingTop: 20,
    marginBottom: 30,
    borderRadius: 15,
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
