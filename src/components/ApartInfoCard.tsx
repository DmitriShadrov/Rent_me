import React, {useState} from "react";
import {Box, Checkbox, Divider, IconButton, Typography} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FavoriteIcon from "@mui/icons-material/Favorite";
import {GlowButton} from "../config/muiThemeStyles";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export interface ApartmentInfo {
    owner: string
    shareLink: string
    available: string
    minDuration: string
    sizeSqM: number
    securityDep: string
    floor: string
    elevator: 'Yes' | 'No'
    beds: string
    cancelTime: string
}

type Props = {
    apartInfo: ApartmentInfo
    editMode: boolean
}


const ApartInfoCard: React.FC<Props> = (props: Props) => {
    const {apartInfo, editMode} = props
    const {
        owner,
        shareLink,
        available,
        minDuration,
        sizeSqM,
        securityDep,
        floor,
        elevator,
        beds,
        cancelTime
    } = apartInfo
    const [showLink, setShowLink] = useState<boolean>(false)

    const btnText: string = editMode ? 'Edit info' : 'Apply now'


    return <Box sx={{
        width: '840px',
        height: '220px',
        backgroundColor: 'primary.main',
        padding: '40px 30px'
    }}>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative'
        }}>
            <Box sx={{
                display: 'flex',
                gap: '30px'
            }}>
                <Typography color={'primary.contrastText'}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                    <PersonOutlineIcon/> {owner}
                </Typography>
                <Typography color={'primary.contrastText'}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                            onClick={() => setShowLink(!showLink)}>
                    <ShareOutlinedIcon/> Share
                </Typography>
                <Typography color={'primary.contrastText'}
                            sx={{
                                display: showLink ? 'block' : 'none',
                                position: 'absolute',
                                top: '40px',
                                left: '217px'
                            }}>
                    {shareLink}
                    <IconButton color={"secondary"} sx={{margin: '0 0 8px 4px'}}
                                onClick={() => navigator.clipboard.writeText(shareLink)}>
                        <ContentCopyIcon fontSize={"small"}/>
                    </IconButton>
                </Typography>
                <Checkbox icon={<FavoriteBorderIcon color={"secondary"}/>}
                          checkedIcon={<FavoriteIcon color={"secondary"}/>}/>
            </Box>

            <GlowButton sx={{width: '150px'}}>
                <Typography>{btnText}</Typography>
            </GlowButton>
        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '40px'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '13px'
            }}>
                <Typography color={"secondary"}>Available</Typography>
                <Typography color={"secondary"}>Minimum duration of stay</Typography>
                <Typography color={"secondary"}>Size</Typography>
                <Typography color={"secondary"}>Security deposit</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '13px'
            }}>
                <Typography color={"secondary"}>{available}</Typography>
                <Typography color={"secondary"}>{minDuration}</Typography>
                <Typography color={"secondary"}>{sizeSqM} m<sup>2</sup></Typography>
                <Typography color={"secondary"}>{securityDep}</Typography>
            </Box>
            <Divider orientation="vertical" flexItem
                     sx={{
                         borderWidth: '1px',
                         backgroundColor: 'secondary.main'
                     }}
            />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '13px'
            }}>
                <Typography color={"secondary"}>Floor</Typography>
                <Typography color={"secondary"}>Elevator</Typography>
                <Typography color={"secondary"}>Beds</Typography>
                <Typography color={"secondary"}>Cancellation time</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '13px'
            }}>
                <Typography color={"secondary"}>{floor}</Typography>
                <Typography color={"secondary"}>{elevator}</Typography>
                <Typography color={"secondary"}>{beds}</Typography>
                <Typography color={"secondary"}>{cancelTime}</Typography>
            </Box>
        </Box>
    </Box>
}

export default ApartInfoCard