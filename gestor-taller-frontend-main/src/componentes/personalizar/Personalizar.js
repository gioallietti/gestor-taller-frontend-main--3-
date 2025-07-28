import React, { useState } from 'react';
import '../../App.css';
import { Col, Row, Container } from 'react-bootstrap';

const Personalizar = () => {
    const datosDePrueba = [
        {
            id: 1,
            nombre: 'Datos de prueba'
        },
        {
            id: 2,
            nombre: 'Datos de prueba'
        }
    ]

    const [usuarioData, setUsuarioData] = useState({
        tipoUsuario: { id: 2 },
        nombre: '',
        apellido: '',
        cedula: '',
        email: '',
        password: '',
        telefono: '',
    });

    const manejoDeCambios = (e) => {
        const { name, value } = e.target;
        setUsuarioData({ ...usuarioData, [name]: value });
    };

    const [editando, setEditando] = useState('');

    const [arrayData, setArrayData] = useState({
        nombre: '',
    });

    const colorCampoVacio = 'rgba(0, 136, 255, 0.362)'

    const editar = (elemento) => {
        setEditando(elemento.id);
        setArrayData(elemento);
    };

    const cancelar = () => {
        setEditando('');
        setArrayData({
            nombre: '',
        });
    };

    const cambiarEstiloColor = (
        tituloColor,
        textoTituloColor,
        btnPrimaryColor,
        btnPrimaryHoverColor,
        btnDangerColor,
        btnDangerHoverColor,
        btnSecondaryColor,
        btnSecondaryHoverColor,
        inputSelect,
        bodyBg,
        cardBg,
        sombras,
        sombrasBotones,
        placeholder) => {
        document.documentElement.style.setProperty('--titulo', tituloColor);
        document.documentElement.style.setProperty('--titulo-texto', textoTituloColor);
        document.documentElement.style.setProperty('--btn-primary', btnPrimaryColor);
        document.documentElement.style.setProperty('--btn-primary-hover', btnPrimaryHoverColor);
        document.documentElement.style.setProperty('--btn-danger', btnDangerColor);
        document.documentElement.style.setProperty('--btn-danger-hover', btnDangerHoverColor);
        document.documentElement.style.setProperty('--btn-secondary', btnSecondaryColor);
        document.documentElement.style.setProperty('--btn-secondary-hover', btnSecondaryHoverColor);
        document.documentElement.style.setProperty('--input-select', inputSelect);
        document.documentElement.style.setProperty('--body-bg', bodyBg);
        document.documentElement.style.setProperty('--card-bg', cardBg);
        document.documentElement.style.setProperty('--box-shadow', sombras);
        document.documentElement.style.setProperty('--box-shadow-button', sombrasBotones);
        document.documentElement.style.setProperty('--placeholder', placeholder);

        const estilosColor = ({
            tituloColor: tituloColor,
            textoTituloColor: textoTituloColor,
            btnPrimaryColor: btnPrimaryColor,
            btnPrimaryHoverColor: btnPrimaryHoverColor,
            btnDangerColor: btnDangerColor,
            btnDangerHoverColor: btnDangerHoverColor,
            btnSecondaryColor: btnSecondaryColor,
            btnSecondaryHoverColor: btnSecondaryHoverColor,
            inputSelect: inputSelect,
            bodyBg: bodyBg,
            cardBg: cardBg,
            sombras: sombras,
            sombrasBotones: sombrasBotones,
            placeholder: placeholder
        });

        localStorage.setItem('estilosColor', JSON.stringify(estilosColor));
    };

    const cambiarEstiloBordes = (
        bordesGeneral,
        bordesCard) => {
        document.documentElement.style.setProperty('--border-radius', bordesGeneral);
        document.documentElement.style.setProperty('--border-card', bordesCard);

        const estilosBordes = ({
            bordesGeneral: bordesGeneral,
            bordesCard: bordesCard
        });
        localStorage.setItem('estilosBordes', JSON.stringify(estilosBordes));
    };

    return (
        <Container fluid className='container'>
            <h3 className='titulo'>Personalizar</h3>

            <Row className="row justify-content-center">
                <Col className='text-center m-0' xs={12} lg={3} style={{ maxWidth: '400px' }}>
                    <h5 className='titulo m-4 mt-1 mb-1'>Colores</h5>

                    <button className="btn text-white btn-primary btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(0, 136, 255, 0.186)',
                        'rgb(117, 117, 117)',
                        'rgb(97, 151, 226)',
                        'rgb(59, 90, 139)',
                        'rgb(191, 108, 108)',
                        'rgb(139, 59, 59)',
                        'rgba(170, 170, 170, 1)',
                        'rgba(122, 122, 122, 1)',
                        'rgba(137, 190, 236, 0.36)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
                        '2px 2px 5px rgb(100, 100, 100)',
                        '2px 2px 5px rgb(100, 100, 100)',
                        'rgba(102, 102, 102, 1)',
                    )}><small>Claro</small></button>

                    <button className="btn btn-danger btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(255, 255, 255, 1)',
                        'rgba(33, 37, 41, 1)',
                        'rgba(0, 123, 255, 0.76)',
                        'rgba(0, 86, 179, 0.76)',
                        'rgba(220, 53, 69, 1)',
                        'rgba(180, 40, 55, 1)',
                        'rgba(108, 117, 125, 1)',
                        'rgba(73, 80, 87, 1)',
                        'rgba(240, 240, 240, 0.26)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(248, 249, 250, 1)',
                        '2px 2px 5px rgba(0, 0, 0, 0.1)',
                        '2px 2px 5px rgba(0, 0, 0, 0.1)',
                        'rgba(102, 102, 102, 1)',
                    )}><small>Blanco</small></button>

                    <button className="btn btn-secondary btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(225, 245, 254, 1)',
                        'rgba(0, 60, 90, 1)',
                        'rgba(0, 172, 237, 0.76)',
                        'rgba(0, 139, 193, 0.76)',
                        'rgba(255, 82, 82, 1)',
                        'rgba(200, 60, 60, 1)',
                        'rgba(179, 229, 252, 1)',
                        'rgba(100, 181, 246, 1)',
                        'rgba(179, 229, 252, 0.26)',
                        'rgba(240, 248, 255, 1)',
                        'rgba(230, 245, 255, 1)',
                        '2px 2px 3px rgba(0, 140, 255, 0.1)',
                        '2px 2px 3px rgba(0, 140, 255, 0.1)',
                        'rgba(102, 102, 102, 1)',
                    )}><small>Celeste</small></button>

                    <button className="btn text-white btn-primary btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(0, 136, 255, 0.56)',
                        'rgba(36, 36, 36, 1)',
                        'rgba(39, 116, 223, 1)',
                        'rgba(16, 44, 89, 1)',
                        'rgba(181, 39, 39, 1)',
                        'rgba(95, 13, 13, 1)',
                        'rgba(205, 205, 205, 1)',
                        'rgba(89, 89, 89, 1)',
                        'rgba(0, 136, 255, 0.53)',
                        'rgba(238, 250, 255, 1)',
                        'rgba(223, 242, 255, 1)',
                        '2px 2px 1px rgba(4, 0, 255, 0.51)',
                        '2px 2px 1px rgba(4, 0, 255, 0.51)',
                        'rgba(102, 102, 102, 1)',
                    )}><small>Vivido</small></button>

                    <button className="btn text-white btn-danger btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(255, 0, 128, 0.2)',
                        'rgba(85, 0, 68, 1)',
                        'rgba(0, 200, 255, 0.9)',
                        'rgba(0, 150, 200, 0.9)',
                        'rgba(255, 0, 85, 1)',
                        'rgba(200, 0, 60, 1)',
                        'rgba(255, 105, 180, 1)',
                        'rgba(170, 0, 127, 1)',
                        'rgba(0, 255, 234, 0.3)',
                        'rgba(255, 240, 250, 1)',
                        'rgba(255, 230, 245, 1)',
                        '2px 2px 10px rgba(255, 0, 128, 0.5)',
                        '2px 2px 10px rgba(255, 0, 128, 0.5)',
                        'rgba(102, 102, 102, 1)',
                    )}><small>Fucsia</small></button>

                    <button className="btn text-white btn-secondary btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(255, 255, 224, 1)',
                        'rgba(255, 223, 0, 0.85)',
                        'rgba(204, 179, 0, 0.85)',
                        'rgba(138, 43, 226, 0.9)',
                        'rgba(186, 85, 211, 1)',
                        'rgba(140, 60, 160, 1)',
                        'rgba(255, 255, 102, 1)',
                        'rgba(204, 204, 51, 1)',
                        'rgba(230, 230, 250, 0.3)',
                        'rgba(245, 245, 255, 1)',
                        'rgba(240, 240, 255, 1)',
                        '2px 2px 10px rgba(204, 194, 102, 1)',
                        '2px 2px 10px rgba(153, 102, 204, 1)',
                        'rgba(102, 102, 102, 1)',
                    )}><small>Fluor</small></button>

                    <button className="btn text-white btn-primary btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(20, 20, 20, 1)',
                        'rgba(245, 245, 245, 1)',
                        'rgba(50, 50, 50, 0.76)',
                        'rgba(80, 80, 80, 0.76)',
                        'rgba(139, 0, 0, 1)',
                        'rgba(100, 0, 0, 1)',
                        'rgba(80, 80, 80, 1)',
                        'rgba(120, 120, 120, 1)',
                        'rgba(60, 60, 60, 0.26)',
                        'rgba(18, 18, 18, 1)',
                        'rgba(30, 30, 30, 1)',
                        '2px 2px 10px rgba(0, 0, 0, 0.5)',
                        '2px 2px 10px rgba(0, 0, 0, 0.5)',
                        'rgba(102, 102, 102, 1)',
                        'rgba(102, 102, 102, 1)',
                    )}><small>Negro</small></button>

                    <button className="btn text-white btn-danger btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(60, 0, 20, 1)',
                        'rgba(255, 230, 240, 1)',
                        'rgba(128, 0, 64, 0.76)',
                        'rgba(102, 0, 51, 0.76)',
                        'rgba(153, 0, 76, 1)',
                        'rgba(102, 0, 51, 1)',
                        'rgba(179, 89, 119, 1)',
                        'rgba(102, 20, 51, 1)',
                        'rgba(102, 0, 51, 0.26)',
                        'rgba(40, 0, 20, 1)',
                        'rgba(60, 10, 30, 1)',
                        '1px 1px 2px rgba(57, 0, 28, 1)',
                        '1px 1px 2px rgba(57, 0, 28, 1)',
                        'rgba(255, 255, 255, 1)',
                    )}><small>Vino</small></button>

                    <button className="btn text-white btn-secondary btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(0, 55, 100, 1)',
                        'rgba(209, 209, 209, 1)',
                        'rgba(0, 46, 111, 1)',
                        'rgba(51, 73, 109, 1)',
                        'rgba(87, 0, 0, 1)',
                        'rgba(131, 43, 43, 1)',
                        'rgba(37, 37, 37, 1)',
                        'rgba(133, 133, 133, 1)',
                        'rgba(171, 171, 171, 0.26)',
                        'rgba(143, 143, 143, 1)',
                        'rgba(37, 45, 60, 1)',
                        '2px 2px 5px rgba(0, 7, 35, 1)',
                        '2px 2px 5px rgba(0, 7, 35, 1)',
                        'rgba(172, 172, 172, 1)',
                    )}><small>Oscuro</small></button>

                    <button className="btn text-white btn-primary btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(10, 25, 49, 1)',
                        'rgba(200, 220, 255, 1)',
                        'rgba(0, 75, 180, 0.8)',
                        'rgba(0, 50, 130, 0.8)',
                        'rgba(180, 40, 40, 1)',
                        'rgba(140, 30, 30, 1)',
                        'rgba(107, 50, 160, 1)',
                        'rgba(72, 25, 113, 1)',
                        'rgba(20, 40, 90, 0.3)',
                        'rgba(5, 15, 35, 1)',
                        'rgba(15, 35, 75, 1)',
                        '2px 2px 5px rgba(0, 0, 0, 0.6)',
                        '2px 2px 5px rgba(0, 0, 0, 0.6)',
                        'rgba(102, 102, 102, 1)',
                    )}><small>Azul</small></button>

                    <button className="btn text-white btn-danger btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(25, 25, 40, 1)',
                        'rgba(230, 230, 240, 1)',
                        'rgba(70, 70, 120, 0.85)',
                        'rgba(50, 50, 90, 0.85)',
                        'rgba(200, 80, 80, 1)',
                        'rgba(150, 60, 60, 1)',
                        'rgba(115, 100, 150, 1)',
                        'rgba(72, 61, 95, 1)',
                        'rgba(40, 40, 70, 0.3)',
                        'rgba(15, 15, 30, 1)',
                        'rgba(30, 30, 55, 1)',
                        '2px 2px 5px rgba(0, 0, 0, 0.7)',
                        '2px 2px 5px rgba(0, 0, 0, 0.7)',
                        'rgba(102, 102, 102, 1)',
                    )}><small>Noche</small></button>

                    <button className="btn text-white btn-secondary btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(33, 37, 41, 1)',
                        'rgba(220, 220, 220, 1)',
                        'rgba(73, 80, 87, 0.76)',
                        'rgba(108, 117, 125, 0.76)',
                        'rgba(200, 35, 51, 1)',
                        'rgba(139, 0, 0, 1)',
                        'rgba(108, 117, 125, 1)',
                        'rgba(73, 80, 87, 1)',
                        'rgba(52, 58, 64, 0.26)',
                        'rgba(23, 26, 29, 1)',
                        'rgba(33, 37, 41, 1)',
                        '2px 2px 5px rgba(0, 0, 0, 0.7)',
                        '2px 2px 5px rgba(0, 0, 0, 0.7)',
                        'rgba(141, 141, 141, 1)',
                    )}><small>Carbón</small></button>

                    <button className="btn text-white btn-primary btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(208, 255, 216, 1)',
                        'rgba(17, 53, 18, 1)',
                        'rgba(41, 119, 67, 0.76)',
                        'rgba(23, 69, 39, 0.76)',
                        'rgba(164, 79, 0, 1)',
                        'rgba(122, 76, 19, 1)',
                        'rgba(157, 156, 78, 1)',
                        'rgba(81, 76, 47, 1)',
                        'rgba(12, 179, 0, 0.26)',
                        'rgba(218, 255, 218, 1)',
                        'rgba(212, 255, 214, 1)',
                        '2px 2px 5px rgba(24, 91, 0, 0.55)',
                        '2px 2px 5px rgba(24, 91, 0, 0.55)',
                        'rgba(102, 102, 102, 1)',
                    )}><small>Verdes</small></button>

                    <button className="btn text-white btn-danger btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(255, 217, 217, 1)',
                        'rgba(99, 0, 0, 1)',
                        'rgba(255, 110, 47, 1)',
                        'rgba(153, 41, 0, 0.76)',
                        'rgba(255, 69, 58, 1)',
                        'rgba(175, 47, 38, 1)',
                        'rgba(255, 140, 140, 1)',
                        'rgba(112, 36, 36, 1)',
                        'rgba(255, 194, 194, 0.26)',
                        'rgba(255, 240, 240, 1)',
                        'rgba(255, 225, 225, 1)',
                        '2px 2px 3px rgba(153, 0, 0, 0.4)',
                        '2px 2px 3px rgba(153, 0, 0, 0.4)',
                        'rgba(102, 102, 102, 1)',
                    )}><small>Rojos</small></button>

                    <button className="btn text-white btn-secondary btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(255, 250, 205, 1)',
                        'rgba(102, 85, 0, 1)',
                        'rgba(255, 193, 7, 0.76)',
                        'rgba(204, 153, 0, 0.76)',
                        'rgba(255, 111, 0, 1)',
                        'rgba(175, 77, 0, 1)',
                        'rgba(146, 134, 76, 1)',
                        'rgba(105, 88, 0, 1)',
                        'rgba(255, 255, 128, 0.26)',
                        'rgba(255, 253, 208, 1)',
                        'rgba(255, 249, 196, 1)',
                        '2px 2px 5px rgba(204, 170, 0, 0.4)',
                        '2px 2px 5px rgba(204, 170, 0, 0.4)',
                        'rgba(102, 102, 102, 1)',
                    )}><small>Amarillos</small></button>

                    <button className="btn text-white btn-primary btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(240, 230, 255, 1)',
                        'rgba(60, 0, 102, 1)',
                        'rgba(153, 102, 255, 0.76)',
                        'rgba(102, 51, 204, 0.76)',
                        'rgba(204, 0, 153, 1)',
                        'rgba(153, 0, 102, 1)',
                        'rgba(221, 160, 221, 1)',
                        'rgba(102, 0, 102, 1)',
                        'rgba(221, 187, 255, 0.26)',
                        'rgba(250, 245, 255, 1)',
                        'rgba(243, 230, 255, 1)',
                        '2px 2px 5px rgba(102, 0, 153, 0.4)',
                        '2px 2px 5px rgba(102, 0, 153, 0.4)',
                    )}><small>Morados</small></button>

                    <button className="btn text-white btn-danger btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(255, 239, 213, 1)',
                        'rgba(102, 51, 0, 1)',
                        'rgba(255, 165, 0, 0.76)',
                        'rgba(204, 102, 0, 0.76)',
                        'rgba(255, 87, 34, 1)',
                        'rgba(204, 73, 30, 1)',
                        'rgba(255, 204, 153, 1)',
                        'rgba(153, 76, 0, 1)',
                        'rgba(255, 221, 170, 0.26)',
                        'rgba(255, 248, 230, 1)',
                        'rgba(255, 236, 214, 1)',
                        '2px 2px 5px rgba(204, 102, 0, 0.4)',
                        '2px 2px 5px rgba(204, 102, 0, 0.4)',
                        'rgba(102, 102, 102, 1)',
                    )}><small>Naranjas</small></button>

                    <button className="btn text-white btn-secondary btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(240, 240, 240, 1)',
                        'rgba(33, 37, 41, 1)',
                        'rgba(108, 117, 125, 0.76)',
                        'rgba(73, 80, 87, 0.76)',
                        'rgba(174, 88, 97, 1)',
                        'rgba(188, 60, 73, 1)',
                        'rgba(173, 181, 189, 1)',
                        'rgba(108, 117, 125, 1)',
                        'rgba(206, 212, 218, 0.26)',
                        'rgba(248, 249, 250, 1)',
                        'rgba(233, 236, 239, 1)',
                        '2px 2px 5px rgba(52, 58, 64, 0.2)',
                        '2px 2px 5px rgba(52, 58, 64, 0.2)',
                        'rgba(125, 125, 125, 1)',
                    )}><small>Grises</small></button>

                    <button className="btn text-white btn-primary btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                       'rgba(50, 52, 54, 1)',
                        'rgba(220, 220, 220, 1)',
                        'rgba(29, 44, 59, 0.76)',
                        'rgba(108, 117, 125, 0.76)',
                        'rgba(53, 4, 9, 1)',
                        'rgba(139, 0, 0, 1)',
                        'rgba(108, 117, 125, 1)',
                        'rgba(73, 80, 87, 1)',
                       'rgba(50, 52, 54, 1)',
                       'rgba(50, 52, 54, 1)',
                        'rgba(50, 52, 54, 1)',
                        '0px 2px 2px rgba(50, 52, 54, 1)',
                        '0px 2px 2px rgba(50, 52, 54, 1)',
                        'rgba(141, 141, 141, 1)',
                    )}><small>Plano 1</small></button>

                    <button className="btn text-white btn-danger btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(255, 255, 255, 1)',
                        'rgb(117, 117, 117)',
                        'rgb(97, 151, 226)',
                        'rgb(59, 90, 139)',
                        'rgb(191, 108, 108)',
                        'rgb(139, 59, 59)',
                        'rgba(170, 170, 170, 1)',
                        'rgba(122, 122, 122, 1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
                        '0px 2px 2px rgba(255, 255, 255, 1)',
                        '0px 2px 2px rgba(255, 255, 255, 1)',
                        'rgba(141, 141, 141, 1)',
                    )}><small>Plano 2</small></button>

                    <button className="btn btn-secondary btn-sm m-1 w-25" onClick={() => cambiarEstiloColor(
                        'rgba(225, 245, 254, 1)',
                        'rgba(0, 60, 90, 1)',
                        'rgba(0, 172, 237, 0.76)',
                        'rgba(0, 139, 193, 0.76)',
                        'rgba(255, 82, 82, 1)',
                        'rgba(200, 60, 60, 1)',
                        'rgba(179, 229, 252, 1)',
                        'rgba(225, 245, 254, 1)',
                        'rgba(225, 245, 254, 1)',
                        'rgba(225, 245, 254, 1)',
                        'rgbargba(225, 245, 254, 1)',
                        '2px 2px 3px rgba(225, 245, 254, 1)',
                        '2px 2px 3px rgba(225, 245, 254, 1)',
                        'rgba(102, 102, 102, 1)',
                    )}><small>Plano 3</small></button>


                    <h5 className='titulo m-4 mt-5 mb-3'>Bordes</h5>

                    <button className="btn btn-primary btn-sm m-1 w-25" onClick={() => cambiarEstiloBordes(
                        '50px',
                        '20px'
                    )}><small>Redondos</small></button>

                    <button className="btn btn-danger btn-sm m-1 w-25" onClick={() => cambiarEstiloBordes(
                        '10px',
                        '10px'
                    )}><small>Sutiles</small></button>

                    <button className="btn btn-secondary btn-sm m-1 w-25" onClick={() => cambiarEstiloBordes(
                        '0px',
                        '0px'
                    )}><small>Rectos</small></button>

                    <button className="btn btn-primary btn-sm m-1 w-25" onClick={() => cambiarEstiloBordes(
                        '0px 0px 50px 0px',
                        '0px 0px 40px 0px'
                    )}><small>Barco</small></button>

                    <button className="btn btn-danger btn-sm m-1 w-25" onClick={() => cambiarEstiloBordes(
                        '20px 0px 30px 0px',
                        '20px 0px 40px 0px'
                    )}><small>Elegante</small></button>

                    <button className="btn btn-secondary btn-sm m-1 w-25" onClick={() => cambiarEstiloBordes(
                        '0px 0px 30px 30px',
                        '0px 0px 40px 40px'
                    )}><small>Arco</small></button>
                </Col>
                <Col className='card m-1' xs={12} lg={5} style={{ maxWidth: '400px', height: '470px' }}>
                    <form>
                        <input
                            className="form-control form-control-sm mt-4"
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={usuarioData.nombre}
                            style={usuarioData.nombre === '' ? { backgroundColor: colorCampoVacio } : {}}
                            onChange={manejoDeCambios}
                            required
                        />
                        <input
                            className="form-control form-control-sm mt-4"
                            type="text"
                            name="apellido"
                            placeholder="Apellido"
                            value={usuarioData.apellido}
                            style={usuarioData.apellido === '' ? { backgroundColor: colorCampoVacio } : {}}
                            onChange={manejoDeCambios}
                            required
                        />
                        <input
                            className="form-control form-control-sm mt-4"
                            type="text"
                            name="cedula"
                            placeholder="Cédula"
                            value={usuarioData.cedula}
                            style={usuarioData.cedula === '' ? { backgroundColor: colorCampoVacio } : {}}
                            onChange={manejoDeCambios}
                        />
                        <input
                            className="form-control form-control-sm mt-4"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={usuarioData.email}
                            style={usuarioData.email === '' ? { backgroundColor: colorCampoVacio } : {}}
                            onChange={manejoDeCambios}
                            required
                        />
                        <input
                            className="form-control form-control-sm mt-4"
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={usuarioData.password}
                            style={usuarioData.password === '' ? { backgroundColor: colorCampoVacio } : {}}
                            onChange={manejoDeCambios}
                            required
                        />
                        <input
                            className="form-control form-control-sm mt-4"
                            type="tel"
                            name="telefono"
                            placeholder="Teléfono"
                            value={usuarioData.telefono}
                            style={usuarioData.telefono === '' ? { backgroundColor: colorCampoVacio } : {}}
                            onChange={manejoDeCambios}
                            required
                        />
                        <select
                            className="form-control form-control-sm mt-4"
                            name="TipoUsuario"
                            required
                        >
                            <option key={0} value={0}>
                                Opción 1
                            </option>
                            <option key={1} value={1}>
                                Opción 2
                            </option>
                            <option key={2} value={2}>
                                Opción 3
                            </option>
                        </select>

                        <button className='btn btn-primary mt-4 mb-4' type="button">{editando ? 'Actualizar' : 'Registrar'} Usuario</button>
                    </form>
                </Col>
                <Col className='card m-1' xs={12} lg={5} style={{ maxWidth: '400px', height: '470px' }}>
                    <div className="mb-2 mt-0 m-1 mt-4">
                        <div className="input-group input-group-sm">
                            <input className="form-control form-control-sm"
                                type="text"
                                name="nombre"
                                placeholder='Buscar por nombre'
                                required
                            >
                            </input>
                        </div>
                    </div>
                    <Col className='p-1' style={{ height: '470px', overflowY: 'auto' }}>
                        <ul className='list-unstyled '>
                            {datosDePrueba.map((elemento) => (
                                <li key={elemento.id}>
                                    <div className='card w-100 mb-2 p-2'>
                                        <div className='array-list-item'>
                                            <h6 className="titulo mt-0">{elemento.nombre}</h6>
                                        </div>
                                        <div className='array-list-contenedor-botones'>
                                            {arrayData.id !== elemento.id ?
                                                <div className="d-flex gap-2">
                                                    <button className='btn btn-primary pt-0 pb-0 btn-sm w-50' onClick={() => editar(elemento)}>Editar</button>
                                                    <button className='btn btn-danger pt-0 pb-0 btn-sm w-50'>Eliminar</button>
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
                </Col>
            </Row>
        </Container>);
}

export default Personalizar;