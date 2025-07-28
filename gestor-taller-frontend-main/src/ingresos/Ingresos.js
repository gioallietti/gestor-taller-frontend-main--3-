import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import SelectorGenerico from "../componentes/SelectorGenerico/SelectorGenerico";
import { useLocation, useNavigate } from "react-router-dom";
import { urlBase } from '../servicio/Api';
import Cargando from "../componentes/cargando/Cargando";

const Ingresos = () => {
    const location = useLocation();

    const [ingresos, setIngresos] = useState([]);
    const [prioridades, setPrioridades] = useState([]);
    const [prioridadId, setPrioridadId] = useState(0);
    const [estados, setEstados] = useState([]);
    const [estadoId, setEstadoId] = useState(0);

    const [ingresoFiltrado, setIngresoFiltrado] = useState([]);
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');


    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const [ingresosRes, estadosRes, prioridadesRes] = await Promise.all([
                    fetch(urlBase + '/ingresos/ordenPrioridad'),
                    fetch(urlBase + '/estados/todos'),
                    fetch(urlBase + '/prioridades/todas'),
                ]);

                if (ingresosRes.ok && estadosRes.ok && prioridadesRes.ok) {
                    const ingresosDataRes = await ingresosRes.json();
                    const prioridadesDataRes = await prioridadesRes.json();
                    const estadosDataRes = await estadosRes.json();
                    setIngresos(ingresosDataRes);
                    setPrioridades(prioridadesDataRes);
                    setEstados(estadosDataRes);

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

    useEffect(() => {
        let filtrarIngresos = [];

        filtrarIngresos = ingresos.filter((ingreso) => {
            const fecha = new Date(ingreso.fechaIngreso);
            const desde = fechaDesde ? new Date(fechaDesde) : null;
            const hasta = fechaHasta ? new Date(fechaHasta) : null;

            return (!desde || fecha >= desde) && (!hasta || fecha <= hasta);
        });

        if (estadoId !== 0) {
            const filtrados = filtrarIngresos.filter((ingreso) => {
                return ingreso.estado.id === estadoId;
            });

            filtrarIngresos = filtrados;
        }

        setIngresoFiltrado(filtrarIngresos)
    }, [fechaDesde, fechaHasta, ingresos, estadoId]);

    const ingresoPagina = (ingreso) => {
        const rutaActual = location.pathname;
        navigate(`${rutaActual}/${ingreso.id}`);
    }

    const filtrarPorPrioridad = (ingresos, prioridadId) => {
        if (prioridadId === 0) {
            return ingresos;
        }
        return ingresos.filter((ingreso) => ingreso.prioridad.id === prioridadId);
    };

    //-----------------------------------
    if (loading) {
        return <Cargando />;
    }

    return (
        <div className="">
            <h3 className='titulo'>Ingresos</h3>
            <Row className="row justify-content-end">

                <Col className='card m-2' xs={12} md={11} style={{ height: '520px' }}>
                    <Row className="row justify-content-center">
                        <Col xs={6} lg={3} className="mb-2 mt-0 mt-4">
                            <div className="input-group input-group-sm p-1 pt-0 pb-0">
                                <span className='text-bg-primary input-group-text p-3 pt-0 pb-0'>Estado:</span>
                                <SelectorGenerico
                                    elementos={[{ id: 0, nombre: 'Todos' }, ...estados]}
                                    elementoId={estadoId}
                                    onChange={(id) => setEstadoId(id)}
                                />
                            </div>
                        </Col>

                        <Col xs={6} lg={3} className="mb-2 mt-0 mt-4">
                            <div className="input-group input-group-sm p-1 pt-0 pb-0">
                                <span className='text-bg-primary input-group-text p-3 pt-0 pb-0'>Prioridad:</span>
                                <SelectorGenerico
                                    elementos={[{ id: 0, nombre: 'Todos' }, ...prioridades]}
                                    elementoId={prioridadId}
                                    onChange={(id) => setPrioridadId(id)}
                                />
                            </div>
                        </Col>

                        <Col xs={12} lg={6} className="mb-2 mt-0 mt-4">
                            <div className="input-group input-group-sm p-1 pt-0 pb-0">
                                <span className='text-bg-primary input-group-text p-3 pt-0 pb-0'>Desde:</span>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={fechaDesde}
                                    onChange={(e) => setFechaDesde(e.target.value)}
                                />
                                <span className='text-bg-primary input-group-text p-3 pt-0 pb-0'>Hasta:</span>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={fechaHasta}
                                    onChange={(e) => setFechaHasta(e.target.value)}
                                />
                                <button type="button" className="btn btn-primary btn-sm" onClick={() => { setFechaDesde(''); setFechaHasta(''); }} >Limpiar</button>
                            </div>
                        </Col>
                    </Row>
                    <Col className='p-1' style={{ Height: '470px', overflowY: 'auto' }}>
                        <ul className='list-unstyled '>
                            {filtrarPorPrioridad(ingresoFiltrado, prioridadId).map((ingreso) => (
                                <li key={ingreso.id}>
                                    <div className='card w-100 mb-1 p-2'>
                                        <Row onClick={() => ingresoPagina(ingreso)} className="d-flex cursor">

                                            <Col xs={12} sm={10} lg={11} className='usuarios-list-item cursor'>
                                                <Row className="d-flex">
                                                    <Col xs={12} sm={6} lg={4} className="card-text mt-0">{ingreso.modelo}</Col>
                                                    <Col xs={12} sm={6} lg={3} className="card-text mt-0"><small><small>Serie: </small></small>{ingreso.numeroSerie}</Col>
                                                    <Col xs={12} sm={6} lg={3} className="card-text mt-0"><small><small>Ingreso: </small></small>{ingreso.fechaIngreso}</Col>
                                                    <Col xs={12} sm={6} lg={2} className="card-text mt-0"><small>{ingreso.estado.nombre}</small></Col>
                                                </Row>

                                            </Col>
                                            <Col xs={12} sm={2} lg={1} className='usuarios-list-item p-2 pt-0 pb-0'>
                                                <p className="titulo p-0 m-0"
                                                    style={ingreso.prioridad.id === 1 ? { background: ' red' } :
                                                        ingreso.prioridad.id === 2 ? { background: ' yellow' } :
                                                            ingreso.prioridad.id === 3 ? { background: ' green' } : {}}>
                                                    {ingreso.prioridad.nombre}
                                                </p>
                                            </Col>
                                        </Row>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Col>
            </Row>
        </div>
    )
}

export default Ingresos;