import "./Taller.css";
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import MenuTaller from '../componentes/menuTaller/menuTaller';

function Taller() {

    return (<>
        <MenuTaller />
        <div>
            <Container fluid className="main">
                <Outlet />
            </Container>
        </div>
    </>);
}

export default Taller;
