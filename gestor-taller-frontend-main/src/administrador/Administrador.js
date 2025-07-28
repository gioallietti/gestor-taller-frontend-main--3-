import "./Administrador.css";
import { Col, Row, Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import MenuAdministrador from '../componentes/menuAdministrador/menuAdministrador.js';
import { useState } from "react";

function Administrador() {
    const [mostrarMenu, setMostrarMenu] = useState(true);
    const toggleMenu = () => {
        setMostrarMenu(!mostrarMenu);
    };
    return (<>
        <MenuAdministrador mostrarMenu={mostrarMenu} setMostrarMenu={setMostrarMenu} />
        <div>
            <Container className="main">
                <Col>
                    <Outlet />
                </Col>
            </Container>
        </div>
    </>);
}

export default Administrador;