import React, { useState } from 'react';
import './Login.css';
import loginBg from '../assets/loginbg.png'; // Adjust the path if needed

function Login({ onLogin, loginError }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
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
