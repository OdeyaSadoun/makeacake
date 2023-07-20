import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';

const Register = () => {
  const [firstLastName, setFirstLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [numhouse, setNumhouse] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [idCard, setIdCard] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // Implement your registration logic here
    const userData = {
      first_last_name: firstLastName,
      username,
      email,
      phone,
      address: {
        city,
        street,
        numhouse,
      },
      date_of_birth: dateOfBirth,
      id_card: idCard,
      password,
      is_admin: false, // Assuming this is not part of the registration form
    };

    // Password validation
    if (!isStrongPassword(password)) {
      setPasswordError('הסיסמה חייבת להכיל לפחות 8 תווים, אות גדולה, אות קטנה, ומספר.');
      return;
    } else {
      setPasswordError('');
    }

    // Confirm password match validation
    if (password !== confirmPassword) {
      setPasswordMatchError('הסיסמה ואימות הסיסמה צריכים להיות תואמים.');
      return;
    } else {
      setPasswordMatchError('');
    }

    // Send the userData object to your server to handle registration
    console.log(userData);

    // After successful registration, you can redirect to the login page
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  // Function to check if the password is strong enough
  const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="container" dir="rtl">
      <h1>הרשמה</h1>
      <form>
        <div className="form-group">
          <label htmlFor="firstLastName">שם מלא:</label>
          <input
            type="text"
            id="firstLastName"
            value={firstLastName}
            onChange={(e) => setFirstLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">שם משתמש:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">אימייל:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">טלפון:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <div className="form-column">
            <label htmlFor="city">עיר:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="form-column">
            <label htmlFor="street">רחוב:</label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="numhouse">מספר בית:</label>
          <input
            type="text"
            id="numhouse"
            value={numhouse}
            onChange={(e) => setNumhouse(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">תאריך לידה:</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="idCard">תעודת זהות:</label>
          <input
            type="text"
            id="idCard"
            value={idCard}
            onChange={(e) => setIdCard(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">סיסמה:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">אימות סיסמה:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {passwordError && <p className="error-message">{passwordError}</p>}
        {passwordMatchError && <p className="error-message">{passwordMatchError}</p>}
        <button onClick={handleRegister}>הרשם</button>
        <button onClick={handleLogin}>חזרה להתחברות</button>
      </form>
    </div>
  );
};

export default Register;
