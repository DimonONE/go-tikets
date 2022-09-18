import React from 'react';
import {Image, View, StyleSheet} from "react-native";
import AppText from "@Components/AppText";
import noCardImage from '@Assets/wallet/noCards.png'

const EmptyCardList = () => {
    return (
        <View style={styles.container}>
            <View>
                <Image source={noCardImage} />
            </View>
            <View>
                <AppText style={styles.text}  size={20} weight={600}>No cards here</AppText>
                <AppText style={styles.text} >Here will be your cards  for buying tickets</AppText>
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

export default EmptyCardList;