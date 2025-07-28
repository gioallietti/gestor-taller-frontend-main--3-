import { useState, useEffect, useCallback } from 'react';
import './Login.css';
import '../App.css';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { urlBase } from '../servicio/Api';
import { useNavigate } from 'react-router-dom';
import Cargando from '../componentes/cargando/Cargando';

const Login = ({user, setUser}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const redireccionarUsuario = useCallback((tipoUsuarioId) => {
  if (tipoUsuarioId === 1) navigate('/administrador');
  else if (tipoUsuarioId === 2) navigate('/taller');
  else if (tipoUsuarioId === 3) navigate('/recepcion');
}, [navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [setUser]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(urlBase + '/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);

        redireccionarUsuario(userData.tipoUsuario.id);
      } else {
        alert('Credenciales incorrectas');
        localStorage.removeItem('user');
        setUser(null);
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
    }
  };

useEffect(() => {
  if (user && user.tipoUsuario?.id) {
    redireccionarUsuario(user.tipoUsuario.id);
  }
}, [user, redireccionarUsuario]);


  const llenarCampoAdministrador = () => {
    setEmail('admin@example.com');
    setPassword('admin')
  }
  const llenarCampoTecnico = () => {
    setEmail('pepe@example.com');
    setPassword('1234')
  }
  const llenarCampoRecepcion = () => {
    setEmail('juani@example.com');
    setPassword('rtrtrtrtrt')
  }
  //-----------------------------------
if (loading) {
  return <Cargando />;
}

if (user && user.tipoUsuario?.id) {
  return null;
}

  return (
    <Container>
      <Row className="mx-0 justify-content-center align-items-center vh-100">
        <Col className='align-items-center' xs={12} style={{ maxWidth: '400px' }}>
        <button className='btn btn-success' type='button' onClick={llenarCampoAdministrador}>Admin</button>
         <button className='btn btn-success' type='button' onClick={llenarCampoTecnico}>Técnico</button>
          <button className='btn btn-success' type='button' onClick={llenarCampoRecepcion}>Recep</button>
        </Col>
        <Col className='align-items-center' xs={12} style={{ maxWidth: '400px' }}>
          <h3>Iniciar Sesión</h3>
          <Card className="card p-4">
            <form onSubmit={handleLogin}>
              <input className="form-control form-control-sm mb-3"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input className="form-control form-control-sm mb-3"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className='btn btn-primary w-100'
                type="submit">Iniciar Sesión</button>
            </form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;