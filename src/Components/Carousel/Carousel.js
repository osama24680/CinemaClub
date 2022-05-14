import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"
import axios from "axios"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { noPicture, img_300 } from "../Config"
import "./Carousel.css"



const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {
    let navigate=useNavigate()
    const [credits, setCredits] = useState([]);

    const fetchCredits = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=b9bdb09fc05c6f78ab2de960f7cc874e&language=en-US`);
        setCredits(data.cast);
        console.log(data.cast)
    };

    function getData(creditId) {
        navigate({
            pathname:"/CharacterData",
            search:`?id=${creditId}`
        })
    }
    const items = credits.map((credit) => (
        <div className="carouselItem">
            <img
                onClick={() => getData(credit.id)}
                src={credit.profile_path ? `${img_300}/${credit.profile_path}` : noPicture}
                alt={credit?.name}
                onDragStart={handleDragStart}
                className="carouselItem__img"
                style={{cursor:"pointer"}}
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

