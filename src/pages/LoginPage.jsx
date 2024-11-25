import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
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
            </div>
        </div>
    );
};

export default LoginPage;
