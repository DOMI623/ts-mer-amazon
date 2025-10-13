import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../hooks/userHooks";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";
import type { ApiError } from "../types/ApiError";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

export default function SignupPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const { mutateAsync: signup, isPending } = useSignupMutation();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    try {
      const data = await signup({
        name,
        email,
        password,
      });
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Registrate</title>
      </Helmet>
      <h1 className="my-3">Registrate</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
             <Form.Label>Contraseña</Form.Label>
             <Form.Control
               type="password"
               required
               onChange={(e) => setPassword(e.target.value)}
             />

             </Form.Group>
             <Form.Group className="mb-3" controlId="confirmPassword">
               <Form.Label>Confirmar Contraseña</Form.Label>
               <Form.Control
                 type="password"
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 required
               />
           </Form.Group>
           <div className="mb-3">
             <Button type="submit">Sign Up</Button>
           </div>
           <div className="mb-3">
             Ya tienes una cuenta?{' '}
             <Link to={`/signin?redirect=${redirect}`}>Inicia Sesion</Link>
           </div>
      </Form>
    </Container>
  );
}
