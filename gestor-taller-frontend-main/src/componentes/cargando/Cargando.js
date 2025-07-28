import { Image } from "react-bootstrap";
import './Cargando.css'

const Cargando = () => {
    return (
        <div className="d-flex cargando justify-content-center align-items-center vh-100">
           <Image src="/logo-cargando-1.png" alt="Logo" className="logo-cargando-grande" />
        </div>
    )
}

export default Cargando;