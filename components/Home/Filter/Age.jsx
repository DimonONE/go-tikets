import React, {useState} from 'react';
import {CheckboxGroup} from "@Components/UI";

const agesMock = [
    {
        id: 1,
        value: 'all',
        label: 'For all',
        checked: false,
    },
    {
        id: 2,
        value: '0-12',
        label: 'For kids (0-12)',
        checked: false,
    },
    {
        id: 3,
        value: '13-18',
        label: 'For teens (13-18)',
        checked: false,
    },
    {
        id: 4,
        value: '18-35',
        label: 'Young people (18-35)',
        checked: false,
    },
    {
        id: 5,
        value: '35-99',
        label: 'Aduls',
        checked: false,
    }
]

const Age = () => {
    const [ages, setAges] = useState(agesMock);

    return (
        <CheckboxGroup items={ages} setItems={setAges} rowCount={1} />
    );
};

export default Age;