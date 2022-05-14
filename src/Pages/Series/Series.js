import React, { useState, useEffect } from 'react'
import axios from "axios"
import SingleContent from "../../Components/SingleContent/SingleContent"
import CustomPaginationX from "../../Components/Pagination/Pagination"
import GenresComp from "../../Components/Genres/GenresComp"
import useGenres from "../../hooks/useGenre"

const Series = () => {
    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState(1)
    const [selectedGenres, setSelectedGenres] = useState([])
    const [Genres, setGenres] = useState([])
    const genreForURL = useGenres(selectedGenres)

    const fetchMovies = async (selectedGenres) => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=b9bdb09fc05c6f78ab2de960f7cc874e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=9&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreForURL}`)
        setContent(data.results)
        setNumberOfPages(data.total_pages)
    }

    useEffect(() => {
        fetchMovies()
        // eslint-disable-next-line
    }, [page, genreForURL])

    return (
        <div className='fixing'>
            <span className="pageTitle">TV Series</span>
            <GenresComp
                type="tv"
                setSelectedGenres={setSelectedGenres}
                selectedGenres={selectedGenres}
                Genres={Genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <div className="trending">
                {
                    content && content.map((movie, index) => (
                        <SingleContent id={movie.id} key={movie.id} movie={movie} mediaType="tv"/>
                    ))
                }
            </div>
            {content.length>1 ? <CustomPaginationX setPage={setPage} setNumberOfPages={setNumberOfPages} numberOfPages={numberOfPages} /> : <h1 style={{textAlign:"center" ,height:"60vh",marginTop:"20vh"}}>Loading movies...</h1>}                
        </div>
    )
}

export default Series
