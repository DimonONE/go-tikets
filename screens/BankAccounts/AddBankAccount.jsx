import React, {useState} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import AppInput from '@Components/AppInput';
import { NextButton } from '@Components/NextButton';
import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import AppText from '@Components/AppText';
import { useNavigation } from '@react-navigation/native';
import { Wrapper } from '@Components/Wrapper';
import useQuery from "@Hooks/useQuery";
import {bank} from "@/server";
import Toast from "react-native-toast-message";

const AddBankAccount = () => {
  const [bankAccountInfo, setBankAccountInfo] = useState({
    name: '',
    surname: '',
    bankNumber: '',
    bankAccountNumber: '',
    idCode: ''
  });
  const navigation = useNavigation();

  const handleChangeData = (key) => (value) => {
    setBankAccountInfo(prev => ({...prev, [key]: value}))
  }

  const onSave = async () => {
      const { data, ok, message } = await useQuery(bank.addBankAccounts(bankAccountInfo));
      console.log({ data, ok, message })

      if (!ok) {
          Toast.show({
              type: 'error',
              text1: message,
          });
      }

      if (data) {
          navigation.navigate('SuccesBankAccountCreate');
      }
  };

  return (
    <SafeAreaView>
      <ScrollView decelerationRate={3}>
        <Wrapper>
          <View style={{ marginBottom: 32 }}>
            <HeaderNavigate
              style={{
                backgroundColor: 'inherit',
                height: 20,
                marginBottom: 21,
              }}
              arrowBack
              onBack={() => navigation.navigate('Wallet')}
            />
            <AppText
              style={{
                color: '#000000',
                fontSize: 24,
                lineHeight: 28,
                fontWeight: '700',
              }}
            >
              Add bank account
            </AppText>
          </View>
          <View style={{ marginBottom: 45 }}>
            <AppInput
              label='Name*'
              textAlignVertical='center'
              styleInput={styles.styleInput}
              styleLabel={styles.styleLabel}
              value={bankAccountInfo.name}
              onChangeText={handleChangeData('name')}
            />
            <AppInput
              label='Surname*'
              textAlignVertical='center'
              styleInput={styles.styleInput}
              styleLabel={styles.styleLabel}
              value={bankAccountInfo.surname}
              onChangeText={handleChangeData('surname')}
            />
            <AppInput
              label='Bank number'
              textAlignVertical='center'
              styleInput={styles.styleInput}
              styleLabel={styles.styleLabel}
              value={bankAccountInfo.bankNumber}
              onChangeText={handleChangeData('bankNumber')}
            />
            <AppInput
              label='Bank account number'
              textAlignVertical='center'
              styleInput={styles.styleInput}
              styleLabel={styles.styleLabel}
              value={bankAccountInfo.bankAccountNumber}
              onChangeText={handleChangeData('bankAccountNumber')}
            />

            <AppInput
              label='Type'
              textAlignVertical='center'
              styleInput={styles.styleInput}
              styleLabel={styles.styleLabel}
              value={bankAccountInfo.idCode}
              onChangeText={handleChangeData('idCode')}
            />

            <AppInput
              label='ID code'
              textAlignVertical='center'
              styleInput={styles.styleInput}
              styleLabel={styles.styleLabel}
            />
          </View>

          <NextButton onPress={onSave}>Save</NextButton>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  styleName: {
    textTransform: 'uppercase',
    fontSize: 14,
    color: '#4F4F4F',
  },

  styleInput: {
    height: 56,
    fontSize: 16,
    color: '#5B5B5B',
    alignItems: 'center',
    borderColor: '#eaeaea',
  },

  styleLabel: {
    marginVertical: 30,
  },
});

export default AddBankAccount;
