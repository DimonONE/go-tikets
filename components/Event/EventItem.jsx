import React from 'react';
import {Image, Pressable, View} from "react-native";
import AppText from "@Components/AppText";
import {Like} from "@Components/Like";
import {SvgXml} from "react-native-svg";
import searchCrash from "@Assets/searchCrash.svg";
import stylization from "@Helpers/stylization";
import {useTheme} from "@react-navigation/native";

const EventItem = ({ event }) => {
    const { colors } = useTheme();
    const locationAndTime = `${event.location.split(', ')[0]}... - ${event.date}`;
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {event.img ? (
                    <Image borderRadius={15} source={event.img}/>
                ) : (
                    <SvgXml xml={searchCrash} height='100%' width='100%'/>
                )}
            </View>
            <View style={styles.content}>
                <View style={styles.info}>
                    <AppText size={12} weight={500}>
                        {locationAndTime}
                    </AppText>
                    <AppText weight={700}>
                        {event.name}
                    </AppText>
                    <Pressable onPress={() => alert('GO TO TICKETS')}><AppText weight={700} style={{ textTransform: 'uppercase', color: colors.primary }}>buy tickets</AppText></Pressable>
                </View>
                <View>
                    <Like style={{ paddingTop: 5, right: 5 }}/>
                </View>
            </View>
        </View>
    );
};

const styles = stylization((theme) => ({
    container: {
        flexDirection: 'row',
        padding: 8,
        borderWidth: 0.1,
        borderBottomWidth: 2,
        borderColor: '#00000011',
        backgroundColor: '#FFFFFF',
        borderRadius: 15
    },
    info: {
        justifyContent: 'space-between',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '67%',
    },
    imageContainer: {
        width: '30%',
        height: 90,
        marginRight: 12,
        borderRadius: 15
    }
}))

export default EventItem;