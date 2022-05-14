import React from 'react'
import "./Pagination.css"
import Pagination from '@mui/material/Pagination';
import { createMuiTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const darkTheme = createMuiTheme({
    palette: {
        type: "dark"
    }
})
const CustomPaginationX = (props) => {

    const handlePage = (page) => {
        props.setPage(page)
        window.scroll(0, 0)
    }
    return (
        <ThemeProvider theme={darkTheme}>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", paddingBottom: "50px", paddingTop: "20px" }}>
                <Pagination  count={props.numberOfPages?props.numberOfPages : 20} color="primary" onChange={(e) => handlePage(e.target.textContent)} />
            </div>
        </ThemeProvider>
    )
}

export default CustomPaginationX

