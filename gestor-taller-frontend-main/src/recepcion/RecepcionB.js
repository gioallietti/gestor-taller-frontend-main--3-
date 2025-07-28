import './Recepcion.css';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import MenuRecepcion from '../componentes/menuRecepcion/menuRecepcion';

function RecepcionB(){
    return (<>
        <MenuRecepcion />
        <div>
            <Container >
                <Outlet />
            </Container>
        </div>
    </>);
}
export default RecepcionB;