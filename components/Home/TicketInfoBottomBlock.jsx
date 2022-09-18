import React from 'react';
import {StyleSheet, View} from "react-native";
import AppText from "@Components/AppText";
import dayjs from "dayjs";

const TicketInfoBottomBlock = ({ tickets, event }) => {
    const ticket = tickets[0];
    const locationAndTime = event && `${event.address.split(', ')[0]}... - ${dayjs(event.startDate).format('MMM D, HH:mm')}`;

    return (
        <View style={styles.ticketInfo}>
            <View style={styles.ticketInfoFirstBlock}>
                <AppText size={10} weight={500}>{locationAndTime}</AppText>
                <AppText size={12} weight={700} style={{ marginBottom: 5 }}>{tickets[0].name}</AppText>
                <AppText size={10} weight={500} >Petro Ivanov</AppText>
                <AppText size={10} weight={500} >+44  55 6565  65656</AppText>
            </View>
            <View style={styles.ticketInfoSecondBlock}>
                <View>
                    <AppText weight={700} size={16} style={{ marginBottom: 8 }}>{tickets.length} ticket</AppText>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <AppText weight={700}>$ {ticket.price}</AppText>
                    <AppText>
                        {' '}
                        + ${ticket.serviceCharge} Fee
                    </AppText>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    ticketInfo: {
        backgroundColor: '#FFF',
        paddingHorizontal: 25,
        paddingBottom: 30,
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16
    },
    ticketInfoFirstBlock: {
        backgroundColor: '#F6F6F6',
        borderRadius: 10,
        padding: 12
    },
    ticketInfoSecondBlock: {
        justifyContent: 'center',
        width: '50%'
    }
});

export default TicketInfoBottomBlock;