import React from 'react';
import {Image} from "react-native";
import unchecked from "@Assets/unchecked.png";
import CheckBoxComponent from "react-native-check-box";
import {useTheme} from '@react-navigation/native';
import stylization from "@Helpers/stylization";

const CheckBox = (props) => {
    const {colors} = useTheme();
    return (
        <CheckBoxComponent
            checkedCheckBoxColor={colors.primary}
            checkBoxColor={colors.primary}
            unCheckedImage={<Image source={unchecked} style={styles.image}/>}
            {...props}
        />
    );
};

const styles = stylization({
    image: {
        width: 19,
        height: 19,
        marginRight: 3,
        marginLeft: 2,
        marginVertical: 3
    },
})

export default CheckBox;