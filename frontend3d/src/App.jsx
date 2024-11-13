import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard'; // This will be your 3D scene component

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = (username, password) => {
        if (username === 'user' && password === 'password') {
            setLoggedIn(true);
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={loggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
                <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
