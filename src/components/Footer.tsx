import React from "react";
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    Link,
    OutlinedInput,
    Typography
} from "@mui/material";

const twitterImage: string = 'https://res.cloudinary.com/imagenbcsdr/image/upload/v1641561030/rentme/twitter_zsjafe.png'
const facebookImage: string = 'https://res.cloudinary.com/imagenbcsdr/image/upload/v1641561072/rentme/facebook_1_gfjdfl.png'

const Footer: React.FC = () => {

    return <Box sx={{
                height: '210px',
                backgroundColor: 'primary.main',
                padding: '40px 33px',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '40%',
                    justifyContent: 'space-between',
                }}>
                <Typography variant={'h5'} color={'secondary'}>
                    Subscribe to our newsletter to receive exclusive information about us and our services
                </Typography>
                <FormControl sx={{width: '300px', height: '50px'}}>
                    <OutlinedInput
                        sx={{
                            padding: '0px',
                            marginInline: '0px',
                            height: '100%'
                        }}
                        placeholder={'Enter your email'}
                        endAdornment={<InputAdornment position="end">
                            <Button variant="text"
                                    sx={{
                                        borderRadius: '10px',
                                        marginInline: '0px'
                                    }}>
                                <Typography>Ok</Typography>
                            </Button>
                        </InputAdornment>}/>
                </FormControl>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'end'
                }}>
                <Link underline={'none'} href={'#'} color={'secondary'}>
                    <Typography variant={"h6"}>Customer portal</Typography>
                </Link>
                <Link underline={'none'} href={'#'} color={'secondary'}>
                    <Typography variant={"h6"}>Add a list</Typography>
                </Link>
                <Link underline={'none'} href={'#'} color={'secondary'}>
                    <Typography variant={"h6"}>Rental calculator</Typography>
                </Link>
                <Link underline={'none'} href={'#'} color={'secondary'}>
                    <Typography variant={"h6"}>Term of service</Typography>
                </Link>
                <Link underline={'none'} href={'#'} color={'secondary'}>
                    <Typography variant={"h6"}>Avoid scams</Typography>
                </Link>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'end'
                }}>
                <Link underline={'none'} href={'#'} color={'secondary'}>
                    <Typography variant={"h6"}>Contact</Typography>
                </Link>
                <Link underline={'none'} href={'#'} color={'secondary'}>
                    <Typography variant={"h6"}>FAQ</Typography>
                </Link>
                <Link underline={'none'} href={'#'} color={'secondary'}>
                    <Typography variant={"h6"}>Rent House</Typography>
                </Link>
                <Link underline={'none'} href={'#'} color={'secondary'}>
                    <Typography variant={"h6"}>Find place</Typography>
                </Link>
                <Link underline={'none'} href={'#'} color={'secondary'}>
                    <Typography variant={"h6"}>Company</Typography>
                </Link>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'end',
                }}>
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                    <IconButton sx={{marginRight: '15px'}}>
                        <img src={twitterImage} alt={'twitter'}/>
                    </IconButton>
                    <IconButton>
                        <img src={facebookImage} alt={'facebook'}/>
                    </IconButton>
                </Box>
                <Typography variant={"subtitle1"} color={'secondary'}>2022, Rent Me LTD</Typography>
            </Box>
        </Box>
}

export default Footer;