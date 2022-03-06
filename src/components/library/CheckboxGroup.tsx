import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import {Box} from "@mui/material";
import {useState} from "react";
import ButtonsConfirm from "./ButtonsConfirm";

export interface CheckboxInterface {
    [propName: string]: boolean
}

type Props = {
    currentValue: CheckboxInterface
    onChangeValue: (value: CheckboxInterface) => void
}

export default function CheckboxGroup(props: Props) {
    const {onChangeValue, currentValue} = props
    const [state, setState] = useState<CheckboxInterface>(currentValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const onClear = () => {
        onChangeValue(clearStates())
        setState(clearStates())
    }

    const onDone = () => {
        onChangeValue(state)
    }

    function clearStates(): CheckboxInterface {
        const falseStates: CheckboxInterface = currentValue;
        Object.keys(currentValue).forEach((value) => {
            falseStates[value] = false;
        })
        return falseStates;
    }

    function getCheckboxGroup(values: CheckboxInterface): JSX.Element[] {
        return Object.keys(values).reduce((res: JSX.Element[], item, index) => {
            res.push(getCheckbox(item, values[item], index))
            return res
        }, [])
    }

    function getCheckbox(name: string, state: boolean, index: number): JSX.Element {
        return <FormControlLabel key={index} control={
            <Checkbox checked={state} onChange={handleChange} name={name}
                      icon={<CircleOutlinedIcon fontSize={"small"} color={'secondary'}/>}
                      checkedIcon={<CheckCircleOutlineIcon fontSize={"small"} color={'secondary'}/>}
                      sx={{
                          '&.MuiCheckbox-root': {
                              padding: '3px 10px'
                          }
                      }}
            />
        } label={name}/>
    }

    return <React.Fragment>
        <Box sx={{
            "&::after": {
                position: "absolute",
                content: '""',
                top: '-20px',
                left: 0,
                border: '10px solid transparent',
                borderBottom: '10px solid green',
            }
        }}/>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '40px 30px 20px 30px',
            backgroundColor: 'primary.main',
            color: 'secondary.main',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingX: '35px',
                mb: '20px'
            }}>
                {getCheckboxGroup(state)}
            </Box>

            <ButtonsConfirm btnConfirmTxt={'Done'} btnResetTxt={'Clear'}
                            btnConfirmFunc={onDone} btnResetFunc={onClear}/>
        </Box>
    </React.Fragment>
}