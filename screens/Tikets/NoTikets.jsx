import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NextButton } from '@Components/NextButton';
import { useNavigation } from '@react-navigation/native';
import { EmptyTickets } from '@Screens/Tikets/EmptyTickets';

export const NoTickets = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        display: 'flex',
        alignContent: 'center',
      }}
    >
      <View style={styles.content}>
        <EmptyTickets />
      </View>
      <View>
        <NextButton onPress={() => navigation.navigate('Events')}>
          Go to events
        </NextButton>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    marginTop: 3,
    height: '86%',
  },
});
