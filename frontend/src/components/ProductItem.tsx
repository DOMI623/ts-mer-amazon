import { Button, Card } from "react-bootstrap";
import type { Product } from "../types/Product";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function ProductItem({ product }: { product: Product }) {
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
          <Card.Text className="mt-2 fw-bold">${product.price}</Card.Text>
        </div>
        <div className="mt-3">
          {product.countInStock === 0 ? (
            <Button variant="light" disabled className="w-100">
              Agotado
            </Button>
          ) : (
            <Button className="w-100">Agregar al carrito</Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

