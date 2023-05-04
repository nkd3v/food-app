import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useSignup } from '../../Hooks/useSignup';
import './Signup.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isFullNameInvalid, setIsFullNameInvalid] = useState(false);
  const [isPhoneNumberInvalid, setIsPhoneNumberInvalid] = useState(false);

  const [step, setStep] = useState(1);
  const { signup, isLoading, error } = useSignup();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const nextButtonRef = useRef();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (step === 1) {
      nextButtonRef.current.click();
      return;
    }

    const checkPhoneNumber = (number) => {
      const regex = /^[0-9]{10}$/;
      return regex.test(number)
    }

    setIsFullNameInvalid(fullName === "")
    setIsPhoneNumberInvalid(phoneNumber === "" || !checkPhoneNumber(phoneNumber))

    if (fullName === "" || phoneNumber === "" || !checkPhoneNumber(phoneNumber)) return;
    console.log({isFullNameInvalid, isPhoneNumberInvalid})
    console.log({ username, password, role })
    await signup(username, password, fullName, phoneNumber, role)

    if (error) {
      console.log(error);
      return;
    }

    console.log({ error, role: user.role })
  };

  const handleNext = async (event) => {
    setIsUsernameInvalid(username === "");
    setIsPasswordInvalid(password === "");

    if (username === "" || password === "") return;
    setStep(x => 2);
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
      <Form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                value={username}
                onChange={handleUsernameChange}
                className={`${isUsernameInvalid && "is-invalid"}`}
                autoComplete="off"
              />
              {isUsernameInvalid && <Form.Text className="text-danger">Please enter a valid username</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className={`${isPasswordInvalid && "is-invalid"}`}
                autoComplete="off"
              />
              {isPasswordInvalid && <Form.Text className="text-danger">Please enter a valid password</Form.Text>}
            </Form.Group>

            <Button type="submit" className="mb-1" variant="primary" onClick={handleNext}>
              Next
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={fullName}
                onChange={handleFullNameChange}
                className={`${isFullNameInvalid && "is-invalid"}`}
                autoComplete="off"
              />
              {isFullNameInvalid && <Form.Text className="text-danger">Please enter a valid name</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicContact">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your contact number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className={`${isPhoneNumberInvalid && "is-invalid"}`}
                autoComplete="off"
              />
              {isPhoneNumberInvalid && <Form.Text className="text-danger">Please enter a valid contact number</Form.Text>}
            </Form.Group>

            <Button className="mb-1 me-2" variant="primary" type="submit" disabled={isLoading}>
              Signup
            </Button>

            <Button className="mb-1" variant="secondary" onClick={() => setStep(1)}>
              Back
            </Button>
          </>
        )}

        <Form.Text className="invalid-feedback d-block" id="passwordHelpBlock">
          {error}
        </Form.Text>

      </Form>
    </Container>
  );
}

export default Signup;