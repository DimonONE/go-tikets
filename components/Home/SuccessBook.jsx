import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { NextButton } from '@Components/NextButton';
import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import AppText from '@Components/AppText';
import { Wrapper } from '@/components/Wrapper';
import { useNavigation } from '@react-navigation/native';
import successBook from "@Assets/wallet/successBook.png";

export const SuccessBook = () => {
  const navigation = useNavigation();

  return (
      <SafeAreaView>
          <Wrapper style={{marginTop: 50}}>
              <HeaderNavigate
                  style={{
                      backgroundColor: 'inherit',
                      height: 20,
                  }}
                  arrowBack
                  onBack={() => navigation.navigate('Wallet')}
              />
              <View style={styles.container}>
                  <View>
                      <Image source={successBook}/>
                  </View>
                  <View>
                      <AppText style={styles.text} size={20} weight={600}>Your request is accepted</AppText>
                      <AppText style={styles.text}>When the author of the event confirms your request, tickets will appear in the Tickets section, and the money will be debited</AppText>
                  </View>
              </View>
              <NextButton
                  style={{ marginBottom: 30 }}
                  onPress={() => navigation.navigate('Tickets')}
              >
                  Go discover events
              </NextButton>
          </Wrapper>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 'auto',
        justifyContent: 'center',
        height: '85%'
    },
    text: {
        textAlign: 'center'
    }
})
