import React, { useEffect } from 'react'
import axios from "axios"
import Chip from '@mui/material/Chip';

const GenresComp = (props) => {
    const { setSelectedGenres, selectedGenres, Genres, setGenres, setPage, type } = props

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre])
        setGenres(Genres.filter(g => g.id !== genre.id))
        setPage(1)
    }
    const handleRemove = (genre) => {
        
        setSelectedGenres(selectedGenres.filter(selected => selected.id !== genre.id))
        setGenres([...Genres, genre])
        setPage(1)
    }

    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=b9bdb09fc05c6f78ab2de960f7cc874e&language=en-US`)
        setGenres(data.genres)
    }

    useEffect(() => {
        fetchGenres()

        // return () => {
        //     setGenres({})
        // }
        // eslint-disable-next-line
    }, [])



    return (
        <div style={{ padding: "6px 0" }}>
            {selectedGenres.map(genre => (
                <Chip
                    label={genre.name}
                    style={{ margin: 3 }}
                    color="secondary"
                    clickable
                    size="medium"
                    key={genre.id}
                    onDelete={()=>handleRemove(genre)}
                />
            ))}
            {Genres.map(genre => (
                <Chip
                    label={genre.name}
                    style={{ margin: 3 }}
                    color="primary"
                    clickable
                    size="medium"
                    key={genre.id}
                    onClick={() => handleAdd(genre)}
                />
            ))}
        </div>
    )
}

export default GenresComp
