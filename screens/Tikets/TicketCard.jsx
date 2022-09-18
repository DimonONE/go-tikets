import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import AppText from '@Components/AppText';
import dayjs from 'dayjs';
import { SvgXml } from 'react-native-svg';
import share from '@Assets/svg/share.svg';
import { useNavigation } from '@react-navigation/native';

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

export const TicketButton = ({ toPress, title, svg, color, style }) => (
  <Pressable
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      ...style,
    }}
    onPress={toPress}
  >
    <SvgXml xml={svg} />
    <AppText
      style={{
        color: color || '#FF9100',
        textTransform: 'uppercase',
        marginLeft: 11,
      }}
    >
      {title}
    </AppText>
  </Pressable>
);

export const TicketCard = ({ item }) => {
  const navigation = useNavigation();
  const {
    id,
    address,
    endDate,
    paymentStatus,
    creatorName,
    phone,
    countTickets,
    priceBonus,
    name,
    type,
    price,
  } = item;

  const dateTime = `${address} — ${dayjs(endDate).format('MMM D, HH:mm')}`;

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('DownloadChek', {
          id,
          location: 'location',
          dateTime,
          status: type,
          price,
          bonus: priceBonus,
          ticket: countTickets,
          paymentStatus,
          phone,
          nameCreator: creatorName,
          nameEvent: name,
        })
      }
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
                {creatorName}
              </AppText>
              <AppText size={12} weight={500}>
                {phone}
              </AppText>
            </View>
          ) : (
            <AppText weight={500}>{countTickets}</AppText>
          )}
        </View>
        <View style={styles.flexEnd}>
          <View style={[styles.flexCenter, styles.alignCenter]}>
            <AppText weight={700}>$ {price || 0}</AppText>
          </View>
          <View style={[styles.flexCenter, styles.alignCenter]}>
            <AppText weight={200}> + ${priceBonus || 0} Free</AppText>
          </View>
        </View>
      </View>
      {[StatusName.booked, StatusName.purchased].filter(
        (status) => status === paymentStatus
      ).length >= 0 && (
        <View
          style={{ marginTop: 40, marginLeft: 'auto', marginRight: 'auto' }}
        >
          <TicketButton title='Share' svg={share} toPress={() => false} />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 22,
    paddingVertical: 20,
    marginBottom: 10,
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
