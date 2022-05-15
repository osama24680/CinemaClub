import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SingleContent from "../Components/SingleContent/SingleContent"
import CustomPaginationX from "../Components/Pagination/Pagination"

const Trending = () => {
    const [content, setContent] = useState([])
    const [numberOfPages, setNumberOfPages] = useState(1)
    const [page,setPage]=useState(1)
    const fetchTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=b9bdb09fc05c6f78ab2de960f7cc874e&page=${page}`)
        setContent(data.results)
        setNumberOfPages(data.total_pages)
    }

    useEffect(() => {
        fetchTrending()
        // eslint-disable-next-line
    }, [page])
    return (
        <div className='fixing'>
            <span className="pageTitle">Trendeng</span>
            <div className="trending">
                {
                    content && content.map((movie, index) => (
                        <SingleContent id={movie.id} key={movie.id} movie={movie}  mediaType={movie.media_type}/>
                    ))
                }
            </div>
        
            {content.length > 1 ? <CustomPaginationX setPage={setPage} setNumberOfPages={setNumberOfPages} numberOfPages={numberOfPages} /> : <h1 style={{ textAlign: "center", height: "60vh", marginTop: "20vh" }}>Loading ...</h1>}
        </div>
    )
}

export default Trending
