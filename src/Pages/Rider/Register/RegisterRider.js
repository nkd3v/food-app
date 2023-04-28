import React, { useState } from 'react';

function RegisterRider() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await fetch('https://api.dishdrop.pp.ua/api/register/rider', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
      } else {
        // Registration successful, handle response as needed
      }
    } catch (error) {
      setError('An error occurred while submitting the form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />

      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={name} onChange={(event) => setName(event.target.value)} />

      <label htmlFor="profileImage">Profile Image:</label>
      <input type="file" id="profileImage" name="profileImage" onChange={(event) => setProfileImage(event.target.files[0])} />

      {error && <div>{error}</div>}

      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterRider;