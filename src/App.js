import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Pictures from './components/Pictures/Pictures';
import VideoeContext from './context/VideoContext';
import PictureContext from './context/PictureContext';

const App = () => {

    const [videos, updateVideos] = useState();
    const [pictures, updatePictures] = useState();

    //This useEffect will rerender when then content in the [] changes.
    useEffect(() => axios.get('https://your-tube-playlist.herokuapp.com/videos')
        .then(res => updateVideos(res.data))
        .catch(), []);

    //This useEffect will rerender when then content in the [] changes.
    useEffect(() => axios.get('https://your-tube-playlist.herokuapp.com/posts')
        .then(
            res => updatePictures(res.data))
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