import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import {Box, Typography} from "@mui/material";
import PersonCard from "../library/PersonCard";
import ApartImgCard from "../ApartImgCard";//ApartImgCard
import {ApartmentShortDesc} from "../ApartShortDesc";//ApartShortDesc

interface OwnerInfo {
    photo: string,
    name: string,
    about: string,
    announcements: []
}

type Props = {
    owner: OwnerInfo
}

const titleStyle = {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '30px',
}

// const ProfileOwner: React.FC<Props> = (props: Props) => {
const ProfileOwner: React.FC = () => {

    // const {owner} = props

    const photo: string = 'https://res.cloudinary.com/imagenbcsdr/image/upload/v1645278485/rentme/keep-calm-and-carry-on_rmejv9.png'
    const name: string = 'Emily Johnson'
    const about: string = `I take great pride to being able to listen, understand your priorities, and embrace your 
    needs like they are my own. Protecting your interest and helping you achieve your goal in this challenging and 
    competitive marketplace is my ultimate desire. You will find that I am incredibly responsive, totally prepared, 
    and a few steps ahead of the complexities and issues that may arise within our transaction. My business 
    relationships and good rapport will also help us in navigating our way through smoothly and flawlessly.`

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
            <Box mt={'66px'}>
                <PersonCard photo={photo} name={name} btnTxt={'Contact owner'}
                            btnOnClick={() => console.log('click')}/>
            </Box>
            <Box>
                <Typography color={'primary'} sx={titleStyle} >About {name}</Typography>
                <Typography color={'primary'} fontSize={'18px'}>{about}</Typography>
            </Box>
            <Box sx={{minWidth: '36%'}}>
                <Typography color={'primary'} sx={titleStyle}>
                    {name}'s announcements
                </Typography>
                <Box>
                    <ApartImgCard img={apartmentImg} shortDesc={apartShortDesc} likeIcon={true}/>
                    <ApartImgCard img={apartmentImg} shortDesc={apartShortDesc} likeIcon={true}/>
                </Box>
            </Box>
        </Box>

        <Footer/>
    </React.Fragment>
}

export default ProfileOwner;