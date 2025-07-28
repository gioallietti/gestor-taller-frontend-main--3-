import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../administrador/AdministrarMarcas.css';
import { urlBase } from '../servicio/Api';
import { Navigate } from 'react-router-dom';
import FiltroBuscar from '../componentes/filtroBuscar/FiltroBuscar';
import EliminarPorIdFuncion from '../funciones/EliminarPorIdFuncion';
import FormularioGenerico from '../componentes/formularioGenerico/FormularioGenerico';
import Cargando from '../componentes/cargando/Cargando';
import ModalGenerico from '../componentes/modalGenerico/ModalGenerico';

const AdministrarMarcas = () => {

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

    const [marcaData, setMarcaData] = useState('');

    const [marcas, setMarcas] = useState([]);
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
                const [marcaRes] = await Promise.all([
                    fetch(urlBase + '/marcas/todas'),
                ]);

                if (marcaRes.ok) {
                    const marcasDataRes = await marcaRes.json();
                    setMarcas(marcasDataRes);

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
                ? urlBase + '/marcas/' + editando
                : urlBase + '/marcas/crea';

            const method = editando ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(marcaData),
            });

            if (response.ok) {
                setModal({
                    titulo: (editando ? 'Actualización' : 'Registro'),
                    texto: (editando ? 'Marca actualizada exitosamente.' : 'Marca registrada exitosamente.'),
                    mostrarBotonAceptar: true,
                    textoBotonAceptar: 'Aceptar',
                    funcionAceptado: () => setMostrarModal(false),
                    mostrarBotonCancelar: false,
                    textoBotonCancelar: 'Cancelar'
                })
                setMostrarModal(true);
                setMarcaData({
                    nombre: '',
                });
                setEditando(null);

                const updatedMarca = await fetch(urlBase + '/marcas/todas').then((res) =>
                    res.json()
                );
                setMarcas(updatedMarca);
            } else {
                const errorText = await response.text();
                setModal({
                    titulo: '¡Ocurrió un Error!',
                    texto: (editando ? 'Error al actualizar la marca.' : 'Error al registrar la marca.'),
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
        } finally {
            setLoading(false);
        }
    };

    const confirmarEliminar = (id, nombre) => {
        setLoading(true);
        setModal({
            titulo: '¿Eliminar?',
            texto: 'Vas a eliminar la siguiente marca: ' + `"${nombre}".`,
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
        const url = `${urlBase}/marcas/${id}`
        const exito = await EliminarPorIdFuncion(id, marcas, setMarcas, url);
        if (exito) {
            setModal({
                titulo: 'Eliminado',
                texto: 'Se a eliminado correctamente la marca "' + nombre + '".',
                mostrarBotonAceptar: true,
                textoBotonAceptar: 'Aceptar',
                funcionAceptado: () => setMostrarModal(false),
                mostrarBotonCancelar: false,
                textoBotonCancelar: 'Cancelar'
            })
        } else {
            setModal({
                titulo: 'Algo salió mal',
                texto: 'No se pudo eliminar la marca.',
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

    const editar = (marca) => {
        setLoading(true);
        setEditando(marca.id);
        setMarcaData(marca);
        setLoading(false);
    };

    const cancelar = () => {
        setLoading(true);
        setEditando('');
        setMarcaData('');
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
            <h3 className='titulo'>Gestionar Marcas</h3>
            <Row className="row justify-content-center">
                <Col className='card m-2' xs={12} lg={5} style={{ maxWidth: '400px', height: '470px' }}>
                    <form onSubmit={registrarActualizar}>

                        <FormularioGenerico
                            entidadData={marcaData}
                            setEntidadData={setMarcaData}
                            mostrarNombre
                        />
                        <button className='btn btn-primary mt-4 mb-4' type="submit">{editando ? 'Actualizar' : 'Registrar'} Marca</button>
                    </form>
                </Col>
                <FiltroBuscar
                    array={marcas}
                    arrayData={marcaData}
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

export default AdministrarMarcas;
