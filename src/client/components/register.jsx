import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // Implement your registration logic here
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container" dir="rtl">
      <h1>הרשמה</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">שם משתמש:</label>
          <div className="input-wrapper">
            <input
              type="text"
              id="username"
              placeholder="שם משתמש"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">אימייל:</label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">סיסמה:</label>
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              placeholder="סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handleRegister}>הרשם</button>
        <button onClick={handleLogin}>חזרה להתחברות</button>
      </form>
    </div>
  );
};

export default Register;
