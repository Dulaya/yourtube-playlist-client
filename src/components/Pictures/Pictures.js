import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Button, Spinner, Nav, Navbar } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import LandingPage from '../LandingPage/LandingPage';
import PictureForm from '../Form/Form';
import VideoForm from '../Form/Video';
import Videos from '../Videos/Videos';

import PictureContext from '../../context/PictureContext';

import { deletePost } from '../../actions/posts';

const useStyles = makeStyles({
    root: {
        //maxWidth: 250,
        flexGrow: 1,
    },
    image: {
        height: 200,
        width: 300,
    },
});

const Pictures = () => {

    const { pictures, updatePictures } = useContext(PictureContext);

    const classes = useStyles();

    //Delete picture in the DOM based on ... & delete from database.
    const deletePicture = (pictureId) => {

        //Only delete if password matches
        if (process.env.REACT_APP_PASSWORD === document.getElementById('password').value) {

            //Delete picture from DOM (PictureContext)
            if (pictureId) updatePictures(pictures.filter(item => item.id !== pictureId));

            //Delete picture from database
            if (pictureId) deletePost(pictureId);
        }
        else alert('Wrong Password');
    }

    //Open New Tab
    const openInNewTab = (pictureURL) => {
        const newWindow = window.open(pictureURL, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    }

    return (
        <>
            {!pictures ? <LandingPage /> : <Router >
                <Navbar style={{background: '#dc3545', }}>
                    <Nav className="justify-content-center" style={{ fontSize: '1.5rem', }}>
                        <Nav.Item style={{color: 'white', }} >
                            <Link to='/' style={{color: 'white', }}> 
                                YourTube Playlist
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>

                {/*Route components means that it will render children at specified path*/}
                <Route exact path='/'>
                    <PictureForm />
                </Route>

                <Grid container className={classes.root} spacing={1} style={{
                    margin: '0',
                    padding: '0',
                    width: '100vw',
                }}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={1}>

                            {/*Conditional rendering right below is crucial. 
                        Otherwise client will crash because it pictures is undefined when loading.*/}
                            {!pictures ? <Spinner animation="border" /> : pictures.map((picture) => (

                                <Grid key={picture.id} item>

                                    <Link to={`/${picture.title.replace(/ /g, '-')}`} key={picture.id} >
                                        {/*Route means that the button below will only exist on path="/", i.e. Home */}
                                        <Route exact path='/' >
                                            <Card className={classes.root}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={classes.image}
                                                        component="img"
                                                        alt={picture.title}
                                                        height=""
                                                        image={picture.selectedFile}
                                                        title={picture.title}
                                                    />
                                                </CardActionArea>
                                            </Card>

                                        </Route>
                                        <Route exact path={`/${picture.title.replace(/ /g, '-')}`} >
                                            <VideoForm />
                                            <Videos />
                                        </Route>
                                    </Link>
                                    <Route exact path='/' >
                                        <Button
                                            onClick={() => { deletePicture(picture.id) }}
                                            variant="danger"
                                            style={{
                                                position: 'relative',
                                                bottom: '25px',
                                                padding: '5px'
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Route>
                                </Grid>
                            ))}

                        </Grid>
                    </Grid>

                </Grid>

                <Nav className="justify-content-center" style={{ fontSize: '1.25rem', }}>
                    <Nav.Item>
                        <Nav.Link onClick={() => openInNewTab('https://github.com/Dulaya/yourtube-playlist-client')} >
                            Client Repo
                    </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => openInNewTab('https://github.com/Dulaya/yourtube-playlist-server')} >
                            Server Repo
                    </Nav.Link>
                    </Nav.Item>
                </Nav>

                <Navbar className="justify-content-center">
                    <Nav >
                        <Nav.Item >
                            <Nav.Link onClick={() => openInNewTab('https://dulayasaennok.com')} >
                                Made with MERN by Dulaya Saennok
                        </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>

            </Router >}
        </>
    );
}

export default Pictures;