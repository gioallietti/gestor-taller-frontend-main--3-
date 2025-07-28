import React from 'react';

const FormularioGenerico = ({
  entidadData,
  setEntidadData,
  marginTop = 3,//del 0 al 5
  marginbottom = 4,//del 0 al 5
  mostrarNombre = false,
  mostrarApellido = false,
  mostrarCedula = false,
  mostrarTelefono = false,
  mostrarEmail = false,
  mostrarPassword = false,
  mostrarModelo = false,
  mostrarPrecio = false,
  mostrarDescripcion = false,
  mostrarCantidad = false,
  mostrarNivel = false,
  mostrarNumeroSerie = false,
  mostrarProblema = false,
  mostrarDetalle = false,
  mostrarPresupuestado = false,
  soloLectura = false
}) => {
  const manejoDeCambios = (e) => {
    const { name, value } = e.target;
    setEntidadData({ ...entidadData, [name]: value });
  };

  const colorCampoVacio = 'rgba(255, 0, 0, 0.36)'

  return (
    <>
      {mostrarNombre && (
        <input
          className={`form-control form-control-sm mt-${marginTop} mb-${marginbottom}`}
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={entidadData.nombre}
          onChange={manejoDeCambios}
          readOnly={soloLectura}
          required
        />)}

      {mostrarApellido && (
        <input
          className={`form-control form-control-sm mt-${marginTop} mb-${marginbottom}`}
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={entidadData.apellido}
          onChange={manejoDeCambios}
          readOnly={soloLectura}
          required
        />)}

      {mostrarCedula && (
        <input
           className={`form-control form-control-sm mt-${marginTop} mb-${marginbottom}`}
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={entidadData.cedula}
          onChange={manejoDeCambios}
          readOnly={soloLectura}
          required
        />)}

      {mostrarEmail && (
        <input
           className={`form-control form-control-sm mt-${marginTop} mb-${marginbottom}`}
          type="email"
          name="email"
          placeholder="Email"
          value={entidadData.email}
          onChange={manejoDeCambios}
          readOnly={soloLectura}
          required
        />)}

      {mostrarPassword && (
        <input
           className={`form-control form-control-sm mt-${marginTop} mb-${marginbottom}`}
          type="password"
          name="password"
          placeholder="Contraseña"
          value={entidadData.password}
          onChange={manejoDeCambios}
          readOnly={soloLectura}
          required
        />)}

      {mostrarTelefono && (
        <input
           className={`form-control form-control-sm mt-${marginTop} mb-${marginbottom}`}
          type="phone"
          name="telefono"
          placeholder="Teléfono"
          value={entidadData.telefono}
          onChange={manejoDeCambios}
          readOnly={soloLectura}
          required
        />)}

      {mostrarModelo && (
        <input
           className={`form-control form-control-sm mt-${marginTop} mb-${marginbottom}`}
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={entidadData.modelo}
          onChange={manejoDeCambios}
          readOnly={soloLectura}
          required
        />)}

         {mostrarNumeroSerie && (
        <input
           className={`form-control form-control-sm mt-${marginTop} mb-${marginbottom}`}
          type="text"
          name="mumeroSerie"
          placeholder="Numero de Serie"
          value={entidadData.numeroSerie}
          onChange={manejoDeCambios}
          readOnly={soloLectura}
          required
        />)}

      {mostrarPrecio && (
        <input
           className={`form-control form-control-sm mt-${marginTop} mb-${marginbottom}`}
          type="number"
          name="precio"
          placeholder="Precio"
          value={entidadData.precio}
          onChange={manejoDeCambios}
          readOnly={soloLectura}
          required
        />)}

      {mostrarDescripcion && (
        <textarea
           className={`form-control form-control-sm mt-${marginTop} mb-${marginbottom}`}
          type="text"
          name="descripcion"
          placeholder="Descripcion"
          value={entidadData.descripcion}
          onChange={manejoDeCambios}
          readOnly={soloLectura}
          style={{ resize: 'none'}}
        />)}

      {mostrarCantidad && (
        <input
           className={`form-control form-control-sm mt-${marginTop} mb-${marginbottom}`}
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={entidadData.cantidad}
          onChange={manejoDeCambios}
          readOnly={soloLectura}
          required
        />)}

      {mostrarNivel && (
        <input
           className={`form-control form-control-sm mt-${marginTop} mb-${marginbottom}`}
          type="number"
          name="nivel"
          placeholder="Nivel"
          value={entidadData.nivel}
          onChange={manejoDeCambios}
          readOnly={soloLectura}
          required
        />)}

      {mostrarProblema && (
        <input
           className={`form-control form-control-sm mt-${marginTop} mb-${marginbottom}`}
          type="text"
          name="problema"
          placeholder="Problema"
          value={entidadData.problema}
          onChange={manejoDeCambios}
          readOnly={soloLectura}
          required
        />)}

      {mostrarDetalle && (
        <textarea
           className={`form-control form-control-sm mt-${marginTop} mb-${marginbottom}`}
          type="text"
          name="detalle"
          placeholder="Detalle"
          value={entidadData.detalle}
          onChange={manejoDeCambios}
          readOnly={soloLectura}
          required
          style={{ resize: 'none' }}
        />)}

      {mostrarPresupuestado && (
        <div className={`form-check m-3 mt-${marginTop} mb-${marginbottom}`}>
          <input
            className="form-check-input"
            type="checkbox"
            name="presupuestado"
            checked={entidadData.presupuestado}
            disabled={soloLectura}
            onChange={(e) =>
              setEntidadData({ ...entidadData, presupuestado: e.target.checked })
            }
          />
          <label className="form-check-label">Presupuestado</label>
        </div>)}
    </>
  );
};

export default FormularioGenerico;