import React, { useState, useContext } from 'react';
import FileBase from 'react-file-base64';
import { v4 as uuidv4 } from 'uuid';

import { Form, Button, Card, Accordion } from 'react-bootstrap';
import { IoMenuOutline } from 'react-icons/io5';

import { createPost, } from '../../actions/posts';

import PictureContext from '../../context/PictureContext';

const PictureForm = () => {

    const { pictures, updatePictures } = useContext(PictureContext);

    var uniqueId = uuidv4();

    const [postData, setPostData] = useState({
        title: '', selectedFile: '', _id: uniqueId, id: uniqueId,
    });


    const handleSubmit = (e) => {

        e.preventDefault();

        //Only create if password matches
        if (process.env.REACT_APP_PASSWORD === document.getElementById('password').value) {

            setPostData({ ...postData, _id: uniqueId, id: uniqueId });

            updatePictures([...pictures, {
                id: postData.id,
                title: document.getElementById('title').value.replace(' ', '-'),
                selectedFile: postData['selectedFile'],
            }]);

            createPost(postData);

            uniqueId = uuidv4();
        }
        else alert('Wrong Password');
    }


    return (
        <Accordion defaultActiveKey="0">

            <Card style={{ textAlign: 'center', padding: '10px', margin: '25px 33%' }}>

                <Accordion.Toggle as={Card.Header} eventKey="0">
                    <span style={{ float: 'left' }}>
                        <IoMenuOutline />
                    </span>
                    Create A New Playlist
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">

                    <Form onSubmit={handleSubmit} style={{ padding: '10px' }}>

                        <Form.Group >
                            <Form.Control type="" id='title'
                                value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value.replace(' ', '-') })} placeholder='Title' />
                        </Form.Group>

                        <Form.Group>
                            <label style={{ border: '1px dashed', cursor: 'pointer', padding: '5px', width: '100%', }}>
                                Choose Image
                        <label style={{ display: 'none' }}>
                                    <FileBase id='file' type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                                </label>
                            </label>
                        </Form.Group>

                        <Form.Group >
                            <Form.Control type="password" placeholder='Password' id='password' autoComplete="off"></Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" style={{ width: '100%' }}>Submit</Button>
                    </Form>

                </Accordion.Collapse>
            </Card>
        </Accordion>


    );
}

export default PictureForm;