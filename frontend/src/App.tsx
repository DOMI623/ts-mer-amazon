import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Store } from "./Store";

function App() {
  const {state: { mode },
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
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand>rdamazon</Navbar.Brand>
          </Container>
          <Nav>
            <Button variant={mode} onClick={switchModeHandler}>
               <i
                 className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}
               ></i>
             </Button>
            <a href="/cart" className="nav-link">
              Carrito
            </a>
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
