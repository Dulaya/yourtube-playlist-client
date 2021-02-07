import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import YouTube from 'react-youtube';

import { ListGroup, Button, Image } from 'react-bootstrap';

import VideoContext from '../../context/VideoContext';
import PictureContext from '../../context/PictureContext';

import { deleteVideo } from '../../actions/videos';

const Videos = () => {

    const { videos, updateVideos } = useContext(VideoContext);

    const { pictures } = useContext(PictureContext);

    //Accepts YouTube link and return YouTube id
    //i.e. https://www.youtube.com/watch?v=HueLPmIGtxA --> HueLPmIGtxA
    const getYouTubeId = (link) => {
        var [youTubeId, concatString] = ['', false];

        for (var i = 0; i < link.length; i++) {
            if (concatString === true) youTubeId += link[i];
            if (link[i] === '=') concatString = true;
        }

        return youTubeId;
    }

    var youTubeId = '';

    //
    for (var i = 0; i < videos.length; i++) {
        if (window.location.pathname.replace('/', '') === videos[i].title) {
            youTubeId = getYouTubeId(videos[i].videoLink);
            break;
        }
    }

    const [currentVideoId, updateCurrentVideoId] = useState({ youTubeId: youTubeId, });

    //Get picture of specified playlist
    var pictureOfPlaylist = pictures.filter(pic => pic.title === window.location.pathname.replace('/', ''))[0].selectedFile;

    //Set youTubeId as first video of database
    if (videos.length > 0) {
        youTubeId = getYouTubeId(videos[0].videoLink);

        //Check if video title matches URL, if so get the first video to be displayed
        for (var j = 0; j < videos.length; j++) {
            if (videos[j].title === window.location.pathname.replace('/', '')) {
                youTubeId = getYouTubeId(videos[j].videoLink);
                break;
            }
        }
    }

    //Change video based on the specified link clicked
    const changeVideo = (videoLink) => {
        youTubeId = getYouTubeId(videoLink);
        updateCurrentVideoId({ youTubeId })
        return getYouTubeId(videoLink);
    }


    //Delete video link in the DOM based on YouTube link & delete from database.
    const deleteVideoDOMAndDatabase = (videoId) => {

        //Only delete if password matches
        if (process.env.REACT_APP_PASSWORD === document.getElementById('password').value) {

            //Delete video from DOM (VideoContext)
            updateVideos(videos.filter(item => item.id !== videoId));

            //Delete video from database
            deleteVideo(videoId);
        }
        else alert('Wrong Password');
    }

    return (
        <Router>
            {!currentVideoId.youTubeId ? 'No Videos / Broken Link' : <YouTube videoId={currentVideoId.youTubeId} />}
            <ListGroup>
                {videos.map((vid) => (
                    <Route exact path={`/${vid.title.replace(/ /g, '-')}`} key={vid.id} >
                        <div>
                            <ListGroup.Item
                                onClick={() => changeVideo(vid.videoLink)}
                                action
                                style={{ display: 'inline-block', width: '80%', padding: '5px' }}
                            >
                                <Image src={pictureOfPlaylist} rounded style={{ width: '100px' }} />
                                <span style={{margin: '10px'}}>
                                    {vid.title.replace(/-/g, ' ') + ': ' + vid.videoDescription}
                                </span>
                            </ListGroup.Item>
                            <Button
                                style={{
                                    borderColor: '#c7cfb7',
                                    display: 'inline-block',
                                    textAlign: 'center',
                                    background: 'red',
                                    height: '40px',
                                    margin: '0 2.5%',
                                    width: '15%',
                                }}
                                onClick={() => { deleteVideoDOMAndDatabase(vid._id); }}
                            >
                                Delete
                            </Button >
                        </div>
                    </Route>
                ))}
            </ListGroup>
        </Router>
    );
}

export default Videos;