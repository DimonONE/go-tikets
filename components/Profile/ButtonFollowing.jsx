import React, { useState } from 'react';
import AppText from '../AppText';
import { Pressable, StyleSheet } from 'react-native';

export const ButtonFollowing = ({ onPress }) => {
  const [following, setFollowing] = useState(false);
  const follow = () => {
    setFollowing((prev) => !prev);
    if (onPress) onPress();
  };
  return (
    <Pressable style={styles.button} onPress={follow}>
      <AppText style={styles.buttonText}>
        {!following ? 'Follow' : 'Unfollow'}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
  },

  buttonText: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '800',
    lineHeight: 17,
    color: '#FF9100',
  },
});
