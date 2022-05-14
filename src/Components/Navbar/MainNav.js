import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom"
import "./MainNav.css"

const useStyles = makeStyles({


    root: {
        width: "100% !important",
        position: "fixed",
        bottom: 0,
        left: 0,
        backgroundColor: "#2d313a !important",
        zIndex: 100,
    }
})

export default function LabelBottomNavigation() {

    const style = useStyles()
    const [value, setValue] = React.useState('recents');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <BottomNavigation sx={{ width: 500, }} value={value} onChange={handleChange} className={`${style.root} responive`} >


          
                <Link to="/trending">
                    <BottomNavigationAction label="trending" style={{ color: "#fff" }} value="recents" icon={<WhatshotIcon />} />
                </Link>

                <Link to="/Movies">
                    <BottomNavigationAction label="Movies" style={{ color: "#fff" }} value="Movies" icon={<LocalMoviesIcon />} />
                </Link>

                <Link to="/series">
                    <BottomNavigationAction label="Series" style={{ color: "#fff" }} value="Series" icon={<LiveTvIcon />} />
                </Link>

                <Link to="/search">
                    <BottomNavigationAction label="Search" style={{ color: "#fff" }} value="Search" icon={<SearchIcon />} />
                </Link>
           

        </BottomNavigation >
    );
}
