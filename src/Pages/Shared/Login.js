import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useLogin } from '../../Hooks/useLogin';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const { user } = useAuthContext();
  const navigate = useNavigate()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    await login(username, password)

    if (error) {
      console.log(error);
      return;
    }

    console.log({error, role: user.role})
  };

  useEffect(() => {
    if (user?.role === 'Customer') {
      navigate('/Shop')
    } else if (user?.role === 'Rider') {
      navigate('/CustomerList')
    }
  }, [user, navigate])

  return (
    <Container className='box login-form-ctn'>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
            className={`${error && "is-invalid"}`}
            autoComplete="off"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className={`${error && "is-invalid"}`}
            autoComplete="off"
          />
        </Form.Group>

        <Button className="mb-1" variant="primary" type="submit" disabled={isLoading}>
          Login
        </Button>

        <Form.Text className={`invalid-feedback d-block ${!error && "invisible"}`} id="passwordHelpBlock">
          Incorrect username or password.
        </Form.Text>
      </Form>
    </Container>
  );
}

export default Login;