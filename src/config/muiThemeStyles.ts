import {createTheme, styled} from '@mui/material/styles';
import {Button, ButtonProps, MenuItem, MenuItemProps} from "@mui/material";

export const theme = createTheme({
    palette: {
        text: {
            primary: '#0f4c81',
        },
        primary: {
            main: '#0f4c81',
            dark: '#053b65',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#ffffff',
            light: '#9d9d9d',
            dark: '#7B7A78',
            contrastText: '#0f4c81'
        },
    },
    typography: {
        fontFamily: 'Montserrat',
        h6: {
            fontWeight: 400
        },
        h2: {
            fontWeight: 500
        },
    },
});


export const GlowButton = styled(Button)<ButtonProps>(({theme}) => ({
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    width: '150px',
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        boxShadow: `0 0 12px ${theme.palette.secondary.main}`,
    },
}))

export const ChangeColorButton = styled(Button)<ButtonProps>(({theme}) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    width: '150px',
    '&:hover': {
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,
    },
}))

export const NumberButton = styled(Button)<ButtonProps>(({theme}) => ({
    minWidth: '50px',
    height: '50px',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontWeight: '900',
    fontSize: '20px',
    '&:hover': {
        backgroundColor: theme.palette.secondary.light,
    },
}))

export const MenuItemCityPrimary = styled(MenuItem)<MenuItemProps>(({theme}) => ({
    color: theme.palette.primary.contrastText,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
    '&.MuiButtonBase-root.MuiMenuItem-root': {
        backgroundColor: theme.palette.primary.main,
    },
    '&.MuiButtonBase-root.MuiMenuItem-root:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
    '&.MuiButtonBase-root.MuiMenuItem-root.Mui-selected': {
        backgroundColor: theme.palette.primary.dark,
    },
    '&.MuiButtonBase-root.MuiMenuItem-root.Mui-selected:hover': {
        backgroundColor: theme.palette.primary.dark,
    }
}))
