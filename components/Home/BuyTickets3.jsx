import React, { useState } from 'react';
import {
    SafeAreaView, ScrollView,
    StyleSheet, TextInput,
    View,
} from 'react-native';
import { NextButton } from '@Components/NextButton';
import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import AppText from '@Components/AppText';
import { Wrapper } from '@/components/Wrapper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { event as eventServer } from '@/server';
import SelectPaymentMethodBackdrop from "@Components/Home/SelectPaymentMethodBackdrop";
import TicketInfoBottomBlock from "@Components/Home/TicketInfoBottomBlock";

export const BuyTickets3 = () => {
  const [showPayments, setShowPayments] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigation = useNavigation();
  const {
    params: { event, tickets },
  } = useRoute();

  const buyTickets = async () => {
    setShowPayments({ buy: true })
  };

  const bookTickets = async () => {
    setShowPayments({ book: true })
  };

  const handleSelectCard = async (cardID) => {
    await eventServer.buyTickets({
      id: event.id,
      tickets: tickets.map(({ id, count = 1 }) => ({ id, count, isBooking: showPayments?.book })),
    })

    setShowPayments(false);

    navigation.navigate(showPayments?.buy ? 'SuccessBuy' : 'SuccessBook');
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <HeaderNavigate style={styles.headerNavigate} onBack={() => navigation.navigate('Home')} arrowBack>
          <AppText
            style={{
              color: '#000000',
              fontWeight: '800',
              fontSize: 14,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Payment
          </AppText>
          <AppText>3/3</AppText>
        </HeaderNavigate>
        <ScrollView>
        <Wrapper style={styles.wrapper}>
          <View style={styles.payBlock}>
            <AppText style={styles.bold}>Pay online</AppText>
            <AppText style={{ ...styles.default, ...styles.descText }}>
              You can buy tickets online and after confirmation of the purchase
              by the organizer you can find them in the "Tickets"{' '}
            </AppText>
            <View style={styles.payBlockBottom}>
              <View>
                <AppText style={styles.priceText} weight={700}>Price</AppText>
                <View style={styles.inlineText}>
                  <AppText style={styles.default} weight={500}>$ {tickets[0].price}</AppText>
                  <AppText style={styles.default}>
                    + $ {tickets[0].servicePrice || 0} Fee
                  </AppText>
                </View>
              </View>
              <NextButton style={{ width: '50%' }} onPress={buyTickets}>Buy tickets</NextButton>
            </View>
          </View>
          <View style={styles.payBlock}>
            <AppText style={styles.bold}>Pay cash</AppText>
            <AppText style={{ ...styles.default, ...styles.descText }}>
              You can book tickets and pay in cash at the entrance on the day of
              the event. Online you only need to pay for the booking
            </AppText>
            <View style={styles.payBlockBottom}>
              <View>
                <AppText style={styles.priceText} weight={700}>Price</AppText>
                <View style={styles.inlineText}>
                  <AppText style={styles.default} weight={500}>$ {tickets[0].price}</AppText>
                  <AppText style={styles.default}>
                    + $ {tickets[0].servicePrice || 0} Fee
                  </AppText>
                </View>
              </View>
              <NextButton style={styles.boockButton} textStyle={styles.boockButtonText} variant={'text'} onPress={bookTickets}>Book tickets</NextButton>
            </View>
          </View>
          <View>
            <TextInput style={styles.input} placeholder={'Promocode'} />
          </View>
        </Wrapper>
        </ScrollView>
        <TicketInfoBottomBlock tickets={tickets} event={event} />
      </View>
      <SelectPaymentMethodBackdrop showBackdrop={showPayments} setShowBackdrop={setShowPayments} onSelectPayment={handleSelectCard}/>
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
    margin: 10,
  },
  ticket: {
    backgroundColor: '#F0F0F0',
    minHeight: 125,
    padding: 10,
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  right20: {
    marginRight: 20,
  },
  inlineText: {
    flexDirection: 'row',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  bold: {
    lineHeight: 22,
    fontWeight: 'bold',
  },
  default: {
    fontWeight: '400',
    fontSize: 12,
  },
  payBlock: {
    padding: 15,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 15,
    backgroundColor: '#FFF'
  },
  payBlockBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  descText: {
    marginVertical: 5,
  },
  priceText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  boockButton: {
    backgroundColor: '#F6F6F6',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
    width: '50%'
  },
  boockButtonText: {
    fontWeight: 'bold',
    color: '#4F4F4F',
  },
  input: {
    padding: 15,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
  },
});
