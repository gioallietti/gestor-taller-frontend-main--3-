import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import AdministrarUsuarios from './administrador/AdministrarUsuarios';
import Administrador from './administrador/Administrador';
import AdministrarMarcas from './administrador/AdministrarMarcas';
import AdministrarTipoEquipos from './administrador/AdministrarTipoEquipos';
import AdministrarEstados from './administrador/AdministrarEstados';
import AdministrarPrioridades from './administrador/AdministrarPrioridades';
import Personalizar from './componentes/personalizar/Personalizar';
import CargarEstiloFuncion from './funciones/CargarEstiloFuncion';
import { useEffect, useState } from 'react';
import AdministrarRepuestos from './administrador/AdministrarRepuestos';
import CustomNavbar from './componentes/navbar/Navbar';
import './App.css'
import Cargando from './componentes/cargando/Cargando';
import Taller from './taller/Taller';
import Footer from './componentes/footer/Footer';
import IngresosPorTecnico from './ingresos/IngresosPorTecnico';
import IngresosPorRecepccionista from './ingresos/IngresosPorRecepcionista';
import ReparacionesPorTecnico from './ingresos/ReparacionesPorTecnico';
import Ingresos from './ingresos/Ingresos';
import IngresoPagina from './ingresos/IngresoPagina';
import Recepcion from './recepcion/Recepcion';
import RecepcionB from './recepcion/RecepcionB';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CargarEstiloFuncion();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false)
  }, []);

  //-----------------------------------
  if (loading) {
    return <Cargando />;
  }

  return (
    <Router>
      <CustomNavbar user={user} />
      <Routes>
        <Route path="/" element={<Login user={user} setUser={setUser} />} />
        <Route path="/administrador" element={<Administrador />} >
          <Route index element={<Navigate to="ingresos" replace />} />
          <Route path="/administrador/ingresos" element={<Ingresos />} />
          <Route path="/administrador/ingresos/:id" element={<IngresoPagina />} />
          <Route path="/administrador/ingresos-por-tecnico" element={<IngresosPorTecnico />} />
          <Route path="/administrador/reparaciones-por-tecnico" element={<ReparacionesPorTecnico />} />
          <Route path="/administrador/ingresos-por-recepcionista" element={<IngresosPorRecepccionista />} />
          <Route path="/administrador/usuarios" element={<AdministrarUsuarios />} />
          <Route path="/administrador/marcas" element={<AdministrarMarcas />} />
          <Route path="/administrador/tipoEquipo" element={<AdministrarTipoEquipos />} />
          <Route path="/administrador/estados" element={<AdministrarEstados />} />
          <Route path="/administrador/prioridad" element={<AdministrarPrioridades />} />
          <Route path="/administrador/personalizar" element={<Personalizar />} />
          <Route path="/administrador/repuestos" element={<AdministrarRepuestos />} />
        </Route>
        <Route path="/taller" element={<Taller />} >
          <Route index element={<Navigate to="ingresos" replace />} />
          <Route path="/taller/ingresos" element={<Ingresos />} />
          <Route path="/taller/ingresos/:id" element={<IngresoPagina />} />
          <Route path="/taller/marcas" element={<AdministrarMarcas />} />
          <Route path="/taller/tipoEquipo" element={<AdministrarTipoEquipos />} />
          <Route path="/taller/personalizar" element={<Personalizar />} />
          <Route path="/taller/repuestos" element={<AdministrarRepuestos />} />
        </Route>
        <Route path="/recepcion" element={<RecepcionB />} >
        <Route index element={<Navigate to="Recepcion" replace />} />
          <Route path="/recepcion/Recepcion" element={<Recepcion/>}/>
          <Route path="/recepcion/prioridad" element={<AdministrarPrioridades />}/>
          <Route path="/recepcion/marcas" element={<AdministrarMarcas />} />
          <Route path="/recepcion/tipoEquipo" element={<AdministrarTipoEquipos />} />
          <Route path="/recepcion/repuestos" element={<AdministrarRepuestos />} />
          <Route path="/recepcion/personalizar" element={<Personalizar />} />
        </Route>
      </Routes>
      <Footer />
    </Router >
  );
}


export default App;
