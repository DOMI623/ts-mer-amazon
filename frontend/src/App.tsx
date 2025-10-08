import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>rdamazon</Navbar.Brand>
          </Container>
          <Nav>
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
