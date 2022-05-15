import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { img_300 } from "../../Components/Config"
import "./Character.css"
import CharacterAchievments from "./CharacterAchievments"
const CharacterData = () => {
    let [searchParam, setSearchParam] = useSearchParams()
    const [personData, setPersonData] = useState([]);
    let currentID = searchParam.get("id")
    // setSearchParam(currentID)
    const fetchPerson = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/person/${currentID}?api_key=b9bdb09fc05c6f78ab2de960f7cc874e&language=en-US`);
        setPersonData(data)
    };
    useEffect(() => {
        fetchPerson();
        // eslint-disable-next-line
    }, []);
    let age1 = personData.birthday
    let age2 = `${age1}`
    let age3 = age2.slice(0, 4)
    let date = new Date().getFullYear()
    let calcAge = date - age3

    function truncate(str, n) {
        return (
            str?.length > n ? str.substr(0, n - 1) + "..." : str
        )
    }

    return (
        <div className="fixing" style={{ paddingBottom: "60px" }}>
            <div className="upper">
                <div className="imgLeft">
                    <img src={`${img_300}${personData.profile_path}`} alt={personData.profile_path} className="imgBorder"/>
                </div>
                <div className="privateData" onClick={(e) =>setSearchParam({id:e.target.value}) }>
                    <h1>{personData.name}</h1>
                    <div className="biography">
                        <p className="ContentModal__description">{truncate(personData.biography, 500)}</p>
                    </div>
                    <div>
                        {personData.birthday === null ? "" : <h2>Date of birth : <span>{personData.birthday}</span></h2>}
                        {personData.place_of_birth === null ? "" : <h2>Place of birth : <span>{personData.place_of_birth}</span></h2>}
                        {personData.birthday === null ? "" : <h2>Age : <span>{calcAge}</span></h2>}
                        {personData.homepage === null ? "" : <h2>Home Page: <span><a href={personData.homepage}>{personData.homepage}</a></span></h2>}
                        {personData.deathday === null ? "" : <h2>death day: <span>{personData.deathday}</span></h2>}
                    </div>
                </div>
            </div>
            <CharacterAchievments currentID={currentID} />

        </div>
    )
}

export default CharacterData


