import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import './Login.css';
import loginBg from '../assets/loginbg.png';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(username, password);
            console.log('Login successful:', userData);
            setLoginError(false);
            navigate('/dashboard'); // Navigate to dashboard or any other route
        } catch (error) {
            console.error('Login failed:', error);
            setLoginError(true);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="background-blur" style={{ backgroundImage: `url(${loginBg})` }}></div>
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                    {loginError && <p className="error">Invalid credentials</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;
