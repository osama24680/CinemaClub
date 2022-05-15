import React, { useEffect, useState } from 'react'
import axios from "axios"
import { img_300 } from "../../Components/Config"
import "./Character.css"
import { unavailable } from "../../Components/Config"
import Badge from '@mui/material/Badge';

const CharacterAchievments = ({ currentID }) => {
    const [personAchievments, setPersonAchievments] = useState([]);

    const fetchPerson = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/person/${currentID}/combined_credits?api_key=b9bdb09fc05c6f78ab2de960f7cc874e`);
        console.log(data.cast)
        setPersonAchievments(data.cast)
    };
    useEffect(() => {
        fetchPerson();
        // eslint-disable-next-line
    }, []);


    return (
        <div className="trending" >
            {personAchievments?personAchievments.map((achieve,index) => (
                <div key={index} >
                    <div className="mediaX"  >
                        <Badge badgeContent={achieve.vote_average ? achieve.vote_average : "?"} color={achieve.vote_average > 7 ? "primary" : "warning"} />
                        <img className="poster" src={achieve.poster_path ? `${img_300}/${achieve.poster_path}` : unavailable} alt={achieve.name ? achieve.name : achieve.original_title} />
                        <p className="title">{achieve.name ? achieve.name : achieve.original_title}</p>
                        <div className="subTitle">
                            {achieve.media_type && <span className="">{achieve.media_type}</span>}
                            <span className={`${!achieve.media_type ? "textAlignCenter" : ""}  `}>{achieve.first_air_date ? achieve.first_air_date : achieve.release_date}</span>
                        </div>
                    </div>
                </div>
            )): <h1 style={{textAlign:"center"}}>Loading....</h1>}
        </div>
    )
}

export default React.memo(CharacterAchievments)
