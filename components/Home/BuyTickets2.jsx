import React  from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { NextButton } from '@Components/NextButton';
import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import AppText from '@Components/AppText';
import { Wrapper } from '@/components/Wrapper';
import {useNavigation, useRoute} from '@react-navigation/native';
import TicketInfoBottomBlock from "@Components/Home/TicketInfoBottomBlock";

export const BuyTickets2 = () => {
  const navigation = useNavigation();
  const { params: {event, tickets} } = useRoute();

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
            Info
          </AppText>
          <AppText>2/3</AppText>
        </HeaderNavigate>
        <Wrapper style={styles.wrapper}>
          <View style={styles.additional}>
            <AppText size={12} style={styles.additionalText}>
              Description of additional information for organizers
              Vestibulum lorem sed risus ultricies tristique nulla aliquet. Tortor condimentum laciniaquis vel eros doneVestibulum lorem sed risus ultricies tristique nulla aliquet. Tortor condimentum laciniaquis vel eros done
            </AppText>
            <TextInput style={styles.input} multiline />
          </View>
        </Wrapper>
        <View style={styles.bottom}>
          <NextButton
              style={styles.button}
          >
            ADD ONE MORE TICKET
          </NextButton>
          <NextButton
              variant={'text'}
              style={[styles.button, styles.nextButton]}
              onPress={() => navigation.navigate('BuyTickets3', { event, tickets })}
          >
            Next
          </NextButton>
          <TicketInfoBottomBlock tickets={tickets} event={event} />
        </View>
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
    marginTop: 100,
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
    justifyContent: 'space-between',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  bold: {
    lineHeight: 22,
    fontWeight: 'bold',
    color: '#5B5B5B',
  },
  default: {
    fontWeight: '400',
    fontSize: 12,
    color: '#5B5B5B',
  },
  button: {
    marginHorizontal: 25,
  },
  nextButton: {
    borderColor: '#00000011',
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  additional: {
    marginBottom: 10,
  },
  additionalText: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  input: {
    padding: 10,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 100,
  },
  ticketInfo: {
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
    paddingBottom: 30,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16
  },
  ticketInfoFirstBlock: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    padding: 12
  },
  ticketInfoSecondBlock: {
    justifyContent: 'center',
    width: '50%'
  }
});
