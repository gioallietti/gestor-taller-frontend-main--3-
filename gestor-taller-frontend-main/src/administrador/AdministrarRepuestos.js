import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../administrador/AdministrarRepuestos.css';
import { urlBase } from '../servicio/Api';
import { Link, Navigate } from 'react-router-dom';
import EliminarPorIdFuncion from '../funciones/EliminarPorIdFuncion';
import FormularioGenerico from '../componentes/formularioGenerico/FormularioGenerico';
import SelectorGenerico from '../componentes/SelectorGenerico/SelectorGenerico';
import Cargando from '../componentes/cargando/Cargando';
import ModalGenerico from '../componentes/modalGenerico/ModalGenerico';

const AdministrarRepuestos = () => {

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

  const hoy = new Date().toISOString().slice(0, 10);

  const [marcaPorDefecto, setMarcaPorDefecto] = useState(0);
  const [repuestoData, setRepuestoData] = useState({
    nombre: '',
    marca: { id: marcaPorDefecto },
    modelo: '',
    precio: '',
    descripcion: '',
    cantidad: '',
    fecha: hoy,
  });

  const [repuestos, setRepuestos] = useState([]);
  const [repuestosFiltrados, setRepuestosFiltrados] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [editando, setEditando] = useState('');
  const [marcaId, setMarcaId] = useState(0);

  const [buscar, setBuscar] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [repuestosRes, marcasRes] = await Promise.all([
          fetch(urlBase + '/repuestos/todos'),
          fetch(urlBase + '/marcas/todas'),
        ]);

        if (repuestosRes.ok && marcasRes.ok) {
          const marcasDataRes = await marcasRes.json();
          const repuestosDataRes = await repuestosRes.json();
          setMarcas(marcasDataRes);
          setRepuestos(repuestosDataRes);

          setMarcaPorDefecto(marcasDataRes[0].id)

        } else {
          console.error('Error al obtener datos');
        }
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
      }
    };

    fetchData();
    setLoading(false);
  }, []);

  const registrarActualizar = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const url = editando
        ? urlBase + '/repuestos/' + editando
        : urlBase + '/repuestos/crea';

      const method = editando ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(repuestoData),
      });

      if (response.ok) {
        setModal({
          titulo: '¡Exito!',
          texto: (editando ? 'Repuesto actualizado exitosamente.' : 'Repuesto registrado exitosamente.'),
          mostrarBotonAceptar: true,
          textoBotonAceptar: 'Aceptar',
          funcionAceptado: () => setMostrarModal(false),
          mostrarBotonCancelar: false,
          textoBotonCancelar: 'Cancelar'
        })
        setMostrarModal(true);

        setRepuestoData({
          nombre: '',
          marca: { id: marcaPorDefecto },
          modelo: '',
          precio: '',
          descripcion: '',
          cantidad: '',
          fecha: hoy,
        });
        setEditando(null);

        const updatedRepuestos = await fetch(urlBase + '/repuestos/todos').then((res) =>
          res.json()
        );
        setRepuestos(updatedRepuestos);
      } else {
        const errorText = await response.text();
        setModal({
          titulo: '¡Ocurrió un Error!',
          texto: (editando ? 'Error al actualizar el repuesto.' : 'Error al registrar el repuesto.'),
          mostrarBotonAceptar: true,
          textoBotonAceptar: 'Aceptar',
          funcionAceptado: () => setMostrarModal(false),
          mostrarBotonCancelar: false,
          textoBotonCancelar: 'Cancelar'
        })
        setMostrarModal(true);
      }
    } catch (error) {
      console.error('Error al registrar/actualizar repuesto:', error);
      setModal({
        titulo: '¡Ups! Algo salió mal.',
        texto: 'Error al conectar con el servidor. Por favor, intente más tarde.',
        mostrarBotonAceptar: true,
        textoBotonAceptar: 'Aceptar',
        funcionAceptado: () => setMostrarModal(false),
        mostrarBotonCancelar: false,
        textoBotonCancelar: 'Cancelar'
      })
      setMostrarModal(true);
    } finally {
      setLoading(false);
    }
  };

  const confirmarEliminar = (id, nombre) => {
    setLoading(true);
    setModal({
      titulo: '¿Eliminar?',
      texto: 'Vas a eliminar el siguiente repuesto: ' + `"${nombre}".`,
      mostrarBotonAceptar: true,
      textoBotonAceptar: 'Aceptar',
      funcionAceptado: () => eliminar(id, nombre),
      mostrarBotonCancelar: true,
      textoBotonCancelar: 'Cancelar'
    })
    setMostrarModal(true);
    setLoading(false);
  };

  const eliminar = async (id, nombre) => {
    setLoading(true);
    const url = `${urlBase}/repuestos/${id}`;
    const exito = await EliminarPorIdFuncion(id, repuestos, setRepuestos, url);
    if (exito) {
      setModal({
        titulo: 'Eliminado',
        texto: 'Se a eliminado correctamente el repuesto "' + nombre + '".',
        mostrarBotonAceptar: true,
        textoBotonAceptar: 'Aceptar',
        funcionAceptado: () => setMostrarModal(false),
        mostrarBotonCancelar: false,
        textoBotonCancelar: 'Cancelar'
      })
    } else {
      setModal({
        titulo: 'Algo salió mal',
        texto: 'No se pudo eliminar el repuesto.',
        mostrarBotonAceptar: true,
        textoBotonAceptar: 'Aceptar',
        funcionAceptado: () => setMostrarModal(false),
        mostrarBotonCancelar: false,
        textoBotonCancelar: 'Cancelar'
      })
    }
    setMostrarModal(true)
    setLoading(false);
  };

  const editar = (repuesto) => {
    setLoading(true);
    setEditando(repuesto.id);
    setRepuestoData(repuesto);
    setLoading(false);
  };

  const cancelar = () => {
    setLoading(true);
    setEditando('');
    setRepuestoData({
      nombre: '',
      marca: { id: marcaPorDefecto },
      modelo: '',
      precio: '',
      descripcion: '',
      cantidad: '',
      fecha: hoy,
    });
    setLoading(false);
  };

  useEffect(() => {
    let filtrarRepuestos = [];

    filtrarRepuestos = repuestos.filter((repuesto) => {
      return repuesto.nombre.toLowerCase().includes(buscar.toLowerCase())
    })

    if (marcaId !== 0) {
      const filtrados = filtrarRepuestos.filter((repuesto) => {
        return repuesto.marca.id === marcaId;
      });

      filtrarRepuestos = filtrados;
    }

    setRepuestosFiltrados(filtrarRepuestos)
  }, [repuestos, buscar, marcaId]);

  //-----------------------------------
  if (loading) {
    return <Cargando />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="container register-container">
      <h3 className='titulo'>Gestionar Repuestos</h3>
      <Row className="row justify-content-center">
        <Col className='card m-2' xs={12} lg={5} style={{ maxWidth: '400px', height: '470px' }}>
          <form onSubmit={registrarActualizar}>
            <div className="mt-4">
              <SelectorGenerico
                elementos={marcas}
                elementoId={repuestoData.marca.id}
                onChange={(id) => setRepuestoData({ ...repuestoData, marca: { id } })}
              />
            </div>
            <span className='m-1 p-0'>No encuentras tu marca?</span>
            <Link className='btn btn-primary m-0 p-0 btn-sm w-50'
              to="/administrador/marcas">Registralo ahora</Link>
            <FormularioGenerico
              entidadData={repuestoData}
              setEntidadData={setRepuestoData}
              mostrarNombre
              mostrarModelo
              mostrarPrecio
              mostrarDescripcion
              mostrarCantidad
            />
            <button className='btn btn-primary mt-4 mb-4' type="submit">{editando ? 'Actualizar' : 'Registrar'} Repuesto</button>
          </form>
        </Col>

        <Col className='card m-2' xs={12} lg={5} style={{ maxWidth: '400px', height: '470px' }}>
          <Col xs={12} className="mb-0 mt-0 mt-4">
            <div className="mb-0 mt-0 m-0 mt-0">
              <div className="input-group input-group-sm">
                <span className='text-bg-primary input-group-text'>Filtrar marca:</span>
                <SelectorGenerico
                  elementos={[{ id: 0, nombre: 'Todos' }, ...marcas]}
                  elementoId={marcaId}
                  onChange={(id) => setMarcaId(id)}
                />
              </div>
            </div>
          </Col>

          <Col xs={12} className="mb-2 mt-0 mt-0">
            <div className="mb-2 mt-0 m-0 mt-3">
              <div className="input-group input-group-sm">

                <span className='text-bg-primary input-group-text'>Buscar:</span>
                <input className="form-control form-control-sm"
                  type="text"
                  name="nombre-elemento"
                  placeholder='Buscar por nombre'
                  onChange={(e) => setBuscar((e.target.value))}
                  value={buscar}
                  required
                >
                </input>
              </div>
            </div>
          </Col>
          
          <Col className='p-1' style={{ Height: '470px', overflowY: 'auto' }}>
            <ul className='list-unstyled '>
              {repuestosFiltrados.map((repuesto) => (

                <li key={repuesto.id}>
                  <div className='card w-100 mb-2 p-2'>
                    <div className='repuestos-list-item'>
                      <h6 className="titulo mt-0 mb-0">{repuesto.nombre}</h6>
                      <p className="card-text m-0">{repuesto.marca.nombre}</p>
                      <p className="card-text m-0"><small>{repuesto.modelo}</small></p>
                      <p className="card-text m-0"><small>$ {repuesto.precio}</small></p>
                    </div>
                    <div className='repuestos-list-contenedor-botones'>

                      {repuestoData.id !== repuesto.id ?
                        <div className="d-flex gap-2">
                          <button className='btn btn-primary pt-0 pb-0 btn-sm w-50' onClick={() => editar(repuesto)}>Editar</button>
                          <button className='btn btn-danger pt-0 pb-0 btn-sm w-50' onClick={() => confirmarEliminar(repuesto.id, repuesto.nombre)}>Eliminar</button>
                        </div>
                        :
                        <button className='btn btn-secondary pt-0 pb-0 btn-sm w-100' onClick={() => cancelar()}>Cancelar</button>
                      }
                    </div>
                  </div>
                </li>

              ))}
            </ul>
          </Col>
        </Col>
      </Row>
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
    </div>
  );
};

export default AdministrarRepuestos;
