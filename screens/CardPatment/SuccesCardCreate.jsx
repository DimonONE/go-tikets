import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import succesCardCreateImage from "@Assets/wallet/succesCardCreate.png";
import AppText from "@Components/AppText";
import {useNavigation} from "@react-navigation/native";
import {HeaderNavigate} from "@Components/Profile/HeaderNavigate";
import {SafeAreaView} from "react-native-safe-area-context";
import {Wrapper} from "@Components/Wrapper";

const SuccesCardCreate = () => {
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
                        <Image source={succesCardCreateImage}/>
                    </View>
                    <View>
                        <AppText style={styles.text} size={20} weight={600}>Card successfully added</AppText>
                        <AppText style={styles.text}>You can now use the card to buy tickets to events</AppText>
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

export default SuccesCardCreate;