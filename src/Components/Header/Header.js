import React from 'react'
import "./Header.css"
import { Link } from "react-router-dom"
const Header = (props) => {
    
    return (
        <div>
            {localStorage.getItem("cinemaClubToken") && <h2 className="loginName"> {props.loginData?.first_name}</h2>}
            <Link to="/trending"><span onClick={() => window.scroll(0, 0)} className="header">🎬 Cinema Club 🎥</span></Link>
            {localStorage.getItem("cinemaClubToken") && <h2 onClick={()=>{props.logoutFunction()}}   className="Logout">Log Out</h2>}
        </div>
    )
}

export default Header
