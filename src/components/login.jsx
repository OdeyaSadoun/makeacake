import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RestAPI from '../server/models/restapi';
import '../styles/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('before RestAPI', username, password);
    try {
      const user = await RestAPI.getUserByUsernameAndPassword(username, password);
      console.log('after RestAPI', user);

      if (user.status === 404) {
        alert( "שם משתמש או סיסמא שגויים");
      }
      else {
        localStorage.setItem('user', JSON.stringify(user));
        if (user.is_admin) {
          navigate(`/admin/${user.username}`);
        } else {
          navigate(`/${user.username}`);
        }
      }
    }
    catch (error) {
      alert(error.message || "שם משתמש או סיסמא שגויים");
    }
  };

  const handleRegister = () => {
    // Add logic to navigate to the register page here
    navigate('/register');
  };

  return (
    <div className="logincontainer" dir="rtl">
      <h1>כניסה</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">שם משתמש:</label>
          <div className="input-wrapper">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">סיסמה:</label>
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <button onClick={handleLogin}>התחבר</button>
        <button onClick={handleRegister}>הרשם</button>
      </form>
    </div>
  );
};

export default Login;
