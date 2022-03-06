import {
    AppBar,
    Box,
    Button,
    Checkbox,
    InputAdornment,
    OutlinedInput,
    Toolbar, Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import React from "react";
import {GlowButton} from "../config/muiThemeStyles";

const logoImage: string = 'https://res.cloudinary.com/imagenbcsdr/image/upload/v1640627752/rentme/Logo_a0y8fd.png'

type Props = {
    authorized: boolean
}

const Header: React.FC<Props> = (props: Props) => {

    const {authorized} = props;

    const [openMenu, setOpenMenu] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOpenMenu(event.target.checked);
    };

    return <AppBar position="static">
            <Toolbar sx={{
                height: '80px',
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: 'primary'
            }}>
                <a href={'#'}>
                    <img src={logoImage} alt={'logo'}/>
                </a>
                {!authorized &&
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '1vw'
                        }}>
                        <Button color="inherit">
                            <Typography>My favorites</Typography>
                        </Button>
                        <Button color="inherit">
                            <Typography>Post your rental</Typography>
                        </Button>
                        <Button color="inherit">
                            <Typography>Sign in</Typography>
                        </Button>
                        <GlowButton>
                            <Typography>Sign up</Typography>
                        </GlowButton>
                    </Box>}

                {authorized &&
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'end',
                        alignItems: 'center',
                        gap: '1vw'
                    }}>
                        <Box sx={{
                            display: openMenu ? 'flex' : 'none',
                            alignItems: 'center',
                            gap: '1vw',
                        }}>
                            <Button color="inherit">
                                <Typography>My favorites</Typography>
                            </Button>
                            <Button color="inherit">
                                <Typography>Profile</Typography>
                            </Button>
                            <Button color="inherit">
                                <Typography>Sign out</Typography>
                            </Button>
                            <OutlinedInput style={{width: '250px', height: '40px'}}
                                           startAdornment={
                                               <InputAdornment position={"start"}>
                                                   <SearchIcon color={"primary"}/>
                                               </InputAdornment>
                                           }/>
                        </Box>
                        <Checkbox checked={openMenu}
                                  onChange={handleChange}
                                  icon={<MenuIcon color={"secondary"}/>}
                                  checkedIcon={<CloseIcon color={"secondary"}/>}/>
                    </Box>
                }
            </Toolbar>
        </AppBar>
}

export default Header;