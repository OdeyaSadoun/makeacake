import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../public/styles/login.css';
import RestAPI from "../server/models/restapi";
   
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('before RestAPI', username, password);
    const user = await RestAPI.getUserByUsernameAndPassword(username, password);
    console.log('after RestAPI', user);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      if (user.is_admin) {
        navigate(`/admin/${user.username}`);
      }
      else {
        navigate(`/${user.username}`);
      }
    } else {
      alert('שם משתמש או סיסמא שגויים, אנא נסה שנית.');
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
