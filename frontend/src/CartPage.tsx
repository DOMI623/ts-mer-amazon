import { Link, useNavigate } from "react-router-dom";
import { Store } from "./Store";
import { useContext } from "react";
import type { CartItem } from "./types/Cart";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import MessageBox from "./components/MessageBox";

export default function CartPage() {
  const navigate = useNavigate();

  const {
    state: {
      mode,
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);

  const updateCartHandler = (item: CartItem, quantity: number) => {
    if (Number(item.countInStock) < quantity) {
      toast.warn("Lo sentimos, el producto está agotado");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  }
  const removeItemHandler = (item: CartItem) => {
  dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
}

  return (
    <div>
      <Helmet>
        <title>Carrito de compra</title>
      </Helmet>
      <h1>Carrito de compra</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              El carrito esta vacio. <Link to="/">Ir la tienda</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item: CartItem) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      />
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                    <span>{item.quantity}</span>
                    <Button
                        variant={mode}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === Number(item.countInStock)}

                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>{' '}
                       <Button
                        variant={mode}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        disabled={item.quantity === Number(item.countInStock)}

                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>RD${item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant={mode}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                 <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : RD$
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceder al pago
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        <Col md={4}>
        </Col>
      </Row>
    </div>
  );
}
