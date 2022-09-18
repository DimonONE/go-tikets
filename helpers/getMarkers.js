import dayjs from "dayjs";


const styleRange = {
    borderRadius: 10,
    backgroundColor: '#FF9100',
}

const getMarkers = ({start, end, onHold, currentDate}) => {
    const dateDefault = {
        [currentDate]: {
            marked: true,
            type: 'custom',
        }
    }

    if (!start) {
        return dateDefault;
    }

    if (onHold) {
        return {...dateDefault, [start]: { color: "#FFDBAA", startingDay: true, customContainerStyle: styleRange }}
    }

    if (!end) {
        return {...dateDefault, [start]: { selected: true, type: 'custom', customContainerStyle: {
                    borderRadius: 10,
                    backgroundColor: "#FF9100"
                },
                customTextStyle: { color: "#000" }}}
    }

    let dateRange = {...dateDefault,
        [start]: {color: "#FF9100", startingDay: true,  customContainerStyle: styleRange},
        [end]: {color: "#FF9100", endingDay: true, customContainerStyle: styleRange}
    };

    let startDate = dayjs(start).startOf('day').add(1, 'days');
    const endDate = dayjs(end).startOf('day');
    while (endDate.isAfter(startDate)) {
        Object.assign(dateRange, { [startDate.format('YYYY-MM-DD')]: { selected: true, color: '#F6F6F6', customTextStyle: { color: "#000" } } });
        startDate = startDate.add(1, 'days');
    }

    return dateRange;
}

export default getMarkers;