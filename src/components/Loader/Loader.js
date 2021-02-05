import { Container, Spinner } from 'react-bootstrap';

const Loader = () => {

    return (
        <Container style={{ lineHeight: '100vh', textAlign: 'center' }}>
                <Spinner animation="border" role="status" >
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <span> Loading playlists may take a few seconds...</span>
        </Container>
    );
}

export default Loader;