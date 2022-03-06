import React from "react";
import {Box, Button, Typography} from "@mui/material";

type Props = {
    photo: string,
    name: string,
    phone?: string,
    email?: string,
    btnTxt: string,
    btnOnClick: () => void
}

const PersonCard: React.FC<Props> = (props: Props) => {

    const {photo, name, phone, email, btnTxt, btnOnClick} = props;

    return <Box sx={{
        minHeight: '340px',
        minWidth: '340px',
        padding: '30px',
        borderRadius: '5px',
        border: `1px solid`,
        borderColor: 'primary.main',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    }}>
        <Box sx={{
            height: '200px',
            width: '200px',
            mb: '30px'
        }}>
            <img src={photo} alt={'photo'}/>
        </Box>
        <Typography variant={'h5'}
                    color={'primary'}
                    mb={'30px'}>
            {name}
        </Typography>
        {phone && <Typography color={'primary'} mb={email ? '10px' : '30px'}>{phone}</Typography>}
        {email && <Typography color={'primary'} mb={'30px'}>{email}</Typography>}
        <Button
            sx={{
                border: '1px solid',
                borderColor: 'primary.main',
                minWidth: '150px',
            }}
            onClick={btnOnClick}>
            <Typography color={'primary'}>
                {btnTxt}
            </Typography>
        </Button>
    </Box>
}

export default PersonCard;