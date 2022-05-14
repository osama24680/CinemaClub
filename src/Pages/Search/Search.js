import { ThemeProvider } from '@emotion/react'
import { Button, createMuiTheme, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useEffect } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from "axios"
import "./Search.css"
import SingleContent from "../../Components/SingleContent/SingleContent"
import CustomPaginationX from "../../Components/Pagination/Pagination"
const Search = () => {

    const [type, setType] = useState(0)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("")
    const [numberOfPages, setNumberOfPages] = useState()
    const [content, setContent] = useState([])

    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff"
            }
        }
    })
    const fetchSearch = async (selectedGenres) => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=b9bdb09fc05c6f78ab2de960f7cc874e&language=en-US&query=${searchText}&page=${page}&include_adult=false`)

        setContent(data.results)
        console.log(data)
        setNumberOfPages(data.total_pages)
    }

    useEffect(() => {
        window.scroll(0, 0)
        fetchSearch()
        // eslint-disable-next-line
    }, [page, type])
    return (
        <div className="fixing">
            <ThemeProvider theme={darkTheme} >
                <div style={{ display: "flex", margin: "15px 0" }}>
                    <TextField
                        style={{ flex: 1 }}
                        className="searchBox"
                        label="search"
                        varient="filled"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button onClick={fetchSearch} varient="contained" style={{ marginLeft: 10 }}><SearchIcon /></Button>
                </div>
                <Tabs
                    value={type}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(e, newValue) => {
                        setType(newValue)
                        setPage(1)
                    }}
                    style={{ paddingBottom: 5 }}
                >
                    <Tab style={{ width: "50%" }} label="Search Movie" />
                    <Tab style={{ width: "50%" }} label="Search TV Series" />
                </Tabs>
            </ThemeProvider>

            <div className='trending' style={{marginTop: "40px"}}>
                {
                    content && content.map((movie, index) => (
                        <SingleContent id={movie.id} key={movie.id} movie={movie} mediaType="Movies" />
                    ))
                }
                {searchText && !content && (type ? <h2>No  Movies Found</h2> : <h2>No Series Found</h2>)}
                
                {content.length > 1 ?
                    <CustomPaginationX
                        setPage={setPage}
                        setNumberOfPages={setNumberOfPages}
                        numberOfPages={numberOfPages} />
                    :
                    <h1 style={{ textAlign: "center", height: "60vh", marginTop: "20vh" }}>
                        There are no {type ? "Series" : "Movies"} to search
                    </h1>
                }

            </div>
        </div>
    )
}

export default Search
