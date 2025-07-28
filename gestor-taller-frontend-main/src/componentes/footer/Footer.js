import { Button, CardFooter, Col, Row } from "react-bootstrap";

const Footer = () => {

    return (
             <Row className="row footer justify-content-center m-1">
                <Col xs={12} sm={6} lg={4} className="text-center m-0 p m-1-2">
                <p className="m-1">Desarrollado por:</p>
                <p className="m-1">Giovanni Allietti</p>
                <p className="m-1">Henry González</p>
                </Col>
                <Col xs={12} sm={6} lg={4} className="text-center m-0 p m-1-2">
               <p className="m-1">© 2025 Gestor para Talleres</p >
                <p className="m-1">Versión 1.0.0</p>
                <p className="m-1">Última actualización: 28/10/202</p>
               </Col>
                <Col xs={12} sm={6} lg={4} className="text-center m-0 p m-1-2">
                <p className="m-1">Preguntas frecuentes (FAQ)</p>
                <p className="m-1">Políticas (privacidad, términos y condiciones)</p>
                <Button className="btn btn-secondary btn-sm m-0 pt-0 pb-0 p-3">Manual de Usuario</Button>
                </Col>
             </Row>
    )
}

export default Footer;