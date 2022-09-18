import React from 'react';
import { StyleSheet, View } from 'react-native';
import Person from '@Components/Person';
import AppText from '@Components/AppText';

const ReviewItem = ({ name, date, avatar, text }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.info}>
        <Person name={name} avatar={avatar} />
        <AppText style={{ opacity: 0.5 }} size={12}>
          {date}
        </AppText>
      </View>
      <View>
        <AppText>{text}</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ReviewItem;
