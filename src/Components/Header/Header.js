import React from 'react'
import "./Header.css"
import {Link} from "react-router-dom"
const Header = () => {
    return (
        <div>
        <Link to="/trending"><span onClick={() => window.scroll(0, 0)} className="header">🎬 Cinema Club 🎥</span></Link>
        </div>
    )
}

export default Header
