import React, {useState} from 'react';
import {CheckboxGroup} from "@Components/UI";

const gendersMock = [
    {
        id: 1,
        value: 'men',
        label: 'Only for men',
        checked: false
    },
    {
        id: 2,
        value: 'women',
        label: 'Only for women',
        checked: false
    },
    {
        id: 3,
        value: 'all',
        label: 'For all',
        checked: false
    }
]

const Gender = () => {
    const [genders, setGenders] = useState(gendersMock);

    return (
        <CheckboxGroup items={genders} setItems={setGenders} rowCount={1} />
    );
};

export default Gender;