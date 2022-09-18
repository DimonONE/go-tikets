import {View} from "react-native";
import AppText from "@Components/AppText";
import React from "react";
import stylization from "@Helpers/stylization";

export const Block = ({title, children, style}) => {
    return (
        <View style={[ styles.block, style]}>
            <AppText
                style={{
                    fontSize: 24,
                    fontWeight: '500',
                    lineHeight: 28,
                    color: '#4F4F4F',
                }}
            >
                {title}
            </AppText>
            <View style={styles.children}>
                {children}
            </View>
        </View>
    );
};

const styles = stylization({
    block: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: '#DCDCDC'
    },
    children: {
        marginTop: 15,
    }
})