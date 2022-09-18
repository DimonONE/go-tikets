import React from 'react';
import {Pressable, View, StyleSheet} from "react-native";
import AppText from "@Components/AppText";
import {SvgXml} from "react-native-svg";
import deleteIcon from "@Assets/delete.svg";

const CardPaymentItem = ({item, removePayment, onClick, selected}) => {

    const handleRemovePayment = () => {
        removePayment(item.id)
    }

    return (
        <Pressable onPress={onClick}>
            <View style={[styles.container, selected && styles.containerSelected]}>
                <View>
                    <AppText weight={700}>{item.paymentCardHolder}</AppText>
                    <AppText weight={500}>{item.formattedCardNumber}</AppText>
                    {/*<AppText>Privat 4455</AppText>*/}
                </View>
                <View style={styles.actions}>
                    {removePayment &&
                    <Pressable
                        style={{height: 20, marginLeft: 'auto'}}
                        onPress={handleRemovePayment}
                    >
                        <SvgXml xml={deleteIcon}/>
                    </Pressable>}
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginVertical: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 15,
        backgroundColor: '#FFF'
    },
    containerSelected: {
        backgroundColor: '#FFDBAA'
    },
    actions: {
        justifyContent: 'flex-start'
    }
})

export default CardPaymentItem;