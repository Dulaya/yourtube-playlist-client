import React, { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import { createVideo, } from '../../actions/videos';
import VidoeContext from '../../context/VideoContext';

const VideoForm = () => {

    const { videos, updateVideos } = useContext(VidoeContext);

    var uniqueId = uuidv4();

    const [videoData, setVideoData] = useState([{ title: '', videoLink: '', videoDescription: '', _id: uniqueId, id: uniqueId, }]);

    const handleSubmitVideo = async (e) => {
        e.preventDefault();

        //Only create if password matches
        if (process.env.REACT_APP_PASSWORD === document.getElementById('password').value) {

            updateVideos([...videos, {
                _id: uniqueId,
                id: uniqueId,
                title: window.location.pathname.replace('/', ''),
                videoLink: document.getElementById('videoLink').value,
                videoDescription: document.getElementById('videoDescription').value,
            }])

            /*setVideoData({ 
                 ...videoData, 
                 title: 'HFDFDF',//window.location.pathname.replace('/', ''),
                 videoLink: 'hhsfgsg',//'https://www.youtube.com/watch?v=APgbyPdoncM',
                 videoDescription: 'fdadf',
             });*/

            setVideoData([...videoData, {
                _id: uniqueId,
                id: uniqueId,
                title: window.location.pathname.replace('/', ''),
                videoLink: document.getElementById('videoLink').value,
                videoDescription: document.getElementById('videoDescription').value,
            }])

            createVideo({
                _id: uniqueId,
                id: uniqueId,
                title: window.location.pathname.replace('/', ''),
                videoLink: document.getElementById('videoLink').value,
                videoDescription: document.getElementById('videoDescription').value
            });

        }
        else alert('Wrong Password');


    }

    return (
        <div>

            <Form autoComplete="off" noValidate onSubmit={handleSubmitVideo}>
                <div >
                    <Form.Control
                        value={videoData.videoLink}
                        style={{
                            display: 'inline-block',
                            margin: '1%',
                            width: '30%',
                        }}
                        placeholder='YouTube Link'
                        id='videoLink'
                    />
                    <Form.Control
                        value={videoData.videoDescription}
                        style={{
                            display: 'inline-block',
                            margin: '1%',
                            width: '30%',
                        }}
                        //onChange={(e) => setVideoData([ ...videoData, { videoDescription: e.target.value} ])}
                        placeholder='Description'
                        id='videoDescription'
                    />
                    <Form.Control
                        type="password"
                        placeholder='Password'
                        id='password'
                        autoComplete="off"
                        style={{
                            display: 'inline-block',
                            width: '20%'
                        }}
                    />
                    <div
                        onClick={handleSubmitVideo}
                        style={{
                            border: '1px solid',
                            borderRadius: '10%',
                            display: 'inline-block',
                            padding: '1%',
                            margin: '1%',
                            textAlign: 'center',
                            width: '12%',
                        }}
                    >
                        Submit
                    </div>
                </div>
            </Form>

        </div>
    );
}

export default VideoForm;