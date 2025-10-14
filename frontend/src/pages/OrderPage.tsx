import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import { Store } from "../Store";
import {
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../hooks/orderHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import type { ApiError } from "../types/ApiError";
import { toast } from "react-toastify";
import {
  PayPalButtons,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
  type PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";

export default function OrderPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId!);

  const { mutateAsync: payOrder, isLoading: loadingPay } =
    usePayOrderMutation();

  const testPayHandler = async () => {
    try {
      await payOrder({ orderId: orderId! });
      await refetch();
      toast.success("Pedido pagado");
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  const [{ isPending, isRejected }, paypalDispatch] =
    usePayPalScriptReducer();
  const { data: paypalConfig } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (paypalConfig?.clientId) {
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": paypalConfig.clientId,
          currency: "USD",
        },
      });
      paypalDispatch({
        type: "setLoadingStatus",
        value: SCRIPT_LOADING_STATE.PENDING,
      });
    }
  }, [paypalConfig, paypalDispatch]);

  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: "vertical" }, // <-- corregido (antes decía "tyle")
    createOrder(data, actions) {
      return actions.order
        .create({
          purchase_units: [
            {
              amount: {
                value: order!.totalPrice.toString(),
              },
            },
          ],
        })
        .then((orderID: string) => orderID);
    },
    onApprove(data, actions) {
      return actions.order!.capture().then(async (details) => {
        try {
          await payOrder({ orderId: orderId!, ...details });
          await refetch();
          toast.success("Pedido pagado exitosamente");
        } catch (err) {
          toast.error(getError(err as ApiError));
        }
      });
    },
    onError: (err) => {
      toast.error(getError(err as ApiError));
    },
  };

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : !order ? (
    <MessageBox variant="danger">Pedido no encontrado</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="my-3">Pedido {orderId}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Envio</Card.Title>
              <Card.Text>
                <strong>Nombre:</strong> {order.shippingAddress.fullName}
                <br />
                <strong>Direccion: </strong>{" "}
                {order.shippingAddress.address},{" "}
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Entregado en {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="warning">No entregado</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Pago</Card.Title>
              <Card.Text>
                <strong>Metodo:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Pagado en: {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="warning">No pagado</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Articulos</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded thumbnail"
                        />{" "}
                        <Link to={`/product/${item.slug}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Total del pedido</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Articulos</Col>
                    <Col>RD${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>RD${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>RD${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Total del pedido</strong>
                    </Col>
                    <Col>
                      <strong>
                        RD${order.totalPrice.toFixed(2)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {isPending ? (
                      <LoadingBox />
                    ) : isRejected ? (
                      <MessageBox variant="danger">
                        Error al conectarse a PayPal
                      </MessageBox>
                    ) : (
                      <div>
                        <PayPalButtons
                          {...paypalbuttonTransactionProps}
                        />
                        <Button onClick={testPayHandler}>
                          Test Pay
                        </Button>
                      </div>
                    )}
                    {loadingPay && <LoadingBox />}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
