import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import {Box, Typography} from "@mui/material";

const responsiveDefault = {
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 4,
        slidesToSlide: 1
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 3,
        slidesToSlide: 1
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 3,
        slidesToSlide: 1
    }
};

export interface SlideInterface {
    img: string,
    label?: string
}

type Props = {
    slidesImgLabel: SlideInterface[]
    responsive?: {}
    widthSlideVw: number
    heightSlideVw: number
    onClickSlide: (img: string) => void
}

const Carousel: React.FC<Props> = (props: Props) => {

    const {slidesImgLabel, responsive, widthSlideVw, heightSlideVw, onClickSlide} = props

    function getSlides(slides: SlideInterface[]): JSX.Element[] {
        return slides.reduce((res: JSX.Element[], item, index) => {
            res.push(getSlide(item, index))
            return res
        }, [])
    }

    function getSlide(slide: SlideInterface, index: number): JSX.Element {
        return <Box key={index}
                    onClick={() => onClickSlide(slide.img)}
                    sx={{
                        cursor: 'pointer',
                        background: `url(${slide.img}) no-repeat center center / cover`,
                        width: `${widthSlideVw}vw`,
                        height: `${heightSlideVw}vw`,
                        borderRadius: '5px',
                        position: 'relative',
                        margin: '0 auto',
                        '&:hover, &:active': {
                            width: `${widthSlideVw + 1}vw`,
                            height: `${heightSlideVw + 1}vw`,
                            borderRadius: '5px',
                        },
                    }}>
            <Typography color={'secondary'} variant={'h5'}
                sx={{
                    display: 'block',
                    position: 'absolute',
                    bottom: '2vw',
                    left: '2vw',
                }}>
                {slide.label}
            </Typography>
        </Box>
    }


    return <Box
        sx={{
            height: `${heightSlideVw + 5}vw`,
            margin: '0 auto'
        }}>
        <MultiCarousel
            swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive || responsiveDefault}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            // arrows={true}
            // customLeftArrow={<CustomLeftArrow/>}
            // customRightArrow={<CustomRightArrow/>}
        >
            {getSlides(slidesImgLabel)}
        </MultiCarousel>
    </Box>
}

export default Carousel;