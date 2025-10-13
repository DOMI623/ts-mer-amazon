import { Col, Row } from "react-bootstrap"

   export default function CheckoutSteps(props: {
     step1?: boolean
     step2?: boolean
     step3?: boolean
     step4?: boolean
   }) {
     return (
       <Row className="checkout-steps">
         <Col className={props.step1 ? 'active' : ''}>Iniciar Sesion</Col>
         <Col className={props.step2 ? 'active' : ''}>Envio</Col>
         <Col className={props.step3 ? 'active' : ''}>Pago</Col>
         <Col className={props.step4 ? 'active' : ''}>Realizar pedido</Col>
       </Row>
     )
   }