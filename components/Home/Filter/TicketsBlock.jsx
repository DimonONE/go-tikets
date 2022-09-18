//Tickets
import {StyleSheet, View} from "react-native";
import {CheckBox} from "@Components/UI";
import AppText from "@Components/AppText";
import React from "react";

export const TicketsBlock = ({value, onChange}) => {
    const onlyInStock = () => {
        onChange(!value);
    };

    return (
        <View style={{flexDirection: 'row'}}>
            <View style={styles.checkBoxContainer}>
                <CheckBox
                    onClick={onlyInStock}
                    isChecked={value}
                />
                <AppText style={{fontSize: 12, color: '#828282', marginLeft: 14}}>
                    only in stock
                </AppText>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    checkBoxContainer: {
        width: '23.3%',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 30,
    }
});
