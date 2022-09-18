 import React from 'react';
import {TouchableOpacity} from "react-native";
import stylization from "@Helpers/stylization";
import {SvgXml} from "react-native-svg";
import AppText from "@Components/AppText";

const Button = ({
  color = 'primary',
  variant = 'contained',
  size = 'large',
  styleContainer,
  styleText,
  onPress,
  startIcon,
  children
}) => {
    const variantStyleContainer = styles[`${variant}VariantContainer`];
    const colorStyleContainer = styles[`${color}ColorContainer`];
    const sizeStyleContainer = styles[`${size}SizeContainer`];

    const variantStyleText = styles[`${variant}VariantText`]

    return (
        <TouchableOpacity
            style={[styles.buttonContainer, colorStyleContainer, variantStyleContainer, sizeStyleContainer, styleContainer]}
            onPress={onPress}
        >
            {startIcon && <SvgXml style={{marginRight: 10}} xml={startIcon}/>}
            <AppText
                style={[
                    styles.buttonText,
                    variantStyleText,
                    styleText
                ]}
            >
                {children}
            </AppText>
        </TouchableOpacity>
    );
};

const styles = stylization(({colors}) => ({
    buttonText: {color: '#000', textTransform: 'uppercase', fontWeight: '800'},
    buttonContainer: {
        borderRadius: 16,
        marginBottom: 11,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    containedVariantContainer: {
        borderWidth: 0.1,
        borderBottomWidth: 2,
    },
    textVariantContainer: {
        backgroundColor: 'transparent',
        borderColor: 'transparent'
    },
    textVariantText: {
        color: colors.primary
    },
    primaryColorContainer: {
        backgroundColor: colors.primary,
        borderColor: '#E57D00',
    },
    whiteColorContainer: {
        backgroundColor: '#FFFFFF',
        borderColor: '#00000022',
    },
    largeSizeContainer: {
        height: 64,
    },
    mediumSizeContainer: {
        height: 50,
    },
    smallSizeContainer: {
        height: 32,
    }
}))

export default Button;