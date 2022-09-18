import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AppPicker = ({ items = [], selectedValue, onValueChange, style }) => {
  return (
    <View style={[styles.picker, { ...style }]}>
      <Picker
        style={{ marginTop: 'auto', marginBottom: 'auto' }}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {items.map(({ label, value }, index) => (
          <Picker.Item key={index} label={label} value={value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default AppPicker;
