import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/');
    } catch {
      setError('Invalid credentials.');
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleSubmit} style={card}>
        <h2>Sign In 🍳</h2>
        {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={input} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={input} />
        <button type="submit" style={btn}>Sign In</button>
        <p style={{ fontSize: '13px', textAlign: 'center' }}>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

const container = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb', fontFamily: 'sans-serif' };
const card = { background: '#fff', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' };
const input = { padding: '10px', borderRadius: '6px', border: '1px solid #ccc' };
const btn = { padding: '10px', background: '#e11d48', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };

export default Login;