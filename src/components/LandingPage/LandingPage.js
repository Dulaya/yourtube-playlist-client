import React from 'react';
import { Spinner } from 'react-bootstrap';

const LandingPage = () => {

    return (
        <>
            <Spinner />
            <div style={{
                background: `url('Images/collage.jpg')`,
                width: '100vw',
                height: '100vh',
                backgroundSize: '100vh',
                opacity: '35%'
            }}>
            </div>
            <div style={{
                lineHeight: '100vh', 
                textAlign: 'center', 
                fontSize: '5vw', 
                position: 'absolute', 
                zIndex: '1', 
                top: 0, 
                width: '100vw',
                fontStyle: 'italic',
                color: '#dc3545',
            }}>
                <Spinner animation="grow" size='sm' style={{ verticalAlign: 'middle', margin: '5px' }} />
                Loading Playlists
                <Spinner animation="grow" size='sm' style={{ verticalAlign: 'middle', margin: '5px' }} />
            </div>

        </>
    );
}

export default LandingPage;