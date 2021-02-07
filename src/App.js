import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { pictureURL, videoURL } from './urls/urls';
import Pictures from './components/Pictures/Pictures';
import VideoeContext from './context/VideoContext';
import PictureContext from './context/PictureContext';

import LandingPage from './components/LandingPage/LandingPage';

const getWidth = () => window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

const App = () => {

    const [videos, updateVideos] = useState();
    const [pictures, updatePictures] = useState();

    //This useEffect will rerender when then content in the [] changes.
    useEffect(() => axios.get(pictureURL)
        .then(
            res => updatePictures(res.data))
        .catch(), []);

    //This useEffect will rerender when then content in the [] changes.
    useEffect(() => axios.get(videoURL)
        .then(res => updateVideos(res.data))
        .catch(), []);

    return (
        <>
            <PictureContext.Provider value={{ pictures, updatePictures, }}>
                <VideoeContext.Provider value={{ videos, updateVideos, }}>
                    <Pictures />
                </VideoeContext.Provider>
            </PictureContext.Provider>
        </>
    );
}

export default App;