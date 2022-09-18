import React from 'react';
import {Wrapper} from "@Components/Wrapper";
import {HeaderNavigate} from "@Components/Profile/HeaderNavigate";
import {Image, StyleSheet, View} from "react-native";
import succesBankAccountCreate from "@Assets/wallet/succesBankAccountCreate.png";
import AppText from "@Components/AppText";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";

const SuccesBankAccountCreate = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <Wrapper style={{marginTop: 32}}>
                <HeaderNavigate
                    style={{
                        backgroundColor: 'inherit',
                        height: 20,
                    }}
                    arrowBack
                    onBack={() => navigation.navigate('Wallet')}
                />
                <View style={styles.container}>
                    <View>
                        <Image source={succesBankAccountCreate}/>
                    </View>
                    <View>
                        <AppText style={styles.text} size={20} weight={600}>Account successfully added</AppText>
                        <AppText style={styles.text}>You can now use the account to sell tickets to your event</AppText>
                    </View>
                </View>
            </Wrapper>
        </SafeAreaView>
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

export default SuccesBankAccountCreate;