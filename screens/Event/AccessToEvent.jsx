import React from 'react';
import AppText from '@/components/AppText';
import { HeaderNavigate } from '@/components/Profile/HeaderNavigate';
import { SafeAreaView } from 'react-native-safe-area-context';
import PhoneInput from 'react-native-phone-input';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { Wrapper } from '@/components/Wrapper';
import closeIcon from '@/assets/svg/closeIcon.svg';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const AccessToEvent = ({ closeAccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [radioButtons, setRadioButtons] = useState([
    {
      id: 1,
      label: 'Admin',
      value: 'admin',
      containerStyle: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '7%',
      },
      selected: true,
    },
    {
      id: 2,
      label: 'Manager',
      value: 'manager',
      containerStyle: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        width: '100%',
      },
    },
  ]);

  const navigation = useNavigation();

  useEffect(() => {
    return () => {
      setPhoneNumber('');
    };
  }, []);

  const onPressRadioButton = (buttons) => {
    const selectedValue = buttons.find((button) => button.selected);
    console.log({ value: selectedValue.value, label: selectedValue.label });
  };

  return (
    <SafeAreaView>
      <HeaderNavigate style={{ height: 56 }}>
        <AppText
          size={16}
          weight={700}
          style={{ textAlign: 'center', width: '100%' }}
        >
          Access to the event
        </AppText>
        <Pressable
          style={{
            right: 10,
            height: 21.23,
            position: 'absolute',
          }}
          onPress={closeAccess}
        >
          <SvgXml xml={closeIcon} />
        </Pressable>
      </HeaderNavigate>
      <Wrapper style={{ marginTop: 0 }}>
        <PhoneInput
          style={[styles.input]}
          onChangePhoneNumber={setPhoneNumber}
        />
        <View>
          <AppText size={14} weight={700} style={{ marginBottom: 10 }}>
            Person's role
          </AppText>
          <RadioGroup
            containerStyle={{
              width: '100%',
            }}
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
          />
        </View>
      </Wrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 29,
    marginBottom: 24,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 4,
    height: 36,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default AccessToEvent;
