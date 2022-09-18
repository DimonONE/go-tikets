import {useTheme} from '@react-navigation/native';
import {StyleSheet} from "react-native";

const stylization = (styles) => {

    const handler = {
        get: (target, name) => {
            const theme = useTheme();
            return StyleSheet.create(target(theme))[name];
        }
    }

    if (typeof styles === 'object') {
        return new StyleSheet.create(styles)
    }

    return new Proxy(styles, handler)
}

export default stylization;