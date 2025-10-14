import { Badge, Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet, } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Store } from "./Store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LinkContainer } from "react-router-bootstrap";

function App() {
  const {state: { mode, cart, userInfo },
   dispatch,
  } = useContext(Store)

  const switchModeHandler = () => {
  dispatch({ type: 'SWITCH_MODE' })
}

const signoutHandler = () => {
dispatch({ type: 'USER_SIGNOUT' })
localStorage.removeltem('userInfo')
localStorage.removeltem( 'cartItems')
localStorage.removeltem('shippingAddress')
localStorage. removeltem( 'paymentMethod')
window.location.href = '/signin';
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
            <LinkContainer to="/" style={{ textDecoration: 'none' }}
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
            {userInfo ? (
  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
    <Link
      className="dropdown-item"
      to="#signout"
      onClick={signoutHandler}
    >
      Cerrar Sesion
    </Link>
  </NavDropdown>
) : (
  <Link className="nav-link" to="/signin">
    Sign In
  </Link>
)}

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
