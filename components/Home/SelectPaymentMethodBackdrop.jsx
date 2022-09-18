import React, {useEffect, useState} from 'react';
import Backdrop from "react-native-backdrop/example/Backdrop";
import AppText from "@Components/AppText";
import {StyleSheet, View} from "react-native";
import {user} from "@/server";
import Toast from "react-native-toast-message";
import CardPaymentItem from "@Components/Profile/CardPaymentItem";
import {NextButton} from "@Components/NextButton";
import plusIcon from "@Assets/plusIcon.svg";
import ApplePay from "@Assets/wallet/ApplePay.svg";
import {useNavigation} from "@react-navigation/native";

const SelectPaymentMethodBackdrop = ({showBackdrop, setShowBackdrop, onSelectPayment}) => {
    const [cards, setCards] = useState([]);
    const [cardSelect, setCardSelect] = useState(null);
    const navigation = useNavigation();

    const fetchData = async () => {
        const {data, message} = await user.getPayments();

        if (!data) {
            Toast.show({
                type: 'error',
                text1: message,
            });
            return;
        }

        setCards(data);
    }

    useEffect(() => {
        fetchData()
    }, []);

    const onSelectCard = (cardID) => {
        console.log(cardID)
        setCardSelect(cardID);
        onSelectPayment(cardID);
    }

    return (
        <Backdrop
            visible={showBackdrop}
            handleClose={() => {
                setShowBackdrop(false);
            }}
            swipeConfig={{
                velocityThreshold: 0.3,
                directionalOffsetThreshold: 80,
            }}
            animationConfig={{
                speed: 14,
                bounciness: 4,
            }}
            overlayColor='rgba(0,0,0,0.32)'
            containerStyle={{
                borderColor: '#fff',
                backgroundColor: '#F6F6F6',
                borderTopStartRadius: 10,
                borderTopEndRadius: 10,
            }}
        >
            <View style={{ marginTop: 24 }}>
                <AppText style={styles.defaultText}  size={20} weight={500}>How do you want to pay?</AppText>
                <AppText style={styles.defaultText} >Please select the card for payment</AppText>
                <View>
                    {cards.map((card) => (
                        <CardPaymentItem selected={card.id === cardSelect} item={card} onClick={() => onSelectCard(card.id)} />
                    ))}
                </View>
                <NextButton
                    variant={'text'}
                    startIcon={plusIcon}
                    onPress={() => navigation.navigate('AddCard')}
                >
                    Add new card
                </NextButton>
                <NextButton style={styles.payButton} startIcon={ApplePay}>
                    {''}
                </NextButton>
            </View>
        </Backdrop>
    );
};

const styles = StyleSheet.create({
    defaultText: {
      textAlign: 'center',
      marginBottom: 24
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    payButton: {
        backgroundColor: '#000',
        borderWidth: 0,
        borderBottomWidth: 0
    },
})

export default SelectPaymentMethodBackdrop;