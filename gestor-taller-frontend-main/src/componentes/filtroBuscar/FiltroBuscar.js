import { Col } from 'react-bootstrap';
import FiltroBuscarInput from '../../funciones/FiltroBuscarInputFuncion';


const FiltroBuscar = ({ array, arrayData, buscar, setBuscar, editar, eliminar, cancelar }) => {

    return (
        <Col className='card m-2' xs={12} lg={5} style={{ maxWidth: '400px', height: '470px' }}>
            <div className="mb-2 mt-0 m-1 mt-4">
                <div className="input-group input-group-sm">
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
            <Col className='p-1' style={{ height: '470px', overflowY: 'auto' }}>
                <ul className='list-unstyled '>
                    {FiltroBuscarInput(array, buscar).map((elemento) => (
                        <li key={elemento.id}>
                            <div className='card w-100 mb-2 p-2'>
                                <div className='array-list-item'>
                                    <h6 className="titulo mt-0">{elemento.nombre}</h6>
                                </div>
                                <div className='array-list-contenedor-botones'>
                                    {arrayData.id !== elemento.id ?
                                        <div className="d-flex gap-2">
                                            <button className='btn btn-primary pt-0 pb-0 btn-sm w-50' onClick={() => editar(elemento)}>Editar</button>
                                            <button className='btn btn-danger pt-0 pb-0 btn-sm w-50' onClick={() => eliminar(elemento.id, elemento.nombre)}>Eliminar</button>
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
        </Col>)
}
export default FiltroBuscar;