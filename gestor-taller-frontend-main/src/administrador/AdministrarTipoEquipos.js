import { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import '../administrador/AdministrarTipoEquipos.css';
import { urlBase } from '../servicio/Api';
import { Navigate } from 'react-router-dom';
import FiltroBuscar from '../componentes/filtroBuscar/FiltroBuscar';
import EliminarPorIdFuncion from '../funciones/EliminarPorIdFuncion';
import RegistrarActualizar from '../componentes/registrar-actualizar/RegistrarActualizar';
import Cargando from '../componentes/cargando/Cargando';
import ModalGenerico from '../componentes/modalGenerico/ModalGenerico';

const AdministrarTipoEquipos = () => {

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

    const [tipoEquipoData, setTipoEquipoData] = useState({
        nombre: '',
    });

    const [tipoEquipos, setTipoEquipos] = useState([]);
    const [editando, setEditando] = useState('');
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
                const [tipoEquipoRes] = await Promise.all([
                    fetch(urlBase + '/TipoEquipos/todos'),
                ]);

                if (tipoEquipoRes.ok) {
                    const tipoEquipoDataRes = await tipoEquipoRes.json();
                    setTipoEquipos(tipoEquipoDataRes);

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
                ? urlBase + '/TipoEquipos/' + editando
                : urlBase + '/TipoEquipos/crea';

            const method = editando ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tipoEquipoData),
            });

            if (response.ok) {
                setModal({
                    titulo: (editando ? 'Actualización' : 'Registro'),
                    texto: (editando ? 'Tipo de equipo actualizado exitosamente.' : 'Tipo de equipo registrado exitosamente.'),
                    mostrarBotonAceptar: true,
                    textoBotonAceptar: 'Aceptar',
                    funcionAceptado: () => setMostrarModal(false),
                    mostrarBotonCancelar: false,
                    textoBotonCancelar: 'Cancelar'
                })
                setMostrarModal(true);
                setTipoEquipoData({
                    nombre: '',
                });
                setEditando(null);

                const updatedTipoEquipo = await fetch(urlBase + '/TipoEquipos/todos').then((res) =>
                    res.json()
                );
                setTipoEquipos(updatedTipoEquipo);
            } else {
                const errorText = await response.text();
                setModal({
                    titulo: '¡Ocurrió un Error!',
                    texto: (editando ? 'Error al actualizar el tipo de equipo.' : 'Error al registrar el tipo de equipo.'),
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
            texto: 'Vas a eliminar el siguiente tipo de equipo: ' + `"${nombre}".`,
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
        const url = `${urlBase}/TipoEquipos/${id}`
        const exito = await EliminarPorIdFuncion(id, tipoEquipos, setTipoEquipos, url);
        if (exito) {
            setModal({
                titulo: 'Eliminado',
                texto: 'Se a eliminado correctamente el tipo de equipo "' + nombre + '".',
                mostrarBotonAceptar: true,
                textoBotonAceptar: 'Aceptar',
                funcionAceptado: () => setMostrarModal(false),
                mostrarBotonCancelar: false,
                textoBotonCancelar: 'Cancelar'
            })
        } else {
            setModal({
                titulo: 'Algo salió mal',
                texto: 'No se pudo eliminar el tipo de equipo.',
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

    const editar = (tipoEquipo) => {
        setLoading(true);
        setEditando(tipoEquipo.id);
        setTipoEquipoData(tipoEquipo);
        setLoading(false);
    };

    const cancelar = () => {
        setLoading(true);
        setEditando('');
        setTipoEquipoData({
            nombre: '',
        });
        setLoading(false);
    };

    //-----------------------------------
    if (loading) {
        return <Cargando />;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }
    return (
        <div className="container register-container">
            <h3 className='titulo'>Tipos de Equipos</h3>
            <Row className="row justify-content-center">
                <RegistrarActualizar
                    registrarActualizar={registrarActualizar}
                    elementoData={tipoEquipoData}
                    setElementoData={setTipoEquipoData}
                    editando={editando}
                    name='tipoEquipo' />

                <FiltroBuscar
                    array={tipoEquipos}
                    arrayData={tipoEquipoData}
                    buscar={buscar}
                    setBuscar={setBuscar}
                    editar={editar}
                    eliminar={confirmarEliminar}
                    cancelar={cancelar} />
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

export default AdministrarTipoEquipos;
