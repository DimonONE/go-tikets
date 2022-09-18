import React from 'react';
import { Avatar } from '@Components/Profile/Avatar';
import userIMG from '@Assets/User.png';
import AppText from '@Components/AppText';
import { StyleSheet, View } from 'react-native';

const Person = ({ name, style, status, avatar = userIMG }) => {
  return (
    <View style={[styles.container, style]}>
      <Avatar
        img={avatar}
        styleWrap={styles.avatarImage}
        styleImageWrap={styles.avatarImage}
      />
      {status && <AppText size={12}>{status}: </AppText>}
      <AppText size={12} weight={500}>
        {name}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 27,
    height: 27,
    marginRight: 5,
  },
});

export default Person;
