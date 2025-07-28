import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { urlBase } from '../servicio/Api';
import { Col, Row } from "react-bootstrap";
import FormularioGenerico from "../componentes/formularioGenerico/FormularioGenerico";
import Cargando from "../componentes/cargando/Cargando";
import SelectorGenerico from "../componentes/SelectorGenerico/SelectorGenerico";
import SelectorConListaGenerico from "../componentes/selectorConListaGenerico/SelectorConListaGenerico";

const IngresoPagina = () => {

    const { id } = useParams();
    const [ingresoData, setIngresoData] = useState('');
    const [ingresoActualizado, setIngresoActualizado] = useState('');

    const [prioridades, setPrioridades] = useState([]);
    const [estados, setEstados] = useState([]);

    const [repuestos, setRepuestos] = useState([]);
    const [repuestoId, setRepuestoId] = useState(0);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const [ingresoRes, estadosRes, prioridadesRes, repuestosRes] = await Promise.all([
                    fetch(urlBase + '/ingresos/' + id),
                    fetch(urlBase + '/estados/todos'),
                    fetch(urlBase + '/prioridades/todas'),
                    fetch(urlBase + '/repuestos/todos'),
                ]);

                if (ingresoRes.ok && estadosRes.ok && prioridadesRes.ok && repuestosRes.ok) {
                    const ingresoDataRes = await ingresoRes.json();
                    const prioridadesDataRes = await prioridadesRes.json();
                    const estadosDataRes = await estadosRes.json();
                    const repuestosDataRes = await repuestosRes.json();
                    console.log('data del fech')
                    setIngresoData(ingresoDataRes);
                    setIngresoActualizado(ingresoDataRes);
                    setPrioridades(prioridadesDataRes);
                    setEstados(estadosDataRes);
                    setRepuestos(repuestosDataRes);
                    console.log(repuestosDataRes)

                } else {
                    console.error('Error al obtener datos');
                }
            } catch (error) {
                console.error('Error al conectar con el servidor:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const redirigirAWhatsapp = () => {
        const numero = ingresoActualizado.cliente.telefono;
        const mensaje = `Su equipo ${ingresoActualizado.modelo} está ${ingresoActualizado.estado.nombre}. Solución al problema planteado: ${ingresoActualizado.detalle}.`

        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank'); // Abre en una nueva pestaña
    };

    //-----------------------------------
    if (loading) {
        return <Cargando />;
    }

    if (ingresoData === '' && !loading) {
        return <h3 className="titulo">No se encontró en producto</h3>;
    }
    return (
        <div className="container register-container">
            <h3 className='titulo'>{ingresoData.modelo}</h3>
            <Row className="row justify-content-center">
                <Col className='card m-2' xs={12} lg={6} style={{ maxWidth: '400px', height: '520px' }}>
                    <div className="mt-2">
                        <h5 className="titulo p-0"
                            style={ingresoData.prioridad.id === 1 ? { background: ' red' } :
                                ingresoData.prioridad.id === 2 ? { background: ' yellow' } :
                                    ingresoData.prioridad.id === 3 ? { background: ' green' } : {}}>
                            Prioridad {ingresoData.prioridad.nombre}
                        </h5>
                    </div>
                    <h6 className="titulo text-start m-0 mb-3 mt-0 p-1">
                        <p className="m-1 mb-0 mt-1"><span>Orden Nº: </span>{ingresoData.id}</p>
                        <p className="m-1 mb-0 mt-0">{ingresoData.cliente.nombre} {ingresoData.cliente.apellido}</p>
                    </h6>
                    <h6 className="titulo text-start m-0 mb-3 mt-0 p-1">
                        <p className="m-1 mb-0 mt-1 text-uppercase">{ingresoData.modelo}</p>
                        <span className="m-1 mb-2 mt-0 text-uppercase">{ingresoData.numeroSerie}</span>
                    </h6>
                    <h6 className="titulo text-start m-0 mb-3 mt-0 p-1">
                        <span className="m-1 mb-0 mt-0">Problema: </span>
                        <p className="m-1"><small>{ingresoData.problema}</small></p>
                    </h6>
                    <h6 className="titulo text-start m-0 mb-3 mt-0 p-1">
                        <span className="m-1 mb-1 mt-0">Solución: </span>
                        {ingresoData.detalle === '' ? <p className="m-1"><small>Sin determinar</small></p> : <p className="m-1"><small>{ingresoData.detalle}</small></p>}
                    </h6>
                    <h6 className="titulo text-start m-0 mb-3 mt-0 p-1">
                        <p className="m-1 mb-1 mt-0"><span>Estado: </span>{ingresoData.estado.nombre}</p>
                        <p className="m-1 mb-1 mt-0"><span>Presupuestado: </span>{ingresoData.presupuestado ? 'No' : 'Si'}</p>
                    </h6>
                    <h6 className="titulo text-start  m-0 mb-3 mt-0 p-1">
                        <span className="m-1 mb-1 mt-0">Ingresado por: </span>
                        <p className="m-1">{ingresoData.registradoPor.nombre} {ingresoData.registradoPor.apellido}</p>
                    </h6>
                </Col>
                {ingresoData.estado.id === 2 ?
                    <>
                        <Col className='card m-2' xs={12} lg={6} style={{ maxWidth: '400px', height: '520px' }}>
                            <div className="mt-2">
                                <h5 className="titulo p-0">
                                    Este equipo ya fue reparado </h5>
                            </div>

                            <span className="m-1 mb-1 mt-0">Retomar: </span>
                            <div className='mb-3'>
                                <SelectorGenerico
                                    elementos={[...estados]}
                                    elementoId={ingresoActualizado.estado.id}
                                    onChange={(id) => setIngresoActualizado({ ...ingresoActualizado, estado: { id } })}
                                />
                                {ingresoActualizado.estado.id === ingresoData.estado.id ? '' :
                                    <>
                                        <p className="mt-3 m-1 text-warning">*Los cambios que se hagan al retomar quedaran registrados.</p>
                                    </>}
                            </div>

                        </Col>
                    </> :
                    <>
                        <Col className='card m-2' xs={12} lg={6} style={{ maxWidth: '400px', overflowY: 'auto', height: '520px' }}>
                            <div className="mt-2">
                                <span className="m-1 mb-1 mt-0">Cambiar Prioridad: </span>
                                <h6 className="titulo p-0"
                                    style={ingresoActualizado.prioridad.id === 1 ? { background: 'red' } :
                                        ingresoActualizado.prioridad.id === 2 ? { background: 'yellow' } :
                                            ingresoActualizado.prioridad.id === 3 ? { background: 'green' } : {}}>
                                    <SelectorGenerico
                                        elementos={[...prioridades]}
                                        elementoId={ingresoActualizado.prioridad.id}
                                        onChange={(id) => setIngresoActualizado({ ...ingresoActualizado, prioridad: { id } })}
                                    />
                                </h6>
                            </div>

                            <span className="m-1 mb-1 mt-0">Cambiar Estado: </span>
                            <div className='mb-3'>
                                <SelectorGenerico
                                    elementos={[...estados]}
                                    elementoId={ingresoActualizado.estado.id}
                                    onChange={(id) => setIngresoActualizado({ ...ingresoActualizado, estado: { id } })}
                                />
                            </div>

                            <div className="text-start  m-0 mb-1 mt-0 p-0">
                                <span className="m-1 mb-1 mt-0">Editar Solución: </span>
                                <FormularioGenerico
                                    marginTop={0}
                                    marginbottom={3}
                                    entidadData={ingresoActualizado}
                                    setEntidadData={setIngresoActualizado}
                                    mostrarDetalle
                                />
                            </div>

                            <span className="m-1 mb-1 mt-0">Repuestos: </span>
                            <div className='mb-3'>
                                <SelectorConListaGenerico
                                    ingresoActualizado={ingresoActualizado}
                                    setIngresoActualizado={setIngresoActualizado}
                                    repuestosDisponibles={repuestos}
                                    soloLectura={false}
                                />
                            </div>

                            <h6 className="titulo text-start m-0 mb-3 mt-0 p-0">
                                <FormularioGenerico
                                    marginTop={1}
                                    marginbottom={1}
                                    entidadData={ingresoActualizado}
                                    setEntidadData={setIngresoActualizado}
                                    mostrarPresupuestado
                                />
                            </h6>
                            <button className='btn btn-secondary pt-0 pb-0 btn-sm w-100' onClick={() => redirigirAWhatsapp()}>Informar al cliente</button>
                        </Col>
                    </>
                }
            </Row>
        </div>
    )
}

export default IngresoPagina;