import React from "react";
import Header from "../Header";
import {Box, Typography} from "@mui/material";
import PersonCard from "../library/PersonCard";
import ApartImgCard from "../ApartImgCard";
import Footer from "../Footer";
import ApartShortDesc, {ApartmentShortDesc} from "../ApartShortDesc";

interface UserInfo {
    photo: string,
    name: string,
    phone: string,
    email: string,
    favorites: [],
    history: []
}

type Props = {
    user: UserInfo
}

const titleStyle = {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '30px',
}

const ProfileUser: React.FC = () => {

    const photo: string = 'https://res.cloudinary.com/imagenbcsdr/image/upload/v1645361731/rentme/ive-got-a-tremendous-idea-on-my-mind_y0g0gt.png'
    const name: string = 'Piter Jackson'
    const phone: string = '+972 525 87 43 47'
    const email: string = 'p.jackson@gmail.com'

    const apartmentImg: string = 'https://res.cloudinary.com/imagenbcsdr/image/upload/v1644923912/rentme/ralph-kayden-3_u7iaej.png'
    const apartShortDesc: ApartmentShortDesc = {
        desc: 'Executive House in a Prestigious Area',
        sq: 245,
        bdr: 5,
        bath: 2,
        price: 3000
    }

    return <React.Fragment>
        <Header authorized={true}/>
        <Box sx={{
            padding: '60px 33px 20px 33px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '33px'
        }}>
            <Box sx={{marginTop: '66px'}}>
                <PersonCard photo={photo} name={name} phone={phone} email={email}
                            btnTxt={'Edit profile'} btnOnClick={() => console.log('click')}/>
            </Box>
            <Box sx={{minWidth: '36%'}}>
                <Typography color={'primary'} sx={titleStyle}>
                    Your favorites
                </Typography>
                <Box>
                    <ApartImgCard img={apartmentImg} shortDesc={apartShortDesc} likeIcon={false}/>
                    <ApartImgCard img={apartmentImg} shortDesc={apartShortDesc} likeIcon={false}/>
                </Box>
            </Box>
            <Box>
                <Typography color={'primary'} sx={titleStyle}>
                    History
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}>
                    <ApartShortDesc shortDesc={apartShortDesc} lightColor={true}/>
                    <ApartShortDesc shortDesc={apartShortDesc} lightColor={true}/>
                    <ApartShortDesc shortDesc={apartShortDesc} lightColor={true}/>
                    <ApartShortDesc shortDesc={apartShortDesc} lightColor={true}/>
                    <ApartShortDesc shortDesc={apartShortDesc} lightColor={true}/>
                    <ApartShortDesc shortDesc={apartShortDesc} lightColor={true}/>
                </Box>
            </Box>
        </Box>


        <Footer/>
    </React.Fragment>
}

export default ProfileUser