import React, { useState } from 'react';
import axios from 'axios';
import "./forgotPassword.css"

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/forgot-password", { email });
      setMessage('Reset email sent successfully. Check your inbox.');
    } catch (error) {
      setMessage('Failed to send reset email. Please try again.');
    }
  };

  return (

    <div className='main-container'>
        <div className='forgot-container'>
      <h2 className='h2'>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <input
        className='input'
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button className='btn' type="submit">Send Reset Email</button>
      </form>
      <p>{message}</p>
    </div>
    </div>
  );
}

export default ForgotPasswordForm;
