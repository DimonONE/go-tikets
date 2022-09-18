import React from "react";
import {StyleSheet, View} from "react-native";
import AppText from "@Components/AppText";
import {Slider} from "@miblanchard/react-native-slider";
import stylization from "@Helpers/stylization";


const thumbnailWidth = 30;
const renderAboveThumbComponent = (value) => () => {
    return <View style={styleThumb.container}><AppText style={styleThumb.text}>{value}</AppText></View>;
};

const styleThumb = stylization({
    container: {
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: '#FF9100',
        height: 30,
        borderRadius: 8,
        justifyContent: 'center',
        left: -thumbnailWidth / 6,
        width: thumbnailWidth,
        top: -21,
        zIndex: 10
    },
    text: {
        color: '#FFF'
    },
})


const DEFAULT_VALUE = 100;
const borderWidth = 4;
const trackMarkStyles = StyleSheet.create({
    activeMark: {
        borderColor: '#999999',
        borderWidth,
        left: borderWidth,
        borderRadius: 5
    },
    inactiveMark: {
        borderColor: '#E57D00',
        borderWidth,
        left: borderWidth,
        borderRadius: 5
    },
});

const SliderContainer = (props) => {
    const { caption, sliderValue, trackMarks } = props;
    const [value, setValue] = React.useState(
        sliderValue ? sliderValue : DEFAULT_VALUE
    );
    let renderTrackMarkComponent;

    const currentValue = Array.isArray(value) ? value.join(' - ') : value;

    const getOpacityTrack = (tackValue) => {
        return (Math.abs(tackValue - currentValue) - 10) / 50
    }

    if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
        renderTrackMarkComponent = (index) => {
            const currentMarkValue = trackMarks[index];
            const currentSliderValue =
                value || (Array.isArray(value) && value[0]) || 0;
            const style =
                currentMarkValue > Math.max(currentSliderValue)
                    ? trackMarkStyles.activeMark
                    : trackMarkStyles.inactiveMark;
            return (<><View style={style}/><AppText style={{ position: 'absolute', width: 100, bottom: 20, left: -2, opacity: getOpacityTrack(trackMarks[index]) }}>{trackMarks[index]}</AppText></>);
        };
    }

    const renderChildren = () => {
        return React.Children.map(props.children, (child) => {
            if (!!child && child.type === Slider) {
                return React.cloneElement(child, {
                    onValueChange: setValue,
                    renderTrackMarkComponent,
                    trackMarks,
                    value,
                    renderAboveThumbComponent: renderAboveThumbComponent(currentValue),
                });
            }

            return child;
        });
    };

    return (
        <View style={styles.sliderContainer}>
            <View style={styles.titleContainer}>
                <AppText>{caption}</AppText>
            </View>
            {renderChildren()}
        </View>
    );
};


const styles = StyleSheet.create({
    sliderContainer: {
        marginHorizontal: 10,
    },
});

export default SliderContainer;