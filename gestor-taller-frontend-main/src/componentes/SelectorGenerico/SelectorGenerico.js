import React from 'react';

const SelectorGenerico = ({ elementos = [], elementoId = 0, onChange, soloLectura = false }) => {
  return (
    <select
      className="form-control form-control-sm mt-0"
      onChange={(e) => onChange(parseInt(e.target.value))}
      value={elementoId}
      disabled={soloLectura}
      required
    >
      {elementos.map((item) => (
        <option key={item.id} value={item.id}>
          {item.nombre}
        </option>
      ))}
    </select>
  );
};

export default SelectorGenerico;
