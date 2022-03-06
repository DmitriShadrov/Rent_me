import React from 'react';
import './App.css';
import Main from "./components/pages/Main";
import ApartmentPage from "./components/pages/ApartmentPage";
import ProfileOwner from './components/pages/ProfileOwner';
import ProfileUser from "./components/pages/ProfileUser";
import {ThemeProvider} from "@mui/material";
import {theme} from "./config/muiThemeStyles";



function App() {
    return (<ThemeProvider theme={theme}>
        <Main/>
        <ApartmentPage ownerMode={false}/>
        <ApartmentPage ownerMode={true}/>
        <ProfileOwner/>
        <ProfileUser/>
    </ThemeProvider>);

}

export default App;
