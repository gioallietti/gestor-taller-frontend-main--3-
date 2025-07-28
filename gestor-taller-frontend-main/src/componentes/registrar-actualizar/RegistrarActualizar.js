import { Col } from "react-bootstrap";

const RegistrarActualizar = ({ registrarActualizar,  elementoData, setElementoData, editando, name}) => {

    const colorCampoVacio = 'rgba(0, 136, 255, 0.362)'
    
    return (
        <Col className='card m-2' xs={12} lg={5} style={{ maxWidth: '400px' }}>
            <form onSubmit={registrarActualizar}>
                <input
                    className="form-control form-control-sm mt-4"
                    type="text"
                    name={`nombre-${name}`}
                    placeholder="Ingrese nombre"
                    value={elementoData.nombre}
                    style={elementoData.nombre === '' ? { backgroundColor: colorCampoVacio } : {}}
                    onChange={(e) => setElementoData({ nombre: e.target.value })}
                    required
                />
                <button className='btn btn-primary mt-4 mb-4' type="submit">{editando ? 'Actualizar' : 'Registrar'}</button>
            </form>
        </Col>
    )
}
export default RegistrarActualizar;
