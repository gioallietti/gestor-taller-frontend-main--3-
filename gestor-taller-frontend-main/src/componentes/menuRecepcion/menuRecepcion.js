import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './menuRecepcion.css';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const MenuRecepcion = () => {
  const [mostrarMenu, setMostrarMenu] = useState(true);
  const toggleMenu = () => {
    setMostrarMenu(!mostrarMenu);
  };

  return (
    <>
      <Button
        variant="primary"
        className={`position-fixed d-flex boton-mostrar-menu mt-0 ${mostrarMenu ? 'activo' : ''}`}
        onClick={toggleMenu}
        style={{ zIndex: 1050 }}
      >
        ☰
      </Button>

      <div
        className={`border-end vh-100 position-fixed d-flex flex-column p-0 menu-lateral
          ${mostrarMenu ? 'mostrar-menu' : 'ocultar-menu'} 
         `}
        style={{ width: '150px', zIndex: 1040 }}
      >
        <Nav className="flex-column mb-auto mt-5">
           <NavLink to="/recepcion/Recepcion" className={({ isActive }) => `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}>
            Ingresos
          </NavLink>
          <NavLink to="/recepcion/marcas" className={({ isActive }) => `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}>
            Marcas
          </NavLink>
          <NavLink to="/recepcion/tipoEquipo" className={({ isActive }) => `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}>
            Equipos
          </NavLink>
          <NavLink to="/recepcion/repuestos" className={({ isActive }) => `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}>
            Repuestos
          </NavLink>
          <NavLink to="/recepcion/prioridad" className={({ isActive }) => `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}>
            Repuestos
          </NavLink>
           <NavLink to="/recepcion/personalizar" className={({ isActive }) => `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}>
            Personalización
          </NavLink>
        </Nav>
      </div>
    </>
  );
};

export default MenuRecepcion;