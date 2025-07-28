import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

const SelectorConListaGenerico = ({ ingresoActualizado, setIngresoActualizado, repuestosDisponibles, soloLectura }) => {
  const [repuestoIdSeleccionado, setRepuestoIdSeleccionado] = useState('');

  const agregarRepuesto = () => {
    const id = parseInt(repuestoIdSeleccionado);
    if (!id) return;

    const yaExiste = ingresoActualizado.repuestos.some(r => r.id === id);
    if (yaExiste) return;

    const repuesto = repuestosDisponibles.find(r => r.id === id);
    if (!repuesto) return;

    const nuevosRepuestos = [...ingresoActualizado.repuestos, repuesto];
    setIngresoActualizado({ ...ingresoActualizado, repuestos: nuevosRepuestos });
    setRepuestoIdSeleccionado('');
  };

  const quitarRepuesto = (id) => {
    const nuevosRepuestos = ingresoActualizado.repuestos.filter(r => r.id !== id);
    setIngresoActualizado({ ...ingresoActualizado, repuestos: nuevosRepuestos });
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-2">
        <select
          className="form-control form-control-sm me-2"
          value={repuestoIdSeleccionado}
          onChange={(e) => setRepuestoIdSeleccionado(e.target.value)}
          disabled={soloLectura}
        >
          <option value="">Seleccionar repuesto</option>
          {repuestosDisponibles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nombre}
            </option>
          ))}
        </select>

        <button
          className="btn btn-sm btn-primary"
          onClick={agregarRepuesto}
          disabled={soloLectura || !repuestoIdSeleccionado}
        >
          Agregar
        </button>
      </div>

 <Row className='d-flex align-items-center p-2 pt-0 pb-0' style={{ Height: '470px', overflowY: 'auto' }}>
        {ingresoActualizado.repuestos.map((repuesto) => (
          <span className='titulo w-auto m-1 p-1 pt-0 pb-0'>
                            {repuesto.nombre}
                            <button
                                className="btn btn-sm btn-danger pt-0 pb-0 m-1 mt-0-mb-0"
                                onClick={() => quitarRepuesto(repuesto.id)}
                                disabled={soloLectura}
                            >
                                Quitar
                            </button>
                        </span>
        ))}
      </Row>
    </div>
  );
};

export default SelectorConListaGenerico;
