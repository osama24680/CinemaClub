import React, { useEffect, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from "axios";
import { img_500, unavailable, unavailableLandscape, } from "../Config";
import "./Modal.css";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from "../Carousel/Carousel";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    height: "80%",
    bgcolor: '#38465E',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: "#fff"
};



export default function ContentModal({ children, media_type, id }) {
    // const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=b9bdb09fc05c6f78ab2de960f7cc874e&language=en-US`);
        setContent(data);

    };

    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=b9bdb09fc05c6f78ab2de960f7cc874e&language=en-US`)
        setVideo(data.results[0]?.key);
    };

    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, []);

    function truncate(str, n) {
        return (
            str?.length > n ? str.substr(0, n - 1) + "..." : str
        )
    }
    return (
        <div>
            <div onClick={handleOpen}>{children}</div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style} className="style">
                        {content ? (
                            <div >
                                <div className="ContentModal">
                                    <img
                                        src={
                                            content.poster_path
                                                ? `${img_500}/${content.poster_path}`
                                                : unavailable
                                        }
                                        alt={content.name || content.title}
                                        className="ContentModal__portrait"
                                    />
                                    <img
                                        src={
                                            content.backdrop_path
                                                ? `${img_500}/${content.backdrop_path}`
                                                : unavailableLandscape
                                        }
                                        alt={content.name || content.title}
                                        className="ContentModal__landscape"
                                    />
                                    <div className="ContentModal__about">
                                        <span className="ContentModal__title">
                                            {content.name || content.title} (
                                            {(
                                                content.first_air_date ||
                                                content.release_date ||
                                                "-----"
                                            ).substring(0, 4)}
                                            )
                                        </span>
                                        {content.tagline && (
                                            <i className="tagline">{content.tagline}</i>
                                        )}

                                        <span className="ContentModal__description">
                                            {truncate (content.overview,500)}
                                        </span>

                                        <div>
                                            <Carousel id={id} media_type={media_type} />
                                        </div>

                                        <Button
                                            variant="contained"
                                            startIcon={<YouTubeIcon />}
                                            color="secondary"
                                            target="__blank"
                                            href={`https://www.youtube.com/watch?v=${video}`}
                                        >
                                            Watch the Trailer
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : <h1 style={{ textAlign: "center" }}>there are no content</h1>}


                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

