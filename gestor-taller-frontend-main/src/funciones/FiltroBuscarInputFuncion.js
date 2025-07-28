    
const FiltroBuscarInputFuncion = (array, buscar) => {
        if (buscar === '') {
            return array;
        }
        return array.filter((elemento) =>
            elemento.nombre.toLowerCase().includes(buscar.toLowerCase()))
    };

export default FiltroBuscarInputFuncion;