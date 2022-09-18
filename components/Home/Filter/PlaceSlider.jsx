// Place
import {StyleSheet, View} from "react-native";
import AppText from "@Components/AppText";
import SliderContainer from "@Components/UI/SliderContainer";
import {Slider} from "@miblanchard/react-native-slider";
import React from "react";

const PlaceSlider = ({value, onChange}) => {
    return (
        <View>
            <AppText style={styles.placeText}>
                show places near you at a distance, km
            </AppText>
            <AppText style={[styles.placeText, { marginBottom: 20 }]}>min —100m, max — 400m</AppText>
            <SliderContainer trackMarks={[100, 200, 300, 400]} sliderValue={value}>
                <Slider
                    animateTransitions
                    maximumTrackTintColor='#DCDCDC'
                    maximumValue={400}
                    minimumTrackTintColor='#FF9100'
                    minimumValue={100}
                    step={2}
                    thumbTintColor='#FF9100'
                    value={[value]}
                    onSlidingComplete={(date) => onChange(date[0])}
                />
            </SliderContainer>
        </View>
    );
};


const styles = StyleSheet.create({
    placeText: {
        color: '#BDBDBD',
        fontSize: 14,
    },
});

export default PlaceSlider;