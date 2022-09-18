import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, AlertIOS} from "react-native";
import {NextButton} from "@Components/NextButton";
import {useNavigation} from "@react-navigation/native";
import useQuery from "@Hooks/useQuery";
import {user} from "@/server";
import Toast from "react-native-toast-message";
import EmptyCardList from "@Screens/CardPatment/EmptyCardList";
import CardPaymentItem from "@Components/Profile/CardPaymentItem";
import GlobalLoader from "@Components/GlobalLoader";

const Cards = () => {
    const navigation = useNavigation();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const {data, ok, message} = await useQuery(user.getPayments());
        setLoading(true);

        if (!ok) {
            Toast.show({
                type: 'error',
                text1: message,
            });
        }

        if (data) {
            setPayments(data);
        }

        setLoading(false);
    }

    const removePayment = async (id) => {
        setLoading(true);
        const {data, ok, message} = await useQuery(user.removePayment(id));

        if (!ok) {
            Toast.show({
                type: 'error',
                text1: message,
            });
        }

        if (data) {
            await fetchData();
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <View>
            <View style={styles.content}>
                {payments?.length ? (
                    <FlatList style={{ opacity: loading ? 0.5 : 1 }} data={payments} renderItem={(item) => <CardPaymentItem item={item.item} removePayment={removePayment}/>}
                              keyExtractor={(item) => item.id}/>
                ) : (
                    <EmptyCardList/>
                )}
                {loading && <GlobalLoader/>}
            </View>
            <View>
                <NextButton onPress={() => navigation.navigate('AddCard')}>Add card</NextButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        marginVertical: 10,
        height: '81%'
    },
})

export default Cards;
