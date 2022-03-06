import React, {useState} from "react";
import {Box, Typography} from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';

export interface ApartmentShortDesc {
    desc: string,
    sq: number,
    bdr: number,
    bath: number,
    price: number
}

type Props = {
    shortDesc: ApartmentShortDesc
    lightColor?: boolean
}

const ApartShortDesc: React.FC<Props> = (props: Props) => {

    const {shortDesc, lightColor} = props
    const {desc, sq, bdr, bath, price} = shortDesc

    const [bgColor, setBgColor] = useState<string>(lightColor ? 'secondary.main' : 'primary.main');
    const [txtColor, setTxtColor] = useState<string>(lightColor ? 'primary.main' : 'secondary.main');

    return <Box
        onMouseEnter={() => {
            if (lightColor) {
                setBgColor('primary.main')
                setTxtColor('secondary.main')
            }
        }}
        onMouseLeave={() => {
            if (lightColor) {
                setBgColor('secondary.main')
                setTxtColor('primary.main')
            }
        }}
        sx={{
            backgroundColor: bgColor,
            height: '80px',
            borderRadius: '5px',
            border: '1px solid',
            borderColor: 'primary.main',
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
        }}>
        <Typography sx={{width: '50%', color: txtColor}}>
            {desc}
        </Typography>
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                color: txtColor
            }}>
            <HomeOutlinedIcon fontSize={"small"}/>
            <HotelOutlinedIcon fontSize={"small"}/>
            <BathtubOutlinedIcon fontSize={"small"}/>
        </Box>
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around'
            }}>
            <Typography sx={{color: txtColor}}>
                {sq} m<sup>2</sup>
            </Typography>
            <Typography sx={{color: txtColor}}>
                {bdr} bdr
            </Typography>
            <Typography sx={{color: txtColor}}>
                {bath} bath
            </Typography>
        </Box>
        <Typography sx={{color: txtColor}}>
            ₪ {price}
        </Typography>
    </Box>
}
export default ApartShortDesc;