import React, { useEffect, useState } from 'react';
import axios from "axios"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {noPicture,img_300} from "../Config"
import "./Carousel.css"


const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {

    const [credits, setCredits] = useState([]);

    const items = credits.map((credit) => (
        <div className="carouselItem">
            <img
                src={credit.profile_path ? `${img_300}/${credit.profile_path}` : noPicture}
                alt={credit?.name}
                onDragStart={handleDragStart}
                className="carouselItem__img"
            />
            <b className="carouselItem__txt">{credit?.name}</b>
        </div>
    ));

    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 7,
        },
    };

    const fetchCredits = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=b9bdb09fc05c6f78ab2de960f7cc874e&language=en-US`);
        setCredits(data.cast);
    };
    useEffect(() => {
        fetchCredits();
        // eslint-disable-next-line
    }, []);
    return (
        <AliceCarousel
            mouseTracking
            infinite
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
        />
    );
}
export default Carousel