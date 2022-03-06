import React from "react";
import {Box, Checkbox} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ApartShortDesc, {ApartmentShortDesc} from "./ApartShortDesc";

type Props = {
    img: string,
    shortDesc: ApartmentShortDesc,
    likeIcon: boolean
}

const ApartImgCard: React.FC<Props> = (props: Props) => {

    const {img, shortDesc, likeIcon} = props

    return <Box
            sx={{
                cursor: 'pointer',
                height: '300px',
                width: '500px',
                borderRadius: '5px',
                background: `url(${img}) no-repeat center center / cover`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'end',
                marginRight: '35px',
                marginBottom: '30px',
                position: 'relative',
                '&:hover, &:active': {
                    height: '310px',
                    width: '510px',
                    marginRight: '25px',
                    marginBottom: '20px',
                }
            }}>
            {likeIcon &&
                <Checkbox icon={<FavoriteBorderIcon color={"secondary"}/>}
                          checkedIcon={<FavoriteIcon color={"secondary"}/>}
                          sx={{
                              position: 'absolute',
                              top: '16px',
                              right: '16px',
                          }}
                />
            }
            <ApartShortDesc shortDesc={shortDesc}/>
        </Box>
}
export default ApartImgCard;