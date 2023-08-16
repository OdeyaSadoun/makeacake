import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';
import RestAPI from '../server/models/restapi';

const Register = () => {
  const [first_last_name, setFirstLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [house_number, setNumhouse] = useState('');
  const [date_of_birth, setDateOfBirth] = useState('');
  const [id_card, setIdCard] = useState('');
  const [system_password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [is_admin, setIsAdmin] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [isValidDate, setIsValidDate] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidIDCard, setIsValidIDCard] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {

    // if (isValidEmail && !passwordMatchError && !passwordError && isValidDate && isValidPhoneNumber) {

    console.log('after checking the inputs');

    const newUser = await RestAPI.createUser(
      first_last_name,
      username,
      system_password,
      email,
      phone,
      city,
      street,
      house_number,
      date_of_birth,
      id_card,
      is_admin
    );

    console.log('new user', newUser);

    if (newUser && newUser.status === 201) {
      // Registration successful, navigate to the login page
      alert('נרשמת בהצלחה!');
      localStorage.setItem('user', JSON.stringify(newUser));
      if (newUser.is_admin) {
        console.log('Navigating to admin page');
        navigate(`/admin/${newUser.username}`);
      } else {
        console.log('Navigating to user page');
        navigate(`/${newUser.username}`);
      }
      return;
    } else {
      // Registration failed, set the registration error message
      console.log('faild to create user');
    }
  }
  // }

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (password) => {
    const isValid = validatePassword(password);
    setPasswordError(!isValid);
    setPassword(password);
  };

  const validateDate = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    return inputDate <= currentDate;
  };

  const handleDateOfBirthChange = (date) => {
    const isValid = validateDate(date);
    setIsValidDate(isValid);
    setDateOfBirth(date);
  };

  const validatePhoneNumber = (phone) => {
    // Regular expression to check for Israeli phone number format
    const phoneNumberRegex = /^(\+972|0)(5\d)(\d{7})$/;
    return phoneNumberRegex.test(phone);
  };

  const handlePhoneChange = (phoneNumber) => {
    const isValid = validatePhoneNumber(phoneNumber);
    setIsValidPhoneNumber(isValid);
    setPhone(phoneNumber);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (email) => {
    const isValid = validateEmail(email);
    setIsValidEmail(isValid);
    setEmail(email);
  };

  // Function to check if the confirm password like a password
  const checkConfirmPassword = (confirmPassword) => {
    setPasswordMatchError(system_password !== confirmPassword);
    setConfirmPassword(confirmPassword);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="registercontainer" dir="rtl">
      <h1>הרשמה</h1>
      <form>
        <div className="form-group">
          <label htmlFor="firstLastName">שם מלא:</label>
          <input
            type="text"
            id="firstLastName"
            value={first_last_name}
            required
            onChange={(e) => setFirstLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">שם משתמש:</label>
          <input
            type="text"
            id="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">אימייל:</label>
          <input
            type="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">טלפון:</label>
          <input
            type="phone"
            id="phone"
            value={phone}
            required
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
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="form-column">
            <label htmlFor="street">רחוב:</label>
            <input
              type="text"
              id="street"
              value={street}
              required
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="numhouse">מספר בית:</label>
          <input
            type="number"
            id="numhouse"
            value={house_number}
            required
            onChange={(e) => setNumhouse(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">תאריך לידה:</label>
          <input
            type="date"
            id="dateOfBirth"
            value={date_of_birth}
            required
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="idCard">תעודת זהות:</label>
          <input
            type="text"
            id="idCard"
            value={id_card}
            onChange={(e) => setIdCard(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">סיסמה:</label>
          <input
            type="password"
            id="password"
            value={system_password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">אימות סיסמה:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {passwordError && <p className="error-message">{passwordError}</p>}
        {passwordMatchError && (
          <p className="error-message">סיסמאות לא תואמות</p>
        )}
        <button onClick={handleRegister}>הרשם</button>
        <button onClick={handleLogin}>חזרה להתחברות</button>
      </form>
    </div>
  );
};

export default Register;
