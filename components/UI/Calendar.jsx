import React from 'react';
import {Vibration, View} from "react-native";
import AppText from "@Components/AppText";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import {useTheme} from "@react-navigation/native";
import getMarkers from "@Helpers/getMarkers";
import { Calendar as CalendarComponent } from 'react-native-calendars';

const Calendar = ({minDate, currentDate, selectedDate, setSelectedDate, onDayPress}) => {
    const { colors } = useTheme();

    return (
        <CalendarComponent
            minDate={minDate}
            monthFormat={'MMMM yyyy'}
            current={currentDate}
            markingType={'period'}
            markedDates={getMarkers({currentDate, ...selectedDate})}
            theme={{
                todayDotColor: colors.primary,
                arrowColor: colors.text,
                dotColor: colors.primary,
            }}
            disableAllTouchEventsForDisabledDays={true}
            renderHeader={(date) => {
                return (
                    <View>
                        <AppText>{dayjs(date).format('MMMM YYYY')}</AppText>
                    </View>
                );
            }}
            enableSwipeMonths={true}
            onDayPress={(day) => {
                if (selectedDate?.onHold) {
                    dayjs.extend(isSameOrAfter)
                    if (dayjs(selectedDate.start).isSameOrAfter(day.dateString)) {
                        return;
                    }
                    setSelectedDate({...selectedDate, end: day.dateString, onHold: false})
                } else {
                    setSelectedDate({start: day.dateString});
                }

                onDayPress();
            }}
            onDayLongPress={(day) => {
                setSelectedDate({start: day.dateString, onHold: true})
                Vibration.vibrate(100)
            }}
        />
    );
};

export default Calendar;