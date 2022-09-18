import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {HeaderNavigate} from "@Components/Profile/HeaderNavigate";
import AppText from "@Components/AppText";
import {View} from "react-native";
import {TabsCustom} from "@Components/Tabs";
import {Wrapper} from "@Components/Wrapper";
import Cards from "@Screens/CardPatment/Cards";
import BankAccounts from "@Screens/BankAccounts/BankAccounts";
import {useNavigation} from "@react-navigation/native";
import useQuery from "@Hooks/useQuery";
import {user as userRequest} from "@/server";
import Toast from "react-native-toast-message";

const routes = [
    {key: 'cards', title: 'Cards'},
    {key: 'bankAccounts', title: 'Bank accounts'},
]

const Wallet = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState();

    useEffect(() => {
        (async () => {
            setLoading(true);
            const { data, ok, message, status } = await useQuery(
                userRequest.getUserProfile()
            );

            if (ok) {
                setUser(data);
                setLoading(false);
                return;
            }
            if (status === 401) {
                setLoading(false);
                return;
            }
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: message,
            });
            navigation.navigate('TabNavigation');
        })();
    }, []);


    const renderScene = useCallback(
        ({route}) => {
            switch (route.key) {
                case 'cards':
                    return <Cards user={user} />;
                case 'bankAccounts':
                    return <BankAccounts user={user} />;
                default:
                    return null;
            }
        },
        [user],
    );

    return (
        <SafeAreaView>
            <Wrapper style={{ marginTop: 32 }}>
                <View>
                    <HeaderNavigate
                        style={{
                            backgroundColor: 'inherit',
                            height: 20,
                        }}
                        arrowBack
                        onBack={() => navigation.navigate('Profile')}
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
                <View style={{marginTop: 30}}>
                    <TabsCustom renderScene={renderScene} routes={routes}/>
                </View>
            </Wrapper>
        </SafeAreaView>
    );
};

export default Wallet;
