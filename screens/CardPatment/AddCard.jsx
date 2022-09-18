import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {HeaderNavigate} from "@Components/Profile/HeaderNavigate";
import AppText from "@Components/AppText";
import {Wrapper} from "@Components/Wrapper";
import {useNavigation, useTheme} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {CreditCardInput} from "react-native-credit-card-input";
import {NextButton} from "@Components/NextButton";
import useQuery from "@Hooks/useQuery";
import {user} from "@/server";
import Toast from "react-native-toast-message";

const AddCard = () => {
    const [cardInfo, setCardInfo] = useState({
        cardNumber: null,
        cardExpiry: null,
        cardCVV: null,
        cardHolder: null
    });
    const navigation = useNavigation();
    const theme = useTheme();

    const handleSaveCard = async () => {
        const { data, ok, message } = await useQuery(user.addPayment(cardInfo));

        if (!ok) {
            Toast.show({
                type: 'error',
                text1: message,
            });
        }

        if (data) {
            navigation.navigate('SuccesCardCreate');
        }
    }

    return (
        <SafeAreaView>
            <ScrollView decelerationRate={3} contentContainerStyle={{ height: '100%', minHeight: 800 }}>
                <Wrapper style={{marginTop: 32, height: '100%'}}>
                    <View>
                        <HeaderNavigate
                            style={{
                                backgroundColor: 'inherit',
                                height: 20,
                            }}
                            arrowBack
                            onBack={() => navigation.goBack()}
                        >
                            <AppText
                                style={{
                                    color: '#000000',
                                    fontSize: 18,
                                    fontWeight: '700',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}
                            >
                                Wallet
                            </AppText>
                        </HeaderNavigate>
                    </View>
                    <View style={styles(theme).container}>
                        <View style={styles(theme).textContainer}>
                            <AppText style={styles(theme).text} size={24} weight={700}>Add card</AppText>
                            <AppText style={styles(theme).text}>To add bank account, first configure it</AppText>
                        </View>
                        <View>
                            <CreditCardInput inputStyle={styles(theme).cardInputStyle} allowScroll
                                             inputContainerStyle={styles(theme).cardInputContainerStyle}
                                             labelStyle={styles(theme).cardLabelStyle} requiresName
                                             onChange={(form) => {
                                                 setCardInfo({
                                                     cardNumber: form.values.number.replace(/\s/g, ''),
                                                     cardExpiry: form.values.expiry.replace('/', ''),
                                                     cardCVV: form.values.cvc,
                                                     cardHolder: form.values.name
                                                 })
                                                 console.log(form)
                                             }}/>
                        </View>
                        <View style={{ marginVertical: 20 }}>
                            <NextButton variant={'text'} >Add from Apple Wallet</NextButton>
                        </View>
                    </View>
                    <View style={styles(theme).footer}>
                        <NextButton onPress={handleSaveCard}>Save</NextButton>
                    </View>
                </Wrapper>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        alignItems: 'stretch'
    },
    text: {
        textAlign: 'center'
    },
    textContainer: {
        marginVertical: 40
    },
    cardInputStyle: {
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingHorizontal: 10
    },
    cardInputContainerStyle: {
        borderRadius: 16,
    },
    cardLabelStyle: {
        textTransform: 'capitalize',
        fontWeight: '500',
        marginLeft: 10
    },
    footer: {
        marginTop: 'auto',
        marginBottom: 50
    }
})

export default AddCard;