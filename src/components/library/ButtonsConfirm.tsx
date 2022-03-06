import React from "react";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";

type Props = {
    btnConfirmTxt: string,
    btnResetTxt: string,
    btnConfirmFunc: () => void,
    btnResetFunc: () => void,
}

const btnStyle = {
    color: 'white',
    fontSize: '16px',
    fontWeight: '400',
    width: '60px',
    '&:hover': {
        fontSize: '24px',
    }
}

const ButtonsConfirm: React.FC<Props> = (props: Props) => {

    const {btnConfirmTxt, btnResetTxt, btnConfirmFunc, btnResetFunc} = props

    return <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }}>
        <Button sx={btnStyle}
                onClick={btnResetFunc}>
            {btnResetTxt}
        </Button>
        <Button sx={btnStyle}
                onClick={btnConfirmFunc}>
            {btnConfirmTxt}
        </Button>
    </Box>
}

export default ButtonsConfirm