import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginPage.css';



const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in both fields');
            return;
        }

        // Simulate credential checking
        if (email === 'user@example.com' && password === 'password') {
            navigate('/dashboard'); // Redirect on success
        } else {
            setError('Invalid email or password');
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
