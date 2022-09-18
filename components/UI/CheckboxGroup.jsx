import React from 'react';
import {View} from "react-native";
import CheckBox from "@Components/UI/CheckBox";
import AppText from "@Components/AppText";
import stylization from "@Helpers/stylization";

// CheckBoxItem
// { id, label, value, checked }

const CheckboxGroup = ({ items, setItems, rowCount = 1, columnCount, style }) => {
    const adaptiveStyle = stylization({
        item: {
            width: `${100/rowCount}%`
        }
    })

    const handlerClickCheckBox = (id) => {
        setItems(items.map(item => item.id === id ? {...item, checked: !item.checked} : item))
    }

    return (
        <View style={[styles.container, style]}>
            {items.map((item) => (
                <View style={[styles.item, adaptiveStyle.item]}>
                    <CheckBox
                        onClick={() => handlerClickCheckBox(item.id)}
                        isChecked={item.checked}
                    />
                    <AppText size={12} style={styles.text}>{item.label || item.value}</AppText>
                </View>
            ))}
        </View>
    );
};

const styles = stylization({
    container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4
    },
    text: {
        marginLeft: 10
    }
})

export default CheckboxGroup;