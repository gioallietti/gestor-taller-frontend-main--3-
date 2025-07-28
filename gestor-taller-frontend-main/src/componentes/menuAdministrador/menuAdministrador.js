import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './menuAdministrador.css';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const MenuAdministrador = ({mostrarMenu, setMostrarMenu}) => {
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
        <Nav className="flex-column mb-auto mt-5 pt-1">
          <NavLink to="/administrador/ingresos" className={({ isActive }) => `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}>
            Ingresos
          </NavLink>
          <NavLink to="/administrador/reparaciones-por-tecnico" className={({ isActive }) => `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}>
            Reparaciones Por Tecnico
          </NavLink>
            <NavLink to="/administrador/ingresos-por-tecnico" className={({ isActive }) => `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}>
            Ingresos Por Tecnico
          </NavLink>
          <NavLink to="/administrador/ingresos-por-recepcionista" className={({ isActive }) => `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}>
            Ingresos Por Recepcionista
          </NavLink>
          <NavLink to="/administrador/usuarios" className={({ isActive }) => `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}>
            Usuarios
          </NavLink>
          <NavLink to="/administrador/marcas" className={({ isActive }) => `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}>
            Marcas
          </NavLink>
          <NavLink to="/administrador/tipoEquipo" className={({ isActive }) => `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}>
            Equipos
          </NavLink>
          <NavLink to="/administrador/repuestos" className={({ isActive }) => `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}>
            Repuestos
          </NavLink>
          <NavLink to="/administrador/estados" className={({ isActive }) => `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}>
            Estados
          </NavLink>
          <NavLink to="/administrador/prioridad" className={({ isActive }) => `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}>
            Prioridades
          </NavLink>
          <NavLink to="/administrador/personalizar" className={({ isActive }) => `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}>
            Personalización
          </NavLink>
        </Nav>
      </div>
    </>
  );
};

export default MenuAdministrador;
