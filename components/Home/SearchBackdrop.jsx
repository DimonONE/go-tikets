import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import AppText from '@Components/AppText';
import { Backdrop } from 'react-native-backdrop';
import RadioGroup from 'react-native-radio-buttons-group';
import {useTheme} from "@react-navigation/native";

export const SearchBackdrop = ({
  showBackdrop,
  setShowBackdrop,
  setSelectedSort,
  values,
}) => {
  const { colors } = useTheme();
  const [radioButtons, setRadioButtons] = useState([
    {
      id: '1',
      label: 'relevance',
      value: 'date',
      color: colors.primary,
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
      id: '2',
      label: 'date',
      value: 'createDate',
      color: colors.primary,
      containerStyle: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        width: '100%',
      },
    },
  ]);

  const onPressRadioButton = (buttons) => {
    const selectedValue = buttons.find((button) => button.selected);
    setSelectedSort({ value: selectedValue.value, label: selectedValue.label });
  };

  useEffect(() => {
    if (values) {
      setRadioButtons(values);
    }
  }, [values]);

  return (
    <Backdrop
      visible={showBackdrop}
      handleClose={() => {
        setShowBackdrop(false);
      }}
      swipeConfig={{
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
      }}
      animationConfig={{
        speed: 14,
        bounciness: 4,
      }}
      overlayColor='rgba(0,0,0,0.32)'
      containerStyle={{
        borderColor: '#fff',
        backgroundColor: '#fff',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
      }}
    >
      <View
        style={{
          minHeight: '30%',
          padding: 16,
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'column',
        }}
      >
        <AppText
          weight={700}
          style={{ fontSize: 22, marginTop: 8, marginBottom: 4 }}
        >
          Sort events by
        </AppText>
        <RadioGroup
          containerStyle={{
            width: '100%',
          }}
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
        />
      </View>
    </Backdrop>
  );
};
