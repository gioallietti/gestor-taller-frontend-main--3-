import { Modal, Button } from 'react-bootstrap';

const ModalGenerico = ({
    mostrarModal,
    ocultarModal,
    titulo = 'Confirmación',
    texto = '¿Estás seguro?',
    mostrarBotonAceptar = true,
    textoBotonAceptarModal = 'Aceptar',
    aceptado = () => {},
    mostrarBotonCancelar = true,
    textoBotonCancelarModal = 'Cancelar'
}) => {
    
    return (
        <Modal show={mostrarModal} onHide={ocultarModal} centered>
            <Modal.Header >
                <Modal.Title className='titulo w-100'>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='small'>{texto}</Modal.Body>
            <Modal.Footer>
                {mostrarBotonAceptar && (
                    <Button variant="danger" onClick={aceptado}>
                        {textoBotonAceptarModal}
                    </Button>
                )}
                {mostrarBotonCancelar && (
                    <Button variant="secondary" onClick={ocultarModal}>
                        {textoBotonCancelarModal}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default ModalGenerico;
