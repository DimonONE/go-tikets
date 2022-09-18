import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import AuthWrapper from '@Components/AuthWrapper';
import getMinutesAndSeconds from '@Helpers/getMinutesAndSeconds';

const CELL_COUNT = 4;
const SECONDS_TO_RESEND_CODE = 60;

const SignInConfirmScreen = ({
  handleConfirm,
  phoneNumber,
  handleResendCode,
}) => {
  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const [reversedTimeout, setReversedTimeout] = useState(
    SECONDS_TO_RESEND_CODE
  );

  useEffect(() => {
    if (reversedTimeout === 0) return;

    const t = setTimeout(() => {
      setReversedTimeout((prev) => --prev);
    }, 1000);

    return () => {
      clearTimeout(t);
    };
  }, [reversedTimeout]);

  const confirm = () => {
    handleConfirm(code);
  };

  const resendCode = async () => {
    await handleResendCode();
    setReversedTimeout(SECONDS_TO_RESEND_CODE);
  };

  return (
    <AuthWrapper
      title='Enter Code'
      text={`Check your SMS messages. We’ve sent you code at ${phoneNumber}`}
      onContinueClick={confirm}
    >
      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <View style={{ width: 220 }}>
          <CodeField
            {...codeFieldProps}
            ref={ref}
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            keyboardType='number-pad'
            textContentType='oneTimeCode'
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
      </View>
      <Text style={styles.centeredText}>Don’t you receive any code?</Text>
      <Text
        style={styles.centeredText}
        onPress={() => (reversedTimeout ? null : resendCode())}
      >
        {reversedTimeout
          ? `Send again in ${getMinutesAndSeconds(reversedTimeout)}`
          : 'Send again'}
      </Text>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  centeredText: { textAlign: 'center' },
  buttonsContainer: { flex: 1, marginTop: 'auto' },
  continueText: { color: '#FFFFFF' },
  buttonText: { textTransform: 'uppercase' },
  continueButton: {
    backgroundColor: '#000000',
    marginBottom: 11,
    alignItems: 'center',
    paddingVertical: 20,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});

export default SignInConfirmScreen;
