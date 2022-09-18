import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import noBankAccounts from "@Assets/wallet/noBankAccounts.png";
import AppText from "@Components/AppText";

const EmptyBankAccounts = () => {
    return (
        <View style={styles.container}>
            <View>
                <Image source={noBankAccounts} />
            </View>
            <View>
                <AppText style={styles.text}  size={20} weight={600}>No bank accounts </AppText>
                <AppText style={styles.text} >Here will be your bank accounts  for selling tickets</AppText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 'auto',
        justifyContent: 'center',
        height: '85%'
    },
    text: {
        textAlign: 'center'
    }
})

export default EmptyBankAccounts;