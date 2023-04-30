import React, { useState } from 'react';
// import jwt_decode from 'jwt-decode';
// import jwtBeautify from '../../Utilities/jwt-beautify';
import { Button, Container, Form } from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Username:", username, "Password:", password);
    // Your login logic here
  };

  return (
    <Container className='box' style={{padding: '0px 30%', margin: '300px 0px 0px 0px'}}>
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username address</Form.Label>
        <Form.Control
          type="username"
          placeholder="Enter username"
          value={username}
          onChange={handleUsernameChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Group>

      <Button className="mb-3" variant="primary" type="submit">
        Login
      </Button>
    </Form>
    </Container>
  );

}

// function LoginOld() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [tokenData, setTokenData] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const response = await fetch('https://api.dishdrop.pp.ua/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ username, password })
//     });
//     const data = await response.text();

//     if (data === 'User not found' || data === 'Invalid password') {
//       setTokenData('Invalid credentials');
//       return;
//     }

//     if (data) {
//       const decodedToken = jwtBeautify(jwt_decode(data));
//       let expirationDate = new Date();
//       expirationDate.setTime(expirationDate.getTime() + (6 * 60 * 60 * 1000))
//       console.log(decodedToken);
//       console.log(`access_token=${data};SameSite=None;Secure;"`)
//       localStorage.setItem('user', JSON.stringify(decodedToken))
//       document.cookie = `access_token=${data};SameSite=None;Secure;"`
//       setTokenData(data);
//     }
//   };

//   return (
//     <div>
//       <Form onSubmit={handleSubmit}>
//         <Form.Text
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <Form.Text
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Form>
//           <Form.Group controlId="formBasicUsername">
//             <Form.Label>Username address</Form.Label>
//             <Form.Control type="username" placeholder="Enter username" />
//           </Form.Group>
//           <Form.Group controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" placeholder="Enter password" />
//           </Form.Group>
//         </Form>
//         <button type="submit">Login</button>
//       </Form>
//       {tokenData && (
//         <div>
//           <h2>Token Data:</h2>
//           <pre>{JSON.stringify(tokenData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

export default Login;