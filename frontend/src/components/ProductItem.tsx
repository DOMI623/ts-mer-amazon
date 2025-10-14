import type { Product } from "../types/Product";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useContext } from "react";
import { Store } from "../Store";
import type { CartItem } from "../types/Cart";
import { convertProductToCartItem } from "../utils";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";

export default function ProductItem({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert("Sorry. Product is out of stock");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
    toast.success('Producto agregado al carrito')
  };

  return (
    <Card className="product-card">
      <Link to={`/product/${product.slug}`}>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </Link>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Link to={`/product/${product.slug}`}>
            <Card.Title className="mb-2">{product.name}</Card.Title>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text className="mt-2 fw-bold">RD${product.price}</Card.Text>
        </div>
        <div className="mt-3">
          {product.countInStock === 0 ? (
            <Button variant="light" disabled className="w-100">
              Agotado
            </Button>
          ) : (
            <Button
              className="w-100"
              onClick={() =>
                addToCartHandler(convertProductToCartItem(product))
              }
            >
              Agregar al carrito
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
