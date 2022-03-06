import React, {useState} from "react";
import {Box} from "@mui/material";
import {NumberButton} from "../../config/muiThemeStyles";
import ButtonsConfirm from "./ButtonsConfirm";

export interface NumButtonsInterface {
    [num: string]: boolean
}

type Props = {
    currentValue: NumButtonsInterface
    onChangeValue: (value: NumButtonsInterface) => void
}

export default function NumButtonSelect(props: Props) {
    const {onChangeValue, currentValue} = props
    const [btnGroup, setBtnGroup] = useState<NumButtonsInterface>(currentValue)

    function getNumButtons(buttons: NumButtonsInterface): JSX.Element[] {
        return Object.keys(buttons).reduce((res: JSX.Element[], item, index) => {
            res.push(getNumButton(item, buttons[item], index))
            return res
        }, [])
    }

    function getNumButton(num: string, state: boolean, index: number) {
        return <NumberButton key={index}
                             sx={{
                                 backgroundColor: state ? 'secondary.dark' : 'secondary.main',
                                 color: state ? 'secondary.main' : 'primary.main'
                             }}
                             onClick={() => {
                                 btnGroup[num] = !state
                                 setBtnGroup({...btnGroup})
                             }}
        >
            {num}
        </NumberButton>;
    }

    function clearStates(): NumButtonsInterface {
        const falseStates: NumButtonsInterface = btnGroup;
        Object.keys(btnGroup).forEach((value) => {
            falseStates[value] = false;
        })
        return falseStates;
    }

    return <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '40px 35px 20px 35px',
            backgroundColor: 'primary.main',
        }}>
        <Box sx={{display: 'flex', gap: '20px', mb: '40px'}}>
            {getNumButtons(btnGroup)}
        </Box>

        <ButtonsConfirm btnConfirmTxt={'Done'} btnResetTxt={'Clear'}
                        btnConfirmFunc={() => onChangeValue(btnGroup)}
                        btnResetFunc={() => {
                            onChangeValue(clearStates())
                            setBtnGroup(clearStates())
                        }}/>
    </Box>
}
