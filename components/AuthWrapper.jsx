import React from 'react';
import { StyleSheet} from 'react-native';
import { Text, View } from 'react-native';

import AuthSkipButton from './AuthSkipButton';
import {Button} from "@Components/UI";

const AuthWrapper = ({
  title,
  text,
  onContinueClick,
  children,
  buttonsAlign,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.topText}>{text}</Text>

      <View style={styles.childrenContainer}>
        {children}
        <View
          style={[
            styles.buttonsContainer,
            { justifyContent: buttonsAlign || 'center' },
          ]}
        >
          <View>
            <Button onPress={onContinueClick}>Continue</Button>
            <AuthSkipButton />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 60,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#5B5B5B',
  },
  topText: {
    textAlign: 'center',
    color: '#5B5B5B',
    fontSize: 14,
    marginBottom: 27,
  },
  buttonsContainer: {
    flex: 1,
  },
  childrenContainer: {
    display: 'flex',
    height: '100%',
  },
});

export default AuthWrapper;
