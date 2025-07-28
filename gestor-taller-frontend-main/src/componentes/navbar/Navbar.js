import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ModalGenerico from '../modalGenerico/ModalGenerico';

const CustomNavbar = ({ user }) => {
      const [mostrarModal, setMostrarModal] = useState(false);
    const [modal, setModal] = useState({
        titulo: 'Confirmar',
        texto: '¿Estás seguro?',
        mostrarBotonAceptar: true,
        textoBotonAceptar: 'Aceptar',
        funcionAceptado: null,
        mostrarBotonCancelar: true,
        textoBotonCancelar: 'Cancelar'
    });

    const confirmarCerrarSesion = () => {
        setModal({
            titulo: "Confirmar cierre de sesión",
            texto: "¿Estás seguro de que deseas cerrar sesión?",
            mostrarBotonAceptar: true,
            textoBotonAceptar: "Cerrar sesión",
            funcionAceptado: cerrarSesion,
            mostrarBotonCancelar: true,
            textoBotonCancelar: "Cancelar",
        })
        setMostrarModal(true);
    }
    const cerrarSesion = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (<>
    <div className='m-4 p-1'></div>
        <Navbar className="navbar-text navbar m-0 p-0" expand="md" fixed="top">
            <Container fluid>
                <Image src="/logo192.png" alt="Logo" className="App-logo mt-0 mb-0 m-2" />
                <Navbar.Brand className="navbar-text" href="/">GESTOR</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="me-auto">
                        {/* <NavLink as={Link}
                            className={({ isActive }) => isActive ? "nav-link text-primary" : "nav-link text-secondary"}
                            to="/administrador/usuarios">Usuarios</NavLink> */}
                        {/* <NavDropdown title="Otros ">
                            <NavDropdown.Item as={Link}
                                className={({ isActive }) => isActive ? "nav-link text-primary" : "nav-link text-secondary"}
                                to="/administrador/marcas">Marcas</NavDropdown.Item>
                            <NavDropdown.Item as={Link}
                                className={({ isActive }) => isActive ? "nav-link text-primary" : "nav-link text-secondary"}
                                to="/administrador/tipoEquipo">Tipos de Equipos</NavDropdown.Item>
                            <NavDropdown.Item as={Link}
                                className={({ isActive }) => isActive ? "nav-link text-primary" : "nav-link text-secondary"}
                                to="/administrador/estados">Estados</NavDropdown.Item>
                            <NavDropdown.Item as={Link}
                                className={({ isActive }) => isActive ? "nav-link text-primary" : "nav-link text-secondary"}
                                to="/administrador/prioridad">Prioridad</NavDropdown.Item>
                            <NavDropdown.Item as={Link}
                                className={({ isActive }) => isActive ? "nav-link text-primary" : "nav-link text-secondary"}
                                to="/administrador/repuestos">Repuestos</NavDropdown.Item>
                            <NavDropdown.Item as={Link}
                                className={({ isActive }) => isActive ? "nav-link text-primary" : "nav-link text-secondary"}
                                to="/administrador/personalizar">Personalizar</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    {user ?
                        <>
                            <Nav>
                                <Navbar.Text className='navbar-text'>Bienvenido {user?.nombre}, <small className='navbar-text m-1'>{user?.tipoUsuario?.nombre}</small></Navbar.Text>
                            </Nav>
                            <Nav>
                                <Navbar.Text><button className='btn btn-primary btn-sm m-2 pt-0 pb-0 p-3' onClick={confirmarCerrarSesion}>Cerrar Sesión</button></Navbar.Text>
                            </Nav>
                        </> : ''}
                </Navbar.Collapse>
            </Container>
        </Navbar >

         <ModalGenerico
                mostrarModal={mostrarModal}
                ocultarModal={() => setMostrarModal(false)}
                titulo={modal.titulo}
                texto={modal.texto}
                mostrarBotonAceptar={modal.mostrarBotonAceptar}
                textoBotonAceptarModal={modal.textoBotonAceptar}
                aceptado={modal.funcionAceptado}
                mostrarBotonCancelar={modal.mostrarBotonCancelar}
                textoBotonCancelarModal={modal.textoBotonCancelar}
            />
    </>);
}

export default CustomNavbar;