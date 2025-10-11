import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Store } from "./Store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LinkContainer } from "react-router-bootstrap";

function App() {
  const {state: { mode, cart },
   dispatch,
  } = useContext(Store)

  const switchModeHandler = () => {
  dispatch({ type: 'SWITCH_MODE' })
}

  useEffect(() => {
  document.body.setAttribute('data-bs-theme', mode)
}, [mode])

  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <ToastContainer position="bottom-center" limit={1} />
        <Navbar expand="lg">
          <Container>
            <LinkContainer to="/" className="text-white" style={{ textDecoration: 'none' }}
>
            <Navbar.Brand>rdamazon</Navbar.Brand>
            </LinkContainer>
            
          </Container>
          <Nav>
            <Button variant={mode} onClick={switchModeHandler}>
               <i
                 className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}
               ></i>
             </Button>
            <Link to='/cart' className="nav-link">
              Carrito
              {cart.cartItems.length > 0 && (
                 <Badge pill bg="danger">
                   {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                 </Badge>
               )}
            </Link>
            <a href="/signin" className="nav-link">
              Iniciar Sesión
            </a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">Todos los derechos reservados</div>
      </footer>
    </div>
  );
}

export default App;
