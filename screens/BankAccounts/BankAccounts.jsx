import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import CardPaymentItem from "@Components/Profile/CardPaymentItem";
import {NextButton} from "@Components/NextButton";
import {useNavigation} from "@react-navigation/native";
import EmptyBankAccounts from "@Screens/BankAccounts/EmptyBankAccounts";
import useQuery from "@Hooks/useQuery";
import {bank} from "@/server";
import Toast from "react-native-toast-message";
import GlobalLoader from "@Components/GlobalLoader";

const BankAccounts = ({ user }) => {
    const navigation = useNavigation();
    const [bankAccounts, setBankAccounts] = useState(user?.bankAccounts);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        const {data, ok, message} = await useQuery(bank.getBankAccounts());
        setLoading(true);

        if (!ok) {
            Toast.show({
                type: 'error',
                text1: message,
            });
        }

        if (data) {
            setBankAccounts(data.map(item => ({
                ...item,
                paymentCardHolder: `${item.name} ${item.surname}`,
                formattedCardNumber: item.bankNumber,
            })));
        }

        setLoading(false);
    }

    const removeBankAccount = async (id) => {
        setLoading(true);
        const {data, ok, message} = await useQuery(bank.removeBankAccounts(Number(id)));

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
                {bankAccounts?.length ? (
                    <FlatList style={{ opacity: loading ? 0.5 : 1 }} data={bankAccounts} renderItem={(item) => <CardPaymentItem item={item.item} removePayment={removeBankAccount}/>}
                              keyExtractor={(item) => item.id}/>
                ) : (
                    <EmptyBankAccounts/>
                )}
                {loading && <GlobalLoader/>}
            </View>
            <View>
                <NextButton onPress={() => navigation.navigate('AddBankAccount')}>Add bank account</NextButton>
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

export default BankAccounts;