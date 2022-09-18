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
import successBuy from "@Assets/wallet/successBuy.png";

export const SuccessBuy = () => {
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
                      <Image source={successBuy}/>
                  </View>
                  <View>
                      <AppText style={styles.text} size={20} weight={600}>Account successfully added</AppText>
                      <AppText style={styles.text}>You can now use the account to sell tickets to your event</AppText>
                  </View>
              </View>
              <NextButton
                  style={{ marginBottom: 30 }}
                  onPress={() => navigation.navigate('Tickets')}
              >
                  Go to tickets
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
