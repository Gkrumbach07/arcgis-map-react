import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import BasemapModal from '../features/map/BasemapModal';
import useMapStore from '../stores/mapStore';

const NavBar = () => {
    const container = useMapStore((state) => state.container);
    const setShowLayer = useMapStore((state) => state.setShowLayer);
    const showLayer = useMapStore((state) => state.showLayer);
    const [showWeatherLayer, setShowWeatherLayer] = useMapStore((state) => [state.showWeatherLayer, state.setShowWeatherLayer]);


    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Gauge Mapper</Navbar.Brand>
                {container && 
                <>
                    <BasemapModal />
                    <Button variant="outline-success" onClick={() => setShowLayer(!showLayer)}>Toggle Gauge Layer</Button>
                    <Button variant="outline-success" onClick={() => setShowWeatherLayer(!showWeatherLayer)}>Toggle Weather Layer</Button>
                </>
        }
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="w-100 justify-content-end">
                        <Nav.Link as={NavLink} to="/map">Map</Nav.Link>
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/admin">Admin</Nav.Link>
                        <Nav.Link>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;