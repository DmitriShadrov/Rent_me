import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useState} from "react";
import ButtonsConfirm from "./ButtonsConfirm";

const valuesImg: string = 'https://res.cloudinary.com/imagenbcsdr/image/upload/v1644930467/rentme/prices_jd4w2y.png'

function valuetext(value: number) {
    return `${value}$`;
}

type Props = {
    currentValue: number[]
    onChangeValue: (value: number[]) => void
    minValue: number
    maxValue: number
}

export default function RangeSlider(props: Props) {
    const {onChangeValue, currentValue, minValue, maxValue} = props
    const [value, setValue] = useState<number[]>(currentValue);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const onClear = () => {
        onChangeValue([minValue, maxValue])
        setValue([minValue, maxValue])
    }

    const onDone = () => {
        onChangeValue(value)
    }

    return (
        <Box sx={{
            width: '300px',
            height: '240px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '40px 50px 20px 50px',
            backgroundColor: 'primary.main',
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <img src={valuesImg} alt={'values'} style={{width: '300px', height: '100px'}}/>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay={'on'}
                    getAriaValueText={valuetext}
                    min={minValue}
                    max={maxValue}
                    sx={{
                        color: 'white',
                        '& .MuiSlider-valueLabel': {
                            top: 60,
                            backgroundColor: 'unset',
                            fontWeight: '400',
                        },
                    }}
                />
            </Box>

            <ButtonsConfirm btnConfirmTxt={'Done'} btnResetTxt={'Clear'}
                            btnConfirmFunc={onDone} btnResetFunc={onClear}/>
        </Box>
    );
}
