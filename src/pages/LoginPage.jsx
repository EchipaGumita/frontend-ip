import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { GoogleLogin } from '@react-oauth/google'; // Import Google Login
import '../LoginPage.css';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            setError('Please fill in both fields');
            return;
        }
    
        try {
            const response = await axios.post(`${backendURL}/auth/login`, {
                email,
                password,
            });
    
            // Save token to localStorage
            localStorage.setItem('token', response.data.token);
            
            // Redirect on success
            navigate('/dashboard');
        } catch (error) {
            // Handle errors
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Invalid email or password');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            // Send Google token to the backend
            const response = await axios.post(`${backendURL}/auth/google-login`, {
                googleToken: credentialResponse.credential,
            });

            // Save the JWT token
            localStorage.setItem('token', response.data.token);

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (error) {
            setError('The email you entered doesnt exist in our database.');
        }
    };

    const handleGoogleError = () => {
        setError('Google login was unsuccessful. Please try again.');
    };

    return (
        <div className="login-container">
            <div className="login-logo">
                <img src="../../src/assets/logo usv.png" alt="USV Logo" />
            </div>
            <div className="login-form">
                <h3>Log in</h3>
                <p>Enter your account details below.</p>
                <form onSubmit={handleLogin}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <div className="form-options">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <a href="/forgot-password">Forgot password?</a>
                    </div>

                    <button type="submit" className="login-button">Login</button>
                </form>

                <div className="google-login-container">
                    <p>Or login with:</p>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
