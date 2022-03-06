import React, {useEffect, useRef, useState} from "react";
import Header from "../Header";
import {
    Box,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import RangeSlider from "../library/RangeSlider";
import {
    cities,
    maxPrice,
    minPrice,
} from "../../config/constants";
// import Footer from "../Footer";
import Carousel, {SlideInterface} from "../library/Carousel";
import CheckboxGroup, {CheckboxInterface} from "../library/CheckboxGroup";
import DateRangePicker, {DateRange} from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ApartImgCard from "../ApartImgCard";
import {ApartmentShortDesc} from "../ApartShortDesc";
import {ChangeColorButton, MenuItemCityPrimary} from "../../config/muiThemeStyles";
import NumButtonSelect, {NumButtonsInterface} from "../library/NumButtonSelect";
// import axios from "axios";


import { useJsApiLoader } from '@react-google-maps/api'; //google maps
import { Map, MODES } from '../Map';// import from map
import { Autocomplete } from "../Autocomplete/Autocomplete";// import Autocomplete

const API_KEY = process.env.REACT_APP_API_KEY //Ключ для карт (Строго секретный)!!

const defaultCenter = {      // точка респауна по дефолту на карте. Это Тель-Авив. 32.05663743129685, 34.7773529634229
    lat: 32.05663743129685,
    lng: 34.7773529634229
};


const mainImg: string = 'https://res.cloudinary.com/imagenbcsdr/image/upload/v1640430264/rentme/neonbrand-mGZX2MOPR-s-unsplash_j7btsa.png';

const newYorkImg: string = 'https://res.cloudinary.com/imagenbcsdr/image/upload/v1640716219/rentme/nyc_eeleim.png';
const romeImg: string = 'https://res.cloudinary.com/imagenbcsdr/image/upload/v1640716241/rentme/rome_ls6fja.png';
const telAvivImg: string = 'https://res.cloudinary.com/imagenbcsdr/image/upload/v1640716254/rentme/tel_aviv_prgupl.png';
const sanFranciscoImg: string = 'https://res.cloudinary.com/imagenbcsdr/image/upload/v1640716247/rentme/san_francisco_qfq3qf.png';

const apartmentImg: string = 'https://res.cloudinary.com/imagenbcsdr/image/upload/v1644923912/rentme/ralph-kayden-3_u7iaej.png'
const apartShortDesc: ApartmentShortDesc = {
    desc: 'Executive House in a Prestigious Area',
    sq: 245,
    bdr: 5,
    bath: 2,
    price: 3000
}

const fieldStyle = {
    minWidth: '150px',
    maxWidth: '200px',
    width: '12vw',
}

const Main: React.FC = () => {


    const [center, setCenter] = useState(defaultCenter); // state for defaultCenter
    const [mode, setMode] = useState(MODES.MOVE);
    const [markers, setMarkers] = useState<string[]>([]);// install markers

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




    const [city, setCity] = useState<string>("");
    const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice]);
    const [rooms, setRooms] = useState<NumButtonsInterface>({
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6+': false
    });
    const [placeType, setPlaceType] = useState<CheckboxInterface>({
        'Apartment': false,
        'House': false,
        'Sublet': false,
        'Duplex': false,
        'Loft': false,
    })
    const [amenities, setAmenities] = useState<CheckboxInterface>({
        'Elevator': false,
        'Washer in Unit': false,
        'Children Allowed': false,
        'Parking Spot': false,
        'Balcony': false,
        'Garden': false,
        'Terrace': false,
        'Air Conditioning': false,
        'Dishwasher': false,
        'View': false,
        'Pet Friendly': false,
        'Unfurnished': false,
    })

    const [labelCity, setLabelCity] = useState<string>('City, Country');
    const [labelPriceRange, setLabelPriceRange] = useState<string>();
    const [labelRooms, setLabelRooms] = useState<string>();
    const [labelPlaceType, setLabelPlaceType] = useState<string>()
    const [labelAmenities, setLabelAmenities] = useState<string>()

    const [date, setDate] = useState<DateRange<Date>>([null, null]);


    // useEffect(() => {
    //     axios.get('https://java-39-team-b.herokuapp.com/apartments', {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     }).then((r) => {
    //         console.log(r)
    //     }).catch(err => console.log(err))
    // }, [])


    const citySlides: SlideInterface[] = [
        {img: telAvivImg, label: 'Tel Aviv'},
        {img: newYorkImg, label: 'New York'},
        {img: sanFranciscoImg, label: 'San Francisco'},
        {img: romeImg, label: 'Rome'},
    ]

    const citySelect: JSX.Element = ( // Replacment select city on Autocomplite
        <TextField select
                   label={labelCity}
                   InputLabelProps={{shrink: false}}
                   value={city}
                   onChange={(e) => {
                       setCity(e.target.value);
                       setLabelCity('');
                   }}
                   sx={{
                       width: '20vw',
                       minWidth: '150px',
                       maxWidth: '300px'
                   }}>
            { isLoaded && <Autocomplete isLoader={ isLoaded } onSelect={onPlaceSelect}/> }
        </TextField>// {getCityMenuItems(cities)} replace on  176
    )

    const priceSelect: JSX.Element = (
        <TextField select
                   label={labelPriceRange ? <Typography color={'primary'}>{labelPriceRange}</Typography> : 'Price'}
                   InputLabelProps={{shrink: false}}
                   sx={fieldStyle}>
            <RangeSlider currentValue={priceRange} minValue={minPrice} maxValue={maxPrice}
                         onChangeValue={(value: number[]) => {
                             setPriceRange(value)
                             setLabelPriceRange('$' + value[0] + ' - ' + value[1])
                         }}/>
        </TextField>
    )

    const roomsSelect: JSX.Element = (
        <TextField select
                   label={labelRooms ? <Typography color={'primary'}>{labelRooms}</Typography> : 'Rooms'}
                   InputLabelProps={{shrink: false}}
                   sx={fieldStyle}>

            <NumButtonSelect
                currentValue={rooms}
                onChangeValue={(value: NumButtonsInterface) => {
                    setRooms(value)
                    setLabelRooms(Object.entries(value).reduce((res: string, item) => {
                        if (item[1]) {
                            res = `${res} ${item[0]},`
                        }
                        return res
                    }, '').slice(0, -1))
                }}/>
        </TextField>
    )

    const typeSelect: JSX.Element = (
        <TextField select
                   label={labelPlaceType ? <Typography color={'primary'}>{labelPlaceType}</Typography> : 'Type'}
                   InputLabelProps={{shrink: false}}
                   sx={fieldStyle}>
            <CheckboxGroup currentValue={placeType}
                           onChangeValue={(value: CheckboxInterface) => {
                               setPlaceType(value)
                               setLabelPlaceType(Object.entries(value).reduce((res: string, item) => {
                                   if (item[1]) {
                                       res = `${res} ${item[0]},`
                                   }
                                   return res
                               }, '').slice(0, -1))
                           }}/>
        </TextField>
    )

    const amenitiesSelect: JSX.Element = (
        <TextField select
                   label={labelAmenities ? <Typography color={'primary'}>{labelAmenities}</Typography> : 'Amenities'}
                   InputLabelProps={{shrink: false}}
                   sx={fieldStyle}>
            <CheckboxGroup currentValue={amenities}
                           onChangeValue={(value: CheckboxInterface) => {
                               setAmenities(value)
                               setLabelAmenities(Object.entries(value).reduce((res: string, item) => {
                                   if (item[1]) res = `${res} ${item[0]},`
                                   return res
                               }, '').slice(0, -1))
                           }}/>
        </TextField>
    )

    const findPlaceRef = useRef<HTMLDivElement>(null)

    function scrollToRef(ref: any) {
        window.scrollTo(0, ref.current.offsetTop - 30)
    }

    function getCityMenuItems(cities: string[]): JSX.Element[] {
        return cities.reduce((res: JSX.Element[], item, index) => {
            res.push(getCityMenuItem(item, index))
            return res
        }, [])
    }

    function getCityMenuItem(city: string, index: number): JSX.Element {
        return <MenuItemCityPrimary value={city} key={index}>{city}</MenuItemCityPrimary>
    }


    return <React.Fragment>
        <Header authorized={false}/>
        <Paper sx={{
            width: '100%',
            height: '500px',
            position: 'relative',
            zIndex: 0,
            backgroundImage: `url(${mainImg})`,
        }}>
            <Box sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                zIndex: -1,
                backgroundColor: 'black',
                opacity: '50%',
            }}>
            </Box>
            <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography variant={'h2'}
                            color={'secondary'}
                            textAlign={'center'}
                            mb={'20px'}>
                    Let Us Guide You Home
                </Typography>
                <Typography variant={'h5'}
                            color={'secondary'}
                            textAlign={'center'}
                            mb={'40px'}
                            sx={{opacity: '.8',}}>
                    Find the place of you dream
                </Typography>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: '1vw'
                }}>
                    {citySelect} 
                    {priceSelect}
                    {roomsSelect}

                    <ChangeColorButton onClick={() => scrollToRef(findPlaceRef)}>
                        <Typography>Find place</Typography>
                    </ChangeColorButton>
                </Box>
            </Box>
        </Paper>
        <Box padding={'60px 33px 0 33px'}>
            <Typography color={'primary'}
                        variant={'h2'}
                        fontWeight={'bold'}
                        textAlign={'center'}
                        mb={'60px'}>
                Popular cities
            </Typography>

            <Carousel slidesImgLabel={citySlides} widthSlideVw={22} heightSlideVw={19}
                      onClickSlide={() => scrollToRef(findPlaceRef)}/>

            <Box ref={findPlaceRef}
                 sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     gap: '1vw',
                     mb: '45px',
                 }}>
                {citySelect}
                {priceSelect}
                {typeSelect}
                {roomsSelect}

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker disablePast
                                     clearable
                                     startText={'From date'}
                                     endText={'To date'}
                                     calendars={2}
                                     value={date}
                                     onChange={(newValue) => {
                                         setDate(newValue);
                                     }}
                                     renderInput={(startProps, endProps) => (
                                         <React.Fragment>
                                             <TextField {...startProps} sx={fieldStyle}/>
                                             <Box sx={{mx: '3px'}}>-</Box>
                                             <TextField {...endProps} sx={fieldStyle}/>
                                         </React.Fragment>
                                     )}/>
                </LocalizationProvider>

                {amenitiesSelect}
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <ApartImgCard img={apartmentImg} shortDesc={apartShortDesc} likeIcon={true}/>
                    <ApartImgCard img={apartmentImg} shortDesc={apartShortDesc} likeIcon={true}/>
                    <ApartImgCard img={apartmentImg} shortDesc={apartShortDesc} likeIcon={true}/>
                    <ApartImgCard img={apartmentImg} shortDesc={apartShortDesc} likeIcon={true}/>
                </Box>

                <Box sx={{
                        height: '1291px',
                        width: '830px',
                }}>
                    {isLoaded ?
                        <Map center={center} mode={mode} markers={markers} onMarkerAdd={onMarkerAdd}/> :
                        <h1>Loading</h1>}
                </Box>

            </Box>
        </Box>

        {/* <Footer/> */}
    </React.Fragment>
}

export default Main;