import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSignup } from '../../Hooks/useSignup'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password)
    await signup(email, password)
  }

  return (
    <Form className="signup" onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button disabled={isLoading} style={{ marginTop: "10px" }} variant="primary" type="submit">
        Sign Up
      </Button>
      
      {error && <div className="error">{error}</div>}
    </Form>
  )
}

export default Signup