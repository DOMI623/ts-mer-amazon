import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import type { ApiError } from "../types/ApiError";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";


export default function ProductPage() {
  const params = useParams()
     const { slug } = params
     const {
       data: product,
       isLoading,
       error,
     } = useGetProductDetailsBySlugQuery(slug!)
  return isLoading ? (
       <LoadingBox />
     ) : error   ? (
       <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
     ) : !product ? (
       <MessageBox variant="danger">Product No Encontrado</MessageBox>
     ): (
    <div>
      <Helmet>
        <title>Productos</title>
      </Helmet>
       <Row>
           <Col md={6}>
             <img
               className="large"
               src={product.image}
               alt={product.name}
             ></img>
           </Col>
           <Col md={3}>
             <ListGroup variant="flush">
               <ListGroup.Item>
                 <Helmet>
                   <title>{product.name}</title>
                 </Helmet>
                 <h1>{product.name}</h1>
               </ListGroup.Item>
               <ListGroup.Item>
                 <Rating
                   rating={product.rating}
                   numReviews={product.numReviews}
                 ></Rating>
               </ListGroup.Item>
               <ListGroup.Item>Precio : RD${product.price}</ListGroup.Item>
               <ListGroup.Item>
                 Description:
                 <p>{product.description}</p>
               </ListGroup.Item>
             </ListGroup>
           </Col>
           <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                   <ListGroup.Item>
                     <Row>
                       <Col>Precio:</Col>
                       <Col>RD${product.price}</Col>
                     </Row>
                   </ListGroup.Item>
                   <ListGroup.Item>
                     <Row>
                       <Col>Status:</Col>
                       <Col>
                         {product.countInStock > 0 ? (
                           <Badge bg="success">En Stock</Badge>
                         ) : (
                           <Badge bg="danger">No disponible</Badge>
                         )}
                       </Col>
                     </Row>
                   </ListGroup.Item>
                   {product.countInStock > 0 && (
                     <ListGroup.Item>
                       <div className="d-grid">
                         <Button variant="primary">
                           Agregar al carrito
                         </Button>
                       </div>
                     </ListGroup.Item>
                   )}
                   </ListGroup>
              </Card.Body>
            </Card>
           </Col>
           </Row>
    </div>
  )
}
