import React, {useEffect, useState} from "react";
import CheckboxGroup from "@Components/UI/CheckboxGroup";

export const TicketsOfEvent = ({value, onChange}) => {
    const [checkBoxes, setCheckBoxes] = useState(
        [
            {
                id: 1,
                value: 'Music',
                checked: false,
            },
            {
                id: 2,
                value: 'Concert',
                checked: false,
            },
            {
                id: 3,
                value: 'Dance',
                checked: false,
            },
            {
                id: 4,
                value: 'Education',
                checked: false,
            },
            {
                id: 5,
                value: 'Conference',
                checked: false,
            },
            {
                id: 6,
                value: 'Workshop',
                checked: false,
            },
            {
                id: 7,
                value: 'Festival',
                checked: false,
            },
            {
                id: 8,
                value: 'DJ-set',
                checked: false,
            },
            {
                id: 9,
                value: 'Аrt',
                checked: false,
            },
            {
                id: 10,
                value: 'Theater',
                checked: false,
            },
            {
                id: 11,
                value: 'Cinema',
                checked: false,
            },
            {
                id: 12,
                value: 'Exhibition',
                checked: false,
            },
        ].map((item) =>
            value.includes(item.value) ? {...item, checked: true} : item
        )
    );

    useEffect(() => {
        if (onChange) {
            onChange(
                checkBoxes
                    .filter((item) => item.checked)
                    .map((item) => item.value)
                    .join(', ')
            );
        }
    }, [checkBoxes]);

    return (
        <CheckboxGroup items={checkBoxes} rowCount={3} setItems={setCheckBoxes}/>
    );
};