import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import jwtBeautify from '../../Utilities/jwt-beautify';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tokenData, setTokenData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('https://api.dishdrop.pp.ua/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.text();

    if (data === 'User not found' || data === 'Invalid password') {
        setTokenData('Invalid credentials');
        return;
    }

    if (data) {
      const decodedToken = jwtBeautify(jwt_decode(data));
      let expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + (6 * 60 * 60 * 1000))
      console.log(decodedToken);
      console.log(`access_token=${data};SameSite=None;Secure;"`)
      localStorage.setItem('user', JSON.stringify(decodedToken))
      document.cookie = `access_token=${data};SameSite=None;Secure;"`
      setTokenData(data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {tokenData && (
        <div>
          <h2>Token Data:</h2>
          <pre>{JSON.stringify(tokenData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Login;