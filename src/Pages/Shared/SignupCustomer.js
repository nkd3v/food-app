import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useSignup } from '../../Hooks/useSignup';
import './SignupCustomer.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';

function SignupCustomer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const { signup, isLoading, error } = useSignup();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setClicked(true)
    if (username === "" || password === "") return;
    console.log({username, password, role})
    await signup(username, password, "", "", "Customer")

    if (error) {
      console.log(error);
      return;
    }

    console.log({error, role: user.role})
  };

  const hasAnyInputError = () => {
    return error || isEmptyAndClicked()
  }

  const isEmptyAndClicked = () => {
    return (username === "" || password === "") && clicked;
  }

  useEffect(() => {
    if (user?.role === 'Customer') {
      navigate('/Shop')
    } else if (user?.role === 'Rider') {
      navigate('/CustomerList')
    }
  }, [user, navigate])

  return (
    <Container className='box signup-form-ctn'>
      <Form onSubmit={handleSignup}>
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
          Signup
        </Button>

        <Form.Text className={`invalid-feedback d-block ${hasAnyInputError() ? "visible" : "invisible"}`} id="passwordHelpBlock">
          {error}
        </Form.Text>
      </Form>
    </Container>
  );
}

export default SignupCustomer;