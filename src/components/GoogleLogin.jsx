import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      // Send the Google token to your backend
      const response = await fetch('http://localhost:5000/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleToken: credentialResponse.credential }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the JWT token and redirect to dashboard
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Google Login Error:', error);
      alert('Error during login. Please try again.');
    }
  };

  const handleError = () => {
    alert('Login Failed. Please try again.');
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
};

export default GoogleLoginButton;
