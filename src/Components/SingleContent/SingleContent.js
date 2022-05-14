import React from 'react'
import "./SingleContent.css"
import { img_300 } from "../Config"
import { unavailable } from "../Config"
import Badge from '@mui/material/Badge';
import ContentModal from "../Modal/Modal"
const SingleContent = (props) => {
    let { poster_path, name, original_title, first_air_date, release_date, vote_average } = props.movie
   
    return (
        <ContentModal media_type={props.mediaType} id={props.id} >
            <div className="media"  >
                <Badge badgeContent={vote_average?vote_average:"?"} color={vote_average > 7 ? "primary" : "warning"} />
                <img className="poster" src={poster_path ? `${img_300}/${poster_path}` : unavailable} alt={name ? name : original_title} />
                <p className="title">{name ? name : original_title}</p>
                <div className="subTitle">
                    {props.mediaType && <span className="">{props.mediaType}</span>}
                    <span className={`${!props.mediaType ? "textAlignCenter" : ""}  `}>{first_air_date ? first_air_date : release_date}</span>
                </div>
            </div>
        </ContentModal>
    )
}
export default SingleContent
