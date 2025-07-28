import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../administrador/AdministrarUsuarios.css';
import { urlBase } from '../servicio/Api';
import EliminarPorIdFuncion from '../funciones/EliminarPorIdFuncion';
import SelectorGenerico from '../componentes/SelectorGenerico/SelectorGenerico';
import FormularioGenerico from '../componentes/formularioGenerico/FormularioGenerico';
import Cargando from '../componentes/cargando/Cargando';
import ModalGenerico from '../componentes/modalGenerico/ModalGenerico';

const AdministrarUsuarios = () => {

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

  const [tipoUsuarioPorDefecto, setTipoUsuarioPorDefecto] = useState(0);
  const [usuarioData, setUsuarioData] = useState({
    tipoUsuario: { id: tipoUsuarioPorDefecto },
    nombre: '',
    apellido: '',
    cedula: '',
    email: '',
    password: '',
    telefono: '',
  });

  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [tipoUsuarios, setTipoUsuarios] = useState([]);
  const [editando, setEditando] = useState('');
  const [tipoUsuarioId, setTipoUsuarioId] = useState(0);
    const [buscar, setBuscar] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [usuariosRes, tipoUsuariosRes] = await Promise.all([
          fetch(urlBase + '/usuarios/todos'),
          fetch(urlBase + '/TipoUsuarios/todos'),
        ]);

        if (usuariosRes.ok && tipoUsuariosRes.ok) {
          const tipoUsuariosDataRes = await tipoUsuariosRes.json();
          const usuariosDataRes = await usuariosRes.json();
          setTipoUsuarios(tipoUsuariosDataRes);
          setUsuarios(usuariosDataRes);
          setTipoUsuarioPorDefecto(tipoUsuariosDataRes[0].id)

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
        ? urlBase + '/usuarios/' + editando
        : urlBase + '/usuarios/crea';

      const method = editando ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioData),
      });

      if (response.ok) {
        setModal({
          titulo: (editando ? 'Actualización' : 'Registro'),
          texto: (editando ? 'Usuario actualizado exitosamente.' : 'Usuario registrado exitosamente.'),
          mostrarBotonAceptar: true,
          textoBotonAceptar: 'Aceptar',
          funcionAceptado: () => setMostrarModal(false),
          mostrarBotonCancelar: false,
          textoBotonCancelar: 'Cancelar'
        })
        setMostrarModal(true);
        setUsuarioData({
          tipoUsuario: { id: tipoUsuarioPorDefecto },
          nombre: '',
          apellido: '',
          cedula: '',
          email: '',
          password: '',
          telefono: '',
        });
        setEditando(null);

        const updatedUsuarios = await fetch(urlBase + '/usuarios/todos').then((res) =>
          res.json()
        );
        setUsuarios(updatedUsuarios);
      } else {
        const errorText = await response.text();
        console.log(errorText);
        setModal({
          titulo: '¡Ocurrió un Error!',
          texto: (editando ? 'Error al actualizar el usuario.' : 'Error al registrar el usuario.'),
          mostrarBotonAceptar: true,
          textoBotonAceptar: 'Aceptar',
          funcionAceptado: () => setMostrarModal(false),
          mostrarBotonCancelar: false,
          textoBotonCancelar: 'Cancelar'
        })
        setMostrarModal(true);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
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
    }
    setLoading(false);
  };

  const confirmarEliminar = (id, nombre) => {
    setLoading(true);
    setModal({
      titulo: '¿Eliminar?',
      texto: `Vas a eliminar el siguiente usuario: "${nombre}".`,
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
    const url = `${urlBase}/usuarios/${id}`;
    const exito = await EliminarPorIdFuncion(id, usuarios, setUsuarios, url);
    if (exito) {
      setModal({
        titulo: 'Eliminado',
        texto: 'Se a eliminado correctamente el usuario "' + nombre + '".',
        mostrarBotonAceptar: true,
        textoBotonAceptar: 'Aceptar',
        funcionAceptado: () => setMostrarModal(false),
        mostrarBotonCancelar: false,
        textoBotonCancelar: 'Cancelar'
      })
    } else {
      setModal({
        titulo: 'Algo salió mal',
        texto: 'No se pudo eliminar el usuario.',
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

  const editar = (usuario) => {
    setLoading(true);
    setEditando(usuario.id);
    setUsuarioData(usuario);
    setLoading(false);
  };

  const cancelar = () => {
    setLoading(true);
    setEditando('');
    setUsuarioData({
      tipoUsuario: { id: tipoUsuarioPorDefecto },
      nombre: '',
      apellido: '',
      cedula: '',
      email: '',
      password: '',
      telefono: '',
    });
    setLoading(false);
  };

    useEffect(() => {
      let filtrarUsuarios = [];
  
      filtrarUsuarios = usuarios.filter((usuario) => {
        return usuario.nombre.toLowerCase().includes(buscar.toLowerCase())
      })
  
      if (tipoUsuarioId !== 0) {
        const filtrados = filtrarUsuarios.filter((usuario) => {
          return usuario.tipoUsuario.id === tipoUsuarioId;
        });
  
        filtrarUsuarios = filtrados;
      }
  
      setUsuariosFiltrados(filtrarUsuarios)
    }, [usuarios, buscar, tipoUsuarioId]);

  //-----------------------------------
  if (loading) {
    return <Cargando />;
  }

  return (
    <div className="container register-container">
      <h3 className='titulo'>Gestionar Usuarios</h3>
      <Row className="row justify-content-center">
        <Col className='card m-2' xs={12} lg={5} style={{ maxWidth: '400px', height: '470px' }}>
          <form onSubmit={registrarActualizar}>

            <FormularioGenerico
              entidadData={usuarioData}
              setEntidadData={setUsuarioData}
              mostrarNombre
              mostrarApellido
              mostrarTelefono
              mostrarCedula
              mostrarEmail
              mostrarPassword
            />
            <div className="mt-4">
              <SelectorGenerico
                elementos={tipoUsuarios}
                elementoId={usuarioData.tipoUsuario.id}
                onChange={(id) => setUsuarioData({ ...usuarioData, tipoUsuario: { id } })}
              />
            </div>

            <button className='btn btn-primary mt-4 mb-4' type="submit">{editando ? 'Actualizar' : 'Registrar'} Usuario</button>
          </form>
        </Col>

        <Col className='card m-2' xs={12} lg={5} style={{ maxWidth: '400px', height: '470px' }}>
          <Col xs={12} className="mb-0 mt-0 mt-4">
            <div className="mb-0 mt-0 m-0 mt-0">
              <div className="input-group input-group-sm">
                <span className='text-bg-primary input-group-text'>Filtrar por Rol:</span>
                 <SelectorGenerico
                elementos={[{ id: 0, nombre: 'Todos' }, ...tipoUsuarios]}
                elementoId={tipoUsuarioId}
                onChange={(id) => setTipoUsuarioId(id)}
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
              {usuariosFiltrados.map((usuario) => (

                <li key={usuario.id}>
                  <div className='card w-100 mb-2 p-2'>
                    <div className='usuarios-list-item'>
                      <h6 className="titulo mt-0 mb-0">{usuario.nombre} {usuario.apellido}</h6>
                      <p className="card-text m-1 mb-0">{usuario.tipoUsuario.nombre}</p>
                      <p className="card-text m-1 mt-0 mb-0"><small><small>{usuario.telefono}</small> | {usuario.email}</small></p>
                   <p className="card-text m-1 mt-0"><small><small>C.I.: {usuario.cedula}</small></small></p>
                    </div>
                    <div className='usuarios-list-contenedor-botones'>

                      {usuarioData.id !== usuario.id ?
                        <div className="d-flex gap-2">
                          <button className='btn btn-primary pt-0 pb-0 btn-sm w-50' onClick={() => editar(usuario)}>Editar</button>
                          <button className='btn btn-danger pt-0 pb-0 btn-sm w-50' onClick={() => confirmarEliminar(usuario.id, usuario.nombre)}>Eliminar</button>
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

export default AdministrarUsuarios;
