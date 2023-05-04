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
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
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

    setIsUsernameError(username === '')
    setIsPasswordError(password === '')

    if (username === '' || password === '') {
      return;
    }

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
            className={`${(isUsernameError || error) && "is-invalid"}`}
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
            className={`${(isPasswordError || error) && "is-invalid"}`}
            autoComplete="off"
          />
        </Form.Group>

        <Button className="mb-1" variant="primary" type="submit" disabled={isLoading}>
          Login
        </Button>

        <Form.Text className={`invalid-feedback d-block ${!isUsernameError && !isPasswordError && !error && "invisible"}`} id="passwordHelpBlock">
          Please check your username and password.
        </Form.Text>
      </Form>
    </Container>
  );
}

export default Login;