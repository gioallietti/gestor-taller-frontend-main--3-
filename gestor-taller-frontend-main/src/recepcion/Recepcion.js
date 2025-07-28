import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { urlBase } from '../servicio/Api';
import { Row, Col, Form } from 'react-bootstrap';
import '../recepcion/Recepcion.css';

const Recepcion = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [clienteNombre, setClienteNombre] = useState('');
    const [clienteApellido, setClienteApellido] = useState('');
    const [clienteTelefono, setClienteTelefono] = useState('');
    const [clienteCedula, setClienteCedula] = useState('');
    const [clienteError, setClienteError] = useState(null);
    const [clienteLoading, setClienteLoading] = useState(false);

    const [ingresoUsuarioIngresadoId, setIngresoUsuarioIngresadoId] = useState('');
    const [ingresoUsuarioReparadoId, setIngresoUsuarioReparadoId] = useState('');
    const [ingresoClienteId, setIngresoClienteId] = useState('');
    const [ingresoEquipoId, setIngresoEquipoId] = useState('');
    const [ingresoModelo, setIngresoModelo] = useState('');
    const [ingresoNumeroSerie, setIngresoNumeroSerie] = useState('');
    const [ingresoProblema, setIngresoProblema] = useState('');
    const [ingresoPrioridadId, setIngresoPrioridadId] = useState('');
    const [ingresoFechaIngreso, setIngresoFechaIngreso] = useState('');
    const [ingresoFechaFinalizacion, setIngresoFechaFinalizacion] = useState('');
    const [ingresoEstadoId, setIngresoEstadoId] = useState('');
    const [ingresoDetalle, setIngresoDetalle] = useState('');
    const [ingresoPresupuestado, setIngresoPresupuestado] = useState(false);
    const [ingresoError, setIngresoError] = useState(null);
    const [ingresoLoading, setIngresoLoading] = useState(false);

    const [prioridades, setPrioridades] = useState([]);
    const [estados, setEstados] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const [buscarClienteNombre, setBuscarClienteNombre] = useState('');
    const [buscarEquipoTexto, setBuscarEquipoTexto] = useState(''); //Esto lo puse para buscar
    const [mostrarOpciones, setMostrarOpciones] = useState(false);



    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const usuarioGuardado = JSON.parse(storedUser)
            setUser(usuarioGuardado)
            setIngresoUsuarioIngresadoId(usuarioGuardado.id.toString());
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prioridadesRes, estadosRes, clientesRes, equiposRes, usuariosRes] = await Promise.all([
                    fetch(`${urlBase}/prioridades/todas`),
                    fetch(`${urlBase}/estados/todos`),
                    fetch(`${urlBase}/clientes`),
                    fetch(`${urlBase}/equipos`),
                    fetch(`${urlBase}/usuarios/todos`)
                ]);

                setPrioridades(await prioridadesRes.json());
                setEstados(await estadosRes.json());
                setClientes(await clientesRes.json());
                setEquipos(await equiposRes.json());
                setUsuarios(await usuariosRes.json());
            } catch (error) {
                console.error('Error al cargar datos', error);
                setIngresoError('Error al cargar datos de recepción');
            }
        };

        fetchData();
    }, []);

    const handleClienteSubmit = async (e) => {
        e.preventDefault();
        setClienteLoading(true);
        setClienteError(null);

        try {
            const response = await fetch(`${urlBase}/clientes/crea`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: clienteNombre,
                    apellido: clienteApellido,
                    telefono: clienteTelefono,
                    cedula: clienteCedula,
                })
            });

            if (response.ok) {
                alert('Cliente creado con éxito');
                setClienteNombre('');
                setClienteApellido('');
                setClienteTelefono('');
                setClienteCedula('');
                setClientes(await fetch(`${urlBase}/clientes`).then(res => res.json()));
            } else {
                setClienteError(await response.text());
            }
        } catch (err) {
            setClienteError('Error al crear cliente');
            console.error(err);
        } finally {
            setClienteLoading(false);
        }
    };

    const handleIngresoSubmit = async (e) => {
        e.preventDefault();
        setIngresoLoading(true);
        setIngresoError(null);

        try {
            const response = await fetch(`${urlBase}/ingresos/crea`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ingresadoPor: { id: ingresoUsuarioIngresadoId },
                    cliente: { id: +ingresoClienteId },
                    equipos: { id: +ingresoEquipoId },
                    modelo: ingresoModelo,
                    numeroSerie: ingresoNumeroSerie,
                    problema: ingresoProblema,
                    prioridad: { id: +ingresoPrioridadId },
                    fechaIngreso: ingresoFechaIngreso,
                    fechaFinalizacion: ingresoFechaFinalizacion || null,
                    estado: { id: +ingresoEstadoId },
                    detalle: ingresoDetalle,
                    presupuestado: ingresoPresupuestado,
                    repuestos: [],
                })
            });

            if (response.ok) {
                alert('Ingreso registrado con éxito');
                setIngresoUsuarioIngresadoId('');
                setIngresoUsuarioReparadoId('');
                setIngresoClienteId('');
                setBuscarClienteNombre('');
                setIngresoEquipoId('');
                setIngresoModelo('');
                setIngresoNumeroSerie('');
                setIngresoProblema('');
                setIngresoPrioridadId('');
                setIngresoFechaIngreso('');
                setIngresoFechaFinalizacion('');
                setIngresoEstadoId('');
                setIngresoDetalle('');
                setIngresoPresupuestado(false);
            } else {
                setIngresoError(await response.text());
            }
        } catch (err) {
            setIngresoError('Error al registrar ingreso');
            console.error(err);
        } finally {
            setIngresoLoading(false);
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (!user) return <Navigate to="/" replace />;

    return (
        <div className="container mt-4">
            <h2 className="titulo text-center mb-4">Recepción de Equipos</h2>

            <Row className="justify-content-center">
                <Col lg={4} className="mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4">Registrar Cliente</h5>
                            <Form onSubmit={handleClienteSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={clienteNombre}
                                                onChange={(e) => setClienteNombre(e.target.value)}
                                                required
                                                style={clienteNombre === '' ? { backgroundColor: 'rgba(0, 136, 255, 0.362)' } : {}}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Apellido</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={clienteApellido}
                                                onChange={(e) => setClienteApellido(e.target.value)}
                                                required
                                                style={clienteApellido === '' ? { backgroundColor: 'rgba(0, 136, 255, 0.362)' } : {}}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={clienteTelefono}
                                        onChange={(e) => setClienteTelefono(e.target.value)}
                                        required
                                        style={clienteTelefono === '' ? { backgroundColor: 'rgba(0, 136, 255, 0.362)' } : {}}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cédula</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={clienteCedula}
                                        onChange={(e) => setClienteCedula(e.target.value)}
                                        required
                                        style={clienteCedula === '' ? { backgroundColor: 'rgba(0, 136, 255, 0.362)' } : {}}
                                    />
                                </Form.Group>

                                {clienteError && <div className="alert alert-danger">{clienteError}</div>}

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={clienteLoading}
                                    >
                                        {clienteLoading ? 'Guardando...' : 'Registrar Cliente'}
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Col>

                <Col lg={8}>
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4">Registrar Ingreso de Equipo</h5>
                            <Form onSubmit={handleIngresoSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" style={{ position: 'relative' }}>
                                            <Form.Label>Cliente</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Buscar cliente por nombre"
                                                value={buscarClienteNombre}
                                                onChange={(e) => {
                                                    setBuscarClienteNombre(e.target.value);
                                                    setMostrarOpciones(true);
                                                    setIngresoClienteId('');
                                                }}
                                                autoComplete="off"
                                                required
                                                style={buscarClienteNombre === '' ? { backgroundColor: 'rgba(0, 136, 255, 0.362)' } : {}}
                                            />
                                            {buscarClienteNombre !== '' && mostrarOpciones && (
                                                <div style={{
                                                    position: 'absolute',
                                                    zIndex: 10,
                                                    background: 'white',
                                                    border: '1px solid #ccc',
                                                    width: '100%',
                                                    maxHeight: '150px',
                                                    overflowY: 'auto'
                                                }}>
                                                    <ul className="list-group list-group-flush">
                                                        {clientes
                                                            .filter(c => (c.nombre + ' ' + c.apellido).toLowerCase().includes(buscarClienteNombre.toLowerCase()))
                                                            .map(c => (
                                                                <li
                                                                    key={c.id}
                                                                    className="list-group-item list-group-item-action"
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={() => {
                                                                        setIngresoClienteId(c.id.toString());
                                                                        setBuscarClienteNombre(c.nombre + ' ' + c.apellido);
                                                                        setMostrarOpciones(false);
                                                                    }}
                                                                >
                                                                    {c.nombre} {c.apellido}
                                                                </li>
                                                            ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" style={{ position: 'relative' }}>
                                            <Form.Label>Equipo</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Buscar equipo por tipo o marca"
                                                value={buscarEquipoTexto}
                                                onChange={(e) => {
                                                    setBuscarEquipoTexto(e.target.value);
                                                    setMostrarOpciones(true);
                                                    setIngresoEquipoId('');
                                                }}
                                                autoComplete="off"
                                                required
                                                style={buscarEquipoTexto === '' ? { backgroundColor: 'rgba(0, 136, 255, 0.362)' } : {}}
                                            />
                                            {buscarEquipoTexto !== '' && mostrarOpciones && (
                                                <div style={{
                                                    position: 'absolute',
                                                    zIndex: 10,
                                                    background: 'white',
                                                    border: '1px solid #ccc',
                                                    width: '100%',
                                                    maxHeight: '150px',
                                                    overflowY: 'auto'
                                                }}>
                                                    <ul className="list-group list-group-flush">
                                                        {equipos
                                                            .filter(e => {
                                                                const tipo = e.tipoEquipo?.nombre?.toLowerCase() || '';
                                                                const marca = e.marca?.nombre?.toLowerCase() || '';
                                                                const texto = buscarEquipoTexto.toLowerCase();
                                                                return tipo.includes(texto) || marca.includes(texto);
                                                            })
                                                            .map(e => (
                                                                <li
                                                                    key={e.id}
                                                                    className="list-group-item list-group-item-action"
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={() => {
                                                                        setIngresoEquipoId(e.id.toString());
                                                                        setBuscarEquipoTexto(`${e.tipoEquipo?.nombre} ${e.marca?.nombre}`);
                                                                        setMostrarOpciones(false);
                                                                    }}
                                                                >
                                                                    {e.tipoEquipo?.nombre} {e.marca?.nombre}
                                                                </li>
                                                            ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </Form.Group>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Modelo</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={ingresoModelo}
                                                onChange={(e) => setIngresoModelo(e.target.value)}
                                                required
                                                style={ingresoModelo === '' ? { backgroundColor: 'rgba(0, 136, 255, 0.362)' } : {}}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Número de Serie</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={ingresoNumeroSerie}
                                                onChange={(e) => setIngresoNumeroSerie(e.target.value)}
                                                required
                                                style={ingresoNumeroSerie === '' ? { backgroundColor: 'rgba(0, 136, 255, 0.362)' } : {}}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label>Problema reportado</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        value={ingresoProblema}
                                        onChange={(e) => setIngresoProblema(e.target.value)}
                                        required
                                        style={ingresoProblema === '' ? { backgroundColor: 'rgba(0, 136, 255, 0.362)' } : {}}
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Prioridad</Form.Label>
                                            <Form.Select
                                                value={ingresoPrioridadId}
                                                onChange={(e) => setIngresoPrioridadId(e.target.value)}
                                                required
                                            >
                                                <option value="">Seleccionar...</option>
                                                {prioridades.map(p => (
                                                    <option key={p.id} value={p.id}>{p.nombre}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Fecha de ingreso</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={ingresoFechaIngreso}
                                                onChange={(e) => setIngresoFechaIngreso(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Estado</Form.Label>
                                            <Form.Select
                                                value={ingresoEstadoId}
                                                onChange={(e) => setIngresoEstadoId(e.target.value)}
                                                required
                                            >
                                                <option value="">Seleccionar...</option>
                                                {estados.map(e => (
                                                    <option key={e.id} value={e.id}>{e.nombre}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Detalles adicionales</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={ingresoDetalle}
                                        onChange={(e) => setIngresoDetalle(e.target.value)}
                                        style={ingresoDetalle === '' ? { backgroundColor: 'rgba(0, 136, 255, 0.362)' } : {}}
                                    />
                                </Form.Group>
                                {ingresoError && <div className="alert alert-danger">{ingresoError}</div>}

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={ingresoLoading}
                                    >
                                        {ingresoLoading ? 'Registrando...' : 'Registrar Ingreso'}
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Recepcion;