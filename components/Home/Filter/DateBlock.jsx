import React, {useEffect, useState} from "react";
import getTimeForCalendar from "@Helpers/getTimeForCalendar";
import dayjs from "dayjs";
import {StyleSheet, View} from "react-native";
import {CheckBox} from "@Components/UI";
import AppText from "@Components/AppText";
import Selector from "@Components/UI/Selector";
import Calendar from "@Components/UI/Calendar";

const selectorDate = [
    'All',
    'Tomorrow',
    'Month'
]

export const DateBlock = ({value: {dateType, date}, onChangeDateType, onChangeDate}) => {
    const [isOfTheEvent, setOfTheEvent] = useState(dateType.includes('start'));
    const [isOfAdding, setOfAdding] = useState(dateType.includes('creation'));
    const currentDate = getTimeForCalendar();
    const [selectedDate, setSelectedDate] = useState(date || currentDate);
    const [selectorDateValue, setSelectorDateValue] = useState(date.start ? null : selectorDate[0]);

    const ofTheEvent = () => {
        setOfTheEvent((prev) => !prev);
    };

    const ofAdding = () => {
        setOfAdding((prev) => !prev);
    };

    useEffect(() => {
        onChangeDate(selectedDate)
    }, [selectedDate]);

    useEffect(() => {
        onChangeDateType(isOfTheEvent ? 'start, ' : '' + isOfAdding ? 'creation' : '')
    }, [isOfTheEvent, isOfAdding]);

    const setSelectorDate = (value) => {
        switch (value) {
            case 'All':
                setSelectedDate(null);
                break;
            case 'Tomorrow':
                setSelectedDate({start: dayjs(currentDate).add(1, 'days').format('YYYY-MM-DD')})
                break;
            case 'Month':
                setSelectedDate({start: currentDate, end: dayjs(currentDate).add(30, 'days').format('YYYY-MM-DD')})
                break;
        }
        setSelectorDateValue(value);
    }


    return (
        <View>
            <View style={{flexDirection: 'row', marginBottom: 28}}>
                <View style={[styles.checkBoxContainer]}>
                    <CheckBox
                        onClick={ofTheEvent}
                        isChecked={isOfTheEvent}
                    />
                    <AppText style={{fontSize: 12, color: '#828282', marginLeft: 5}}>
                        of the event
                    </AppText>
                </View>
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        onClick={ofAdding}
                        isChecked={isOfAdding}
                    />
                    <AppText style={{fontSize: 12, color: '#828282', marginLeft: 5}}>
                        of adding
                    </AppText>
                </View>
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Selector
                    selectors={selectorDate}
                    selectValue={selectorDateValue}
                    onChange={setSelectorDate}
                    size={'large'}
                    fullWidth
                    styleButton={styles.selectorDateButton}
                />
            </View>
            <Calendar
                minDate={isOfTheEvent && !isOfAdding ? currentDate : undefined}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                currentDate={currentDate}
                onDayPress={() => setSelectorDateValue('')}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    checkBoxContainer: {
        width: '23.3%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 22,
        marginRight: 30,
    },
    selectorDateButton: {
        paddingHorizontal: 34,
    },
});