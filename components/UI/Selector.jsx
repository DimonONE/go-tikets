import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import AppText from '@Components/AppText';
import stylization from "@Helpers/stylization";

const Selector = ({
    styleContainer,
    styleItem,
    styleButton,
    styleButtonText,
    styleActiveButton,
    styleActiveButtonText,
    selectors,
    selectValue,
    onChange,
    getLabel = (value) => value,
    size = 'medium',
    fullWidth = false
}) => {
    const fontSize = size === 'medium' ? 12 : 14

    return (
        <View style={[style.selector, fullWidth && style.fullWidthSelector, styleContainer]}>
            {selectors.map((selector) => {
                const isActive = selector === selectValue;
                return (
                    <View key={getLabel(selector)} style={[style.item && styleItem]}>
                        <TouchableOpacity
                            style={[style.button, styleButton, ...(isActive ? [style.activeButton, styleActiveButton] : [])]}
                            onPress={() => onChange(selector)}
                        >
                            <AppText
                                style={[style.buttonText, ...(isActive ? [style.activeButtonText, styleActiveButtonText] : []), styleButtonText]}
                                size={fontSize}
                                weight={400}
                            >
                                {getLabel(selector)}
                            </AppText>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
};

const style = stylization(({colors}) => ({
    selector: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 10,
    },
    fullWidthSelector: {
        justifyContent: 'space-between',
        width: '100%'
    },
    item: {
        marginRight: 10,
        width: '100%',
    },
    button: {
        backgroundColor: '#F6F6F6',
        borderRadius: 12,
        width: '100%'
    },
    buttonText: {
        paddingVertical: 13,
        color: '#9F9F9F',
        width: '100%',
        textAlign: 'center',
    },
    activeButton: {
        backgroundColor: colors.primaryLight
    },
    activeButtonText: {
        color: colors.primary,
        fontWeight: '700'
    },
}));

export default Selector;
