import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { NextButton } from '@Components/NextButton';
import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import AppText from '@Components/AppText';
import { Wrapper } from '@/components/Wrapper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { event } from '@/server';
import GlobalLoader from '../GlobalLoader';
import Toast from 'react-native-toast-message';
import dayjs from 'dayjs';
import RadioButton from "react-native-radio-buttons-group/lib/RadioButton";

export const BuyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectTicket, setSelectTicket] = useState(null);
  const navigation = useNavigation();
  const { params } = useRoute();

  useEffect(() => {
    (async () => {
      const { data, message } = await event.getTickets(params.event.id);

      if (!data) {
        Toast.show({
          type: 'error',
          text1: message,
        });
        return;
      }

      setTickets(data);
      setSelectTicket(data[0]);
    })();
  }, [params.event]);


  const locationAndTime = params && `${params.event.address.split(', ')[0]}... - ${dayjs(params.event.startDate).format('MMM D, HH:mm')}`;
  const salesEnd = params && dayjs(params.event.endDate).format(`MMM D,YYYY HH:mm`)

  const onSelectTicket = (ticket) => {
    setSelectTicket(ticket);
  }

  if (!tickets.length) {
    return <GlobalLoader />;
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <HeaderNavigate style={styles.headerNavigate} arrowBack >
          <AppText
            style={{
              color: '#000000',
              fontWeight: '800',
              fontSize: 14,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Select tickets
          </AppText>
          <AppText>
            1/3
          </AppText>
        </HeaderNavigate>
        <Wrapper style={styles.wrapper}>
          <View style={styles.textContainer}>
            <View>
              <AppText weight={500}>
                {locationAndTime}
              </AppText>
              <AppText size={16} weight={700} style={{ marginVertical: 5 }}>{params.event.name}</AppText>
              <AppText>Sales end {salesEnd}</AppText>
            </View>
          </View>
          <View style={styles.ticketList}>
            {tickets.map((ticket) => (
              <View style={styles.ticket}>
                <View>
                  <AppText style={styles.bold}>{ticket.name}</AppText>
                  <AppText style={styles.textLight}>Tikcets: {ticket.currentCount}/{ticket.totalCount}</AppText>
                  <View style={styles.inlineText}>
                    <AppText style={styles.bold}>$ {ticket.price}</AppText>
                    <AppText style={styles.default}>
                      {' '}
                      + ${ticket.serviceCharge} Fee
                    </AppText>
                  </View>
                </View>
                <View>
                  <RadioButton color={'#FF9100'} id={ticket.id} selected={ticket.id === selectTicket?.id} onClick={() => onSelectTicket(ticket)} />
                </View>
              </View>
            ))}
          </View>
        </Wrapper>
        <NextButton
          style={styles.button}
          onPress={() =>
            navigation.navigate(Object.keys(params.event?.requiredAdditionalInfo || {}).some(key => Boolean(params.event.requiredAdditionalInfo[key])) ? 'BuyTickets2' : 'BuyTickets3', { event: params.event, tickets: [selectTicket] })
          }
        >
          Next
        </NextButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
  },
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
  wrapper: {
    marginTop: 120,
  },
  textContainer: {
    padding: 16,
    backgroundColor: '#FFDBAA',
    borderRadius: 15
  },
  inlineText: {
    flexDirection: 'row',
  },
  right20: {
    marginRight: 20,
  },
  textInfo: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 25,
    color: '#5B5B5B',
  },
  ticketList: {
    backgroundColor: '#fff',
    shadowOffset: 2,
    shadowColor: '#00000011',
    paddingHorizontal: 15,
    marginVertical: 15,
    borderRadius: 15
  },
  ticket: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bold: {
    lineHeight: 22,
    fontWeight: 'bold',
  },
  default: {
    lineHeight: 22,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    borderWidth: 1,
  },
  button: {
    margin: 25,
  },
  textLight: {
    color: '#999999',
    marginVertical: 3
  }
});
