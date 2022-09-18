import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const InputIcon = ({ icon }) => (
  <View style={styles.searchIcon}>{!!icon && <SvgXml xml={icon} />}</View>
);

export const AppIconInput = ({
  onChangeText,
  value,
  placeholder,
  icon,
  style = {},
  iconPosition = 'left',
}) => (
  <View style={style}>
    <View style={[{ backgroundColor: '#fff' }, styles.inputWrapper]}>
      {iconPosition === 'left' && <InputIcon icon={icon} />}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholder={placeholder}
        underlineColorAndroid='transparent'
      />
      {iconPosition === 'right' && <InputIcon icon={icon} />}
    </View>
  </View>
);

const styles = StyleSheet.create({
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 64,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#DCDCDC',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    paddingBottom: 8,
  },
});
