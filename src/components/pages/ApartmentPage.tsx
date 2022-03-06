import React, {useState} from "react";
import Header from "../Header";
import Footer from "../Footer";
import {Box, Button, MenuItem, TextField, Typography} from "@mui/material";
import Modal from '@mui/material/Modal';
import Carousel, {SlideInterface} from "../library/Carousel";
import ApartInfoCard, {ApartmentInfo} from "../ApartInfoCard";
import {LocalizationProvider, StaticDatePicker} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ModalConfirm from "../library/ModalConfirm";

import { useJsApiLoader } from '@react-google-maps/api'; //google maps
import { Map, MODES } from '../Map';// import from map

const API_KEY = process.env.REACT_APP_API_KEY //Ключ для карт (Строго секретный)!!

const defaultCenter = {      // точка респауна по дефолту на карте. Это Тель-Авив. 32.05663743129685, 34.7773529634229
    lat: 32.05663743129685,
    lng: 34.7773529634229
};


const placeFirstImg = 'https://res.cloudinary.com/imagenbcsdr/image/upload/v1643377937/rentme/deborah-cortelazzi-gREquCUXQLI-unsplash_2x_kggtro.png';
const placeSecondImg = 'https://res.cloudinary.com/imagenbcsdr/image/upload/v1643377967/rentme/jarek-ceborski-jn-1_2x_q9wxtd.png';
const placeThirdImg = 'https://res.cloudinary.com/imagenbcsdr/image/upload/v1643378042/rentme/timothy-buck-psrloDbaZc-1_2x_mqhfnp.png';
const placeFourthImg = 'https://res.cloudinary.com/imagenbcsdr/image/upload/v1643378012/rentme/kara-eads-L-1_ifrvv3.png';

const responsiveCarousel = {
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 3,
        slidesToSlide: 1
    }
}

// type Props = {
//     apartSlides: SlideInterface[],
//     apartInfo: ApartmentInfo,
//     apartDesc: string[],
// }

type Props = {
    ownerMode: boolean
}

const ApartmentPage: React.FC<Props> = (props: Props) => {


    const [center, setCenter] = useState(defaultCenter); // state for defaultCenter
    const [mode, setMode] = useState(MODES.MOVE);
    const [markers, setMarkers] = useState<string[]>([]);// установка маркеров.

    const { isLoaded } = useJsApiLoader({ // options for loading map
        id: 'google-map-script',
        googleMapsApiKey: API_KEY!,
        libraries: ['places'],
    });

    const onPlaceSelect = React.useCallback( // for Autocomplete
        (coordinates) => {
            setCenter(coordinates)
        },[],
    )

    const onMarkerAdd = React.useCallback(         // marker on map
        (coordinates) => {
            setMarkers([...markers, coordinates]);
        },[markers],
    )

    const toggleMode = React.useCallback(() => { // for button markers
        switch(mode){
            case MODES.MOVE:
                setMode(MODES.SET_MARKER);
                break;
            case  MODES.SET_MARKER:
                setMode(MODES.MOVE);
                break;
            default:
                setMode(MODES.MOVE);
        }
        console.log(mode);
    }, [mode])



    // const {apartSlides, apartInfo, apartDesc} = props
    const {ownerMode} = props

    const [currentImg, setCurrentImg] = useState<string>();
    const [date, setDate] = React.useState<Date | null>(null);

    const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
    const handleCloseConfirm = () => setOpenModalConfirm(false);

    const [openModalImg, setOpenModalImg] = useState(false);
    const handleCloseImg = () => setOpenModalImg(false);

    const apartmentSlides: SlideInterface[] = [
        {img: placeFirstImg},
        {img: placeSecondImg},
        {img: placeThirdImg},
        {img: placeFourthImg},
    ]

    const apartmentInfo: ApartmentInfo = {
        owner: 'Emily Johnson',
        shareLink: 'rentme.com/thehousewithaclock',
        available: 'from 22 June 2019',
        minDuration: '1 month',
        sizeSqM: 48,
        securityDep: '3 m',
        floor: '2nd',
        elevator: 'Yes',
        beds: '2',
        cancelTime: '3 months'
    }

    const apartmentDesc: string[] = [
        `A fully equipped tranquilo house in the heart of Tel Aviv, within a few minutes walk from the beach and the 
        vibrant nightlife of the city. Includes a large balcony to relax, feel the sea breeze and enjoy your company 
        while leaving your troubles.`,
        `Best location in the city - Between Dizzengof and the beach - Within walking distance from restaurants, 
        supermarkets - Washing machine - free WiFi - Host comfortably 4 guests.`
    ]

    function getDescTypographies(desc: string[]): JSX.Element[] {
        return desc.reduce((res: JSX.Element[], item, index) => {
            res.push(getDescTypography(item, index))
            return res
        }, [])
    }

    function getDescTypography(desc: string, index: number): JSX.Element {
        return <Typography variant={'h5'}
                           color={'primary'}
                           mb={'10px'}
                           key={index}>
            {desc}
        </Typography>
    }

    return <React.Fragment>
        <Header authorized={true}/>

        <Box sx={{
            padding: '60px 33px',
            position: 'relative'
        }}>
            <Typography variant={'h2'}
                        color={'primary'}
                        mb={'60px'}>
                Clean and cozy place in Tel Aviv
            </Typography>

            <Carousel slidesImgLabel={apartmentSlides} widthSlideVw={30} heightSlideVw={25}
                      responsive={responsiveCarousel}
                      onClickSlide={(img) => {
                          setCurrentImg(img)
                          setOpenModalImg(true)
                      }}/>

            <Modal open={openModalImg}
                   onClose={handleCloseImg}>
                <Box sx={{
                    maxWidth: '95vw',
                    maxHeight: '95vh',
                    borderRadius: '5px',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '2',
                    '&:focus-visible': {
                        outline: 'none'
                    }
                }}>
                    <img src={currentImg} alt={'place'} width={'100%'}/>
                </Box>
            </Modal>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Box>
                    <ApartInfoCard apartInfo={apartmentInfo} editMode={ownerMode}/>

                    <Typography variant={'h2'}
                                color={'primary'}
                                marginY={'60px'}>
                        Apartment description
                    </Typography>
                </Box>

                <Box sx={{
                    width: '325px',
                    height: ownerMode ? '340px' : '410px',
                    paddingY: '20px',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>

                    {ownerMode &&
                        <Typography color={'primary'} fontSize={'30px'}>
                            Schedule a tour
                        </Typography>
                    }

                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}>
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            value={date}
                            renderInput={(params) => <TextField {...params} />}
                            onChange={(newValue) => setDate(newValue)}
                        />
                    </LocalizationProvider>

                    {!ownerMode &&
                        <Box sx={{
                            height: '100px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <TextField select
                                       variant="standard"
                                       defaultValue={'Morning 8-11 Am'}
                                       sx={{
                                           width: '200px',
                                           textAlign: 'center',
                                       }}>
                                <MenuItem value={'Morning 8-11 Am'}>Morning 8-11 Am</MenuItem>
                                <MenuItem value={'Afternoon 12-17 Pm'}>Afternoon 12-17 Pm</MenuItem>
                                <MenuItem value={'Evening 18-21 Pm'}>Evening 18-21 Pm</MenuItem>
                            </TextField>

                            <Button
                                sx={{
                                    border: '1px solid',
                                    borderColor: 'primary.main',
                                    minWidth: '150px'
                                }}
                                onClick={() => setOpenModalConfirm(true)}>
                                <Typography>Request a tour</Typography>
                            </Button>
                        </Box>
                    }

                    <ModalConfirm open={openModalConfirm} handleClose={handleCloseConfirm} title={'Thank you!'}
                                  text={['Your contact has been sent successfully.',
                                      'The owner will contact you shortly.']}
                                  btnText={'Go to profile'} btnOnClick={handleCloseConfirm}/>
                </Box>

            </Box>

            {getDescTypographies(apartmentDesc)}

            <Box sx={{
                width: '1366px',
                height: '600px',
                margin: '60px auto 0'
            }}>
                {isLoaded ?
                    <Map center={center} mode={mode} markers={markers} onMarkerAdd={onMarkerAdd}/> :
                    <h1>Loading</h1>}
            </Box>

        </Box>

        <Footer/>
    </React.Fragment>
}

export default ApartmentPage;