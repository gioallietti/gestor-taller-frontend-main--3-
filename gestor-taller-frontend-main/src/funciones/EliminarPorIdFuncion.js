import ModalGenerico from "../componentes/modalGenerico/ModalGenerico";

const EliminarPorIdFuncion = async (id, array, setArray, url) => {

    const elemento = array.find(e => e.id === id);
    if (!elemento)  return false;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (response.ok) {
            setArray(array.filter((v) => v.id !== id));
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export default EliminarPorIdFuncion;
