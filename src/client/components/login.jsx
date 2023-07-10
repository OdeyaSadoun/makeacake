import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import RestAPI from '../server/RestAPI';
// import './css/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password);
    const user = "";
    // const user = await RestAPI.getUserByUsernameAndPassword(username, password);
    console.log(user);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      navigate(`/${user.id}`);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
