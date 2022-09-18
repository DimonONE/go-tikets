import React from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ErrorBoundaryContent = ({ error, resetError }) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Something happened!</Text>
        <Text>{error.toString()}</Text>
        <Button onPress={resetError} title={'Try again'} />
      </View>
    </SafeAreaView>
  );
};

export default ErrorBoundaryContent;
