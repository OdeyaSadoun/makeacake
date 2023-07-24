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
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [isValidDate, setIsFutureDate] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidIDCard, setIsValidIDCard] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    console.log('handleRegister');
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
    if (!passwordError) {
      alert('הסיסמה חייבת להכיל לפחות 8 תווים, אות גדולה, אות קטנה, ומספר.');
    }
// confirmPassword validation
    if (!passwordMatchError) {
      alert('הסיסמא ואימות הסיסמא צריכים להיות זהים');
    }
    //Check the date
    if (!isValidDate) {
      alert('Please enter a valid date of birth.');
    }
    //Check the phone
    if (!isValidPhoneNumber) {
      alert('Please enter a valid Israeli phone number.');
    }
    //Check the email
    if (!isValidEmail) {
      alert('Please enter a valid email address.');
    } 
    //Check the idCard
    if (!isValidIDCard) {
      alert('Please enter a valid id card.');
    } 
    // Send the userData object to your server to handle registration
    console.log(userData);
    console.log(isFormValid, 'isFormValid');
    console.log(isValidEmail, 'isValidEmail');
    console.log(isValidPhoneNumber, 'isValidPhoneNumber');
    console.log(isValidDate, 'isValidDate');
    console.log(isValidIDCard, 'isValidIDCard');
    console.log(passwordError, 'passwordError');
    console.log(passwordMatchError, 'passwordMatchError');

    if(isValidEmail && isValidPhoneNumber && isValidDate && isValidIDCard && passwordError && passwordMatchError){
      // After successful registration, you can redirect to the login page
      setIsFormValid(true);   
      alert('sucssess.');
      navigate('/login');
    }
    
  };

  const handleLogin = () => {
    navigate('/login');
  };

  // Function to check if the password is strong enough
  const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    setPasswordError(passwordRegex.test(password));
    setPassword(password);
  };

   // Function to check if the confirm password like a password
  const checkConfirmPassword = (confirmPassword) => {
   if (password === confirmPassword){
      setPasswordMatchError(true);
   }
   setConfirmPassword(confirmPassword);
  };
  // Function to check if the date is correct
  const handleDateChange = (date) => {
    const inputDate = new Date(date);
    const currentDate = new Date();
    if(inputDate > currentDate){
      setIsFutureDate(false);
    }
    setDateOfBirth(date);
  };

  // Function to check if the phone is coorect
  const handlePhoneNumberChange = (phone) => {
    // Regular expression to check for Israeli phone number format
    const phoneNumberRegex = /^(\+972|0)(5\d)(\d{7})$/;
    setIsValidPhoneNumber(phoneNumberRegex.test(phone));
    setPhone(phone);
  };
// Function to check if the email is coorect
  const handleEmailChange = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
    setEmail(email);
  };

// Function to check if the idCard is coorect
  const validateIDCard = (idCard) => {
    const idCardRegex = /^\d{9}$/;
    setIsValidIDCard(idCardRegex.test(idCard));
    setIdCard(idCard);
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
            onChange={(e) => handleEmailChange(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">טלפון:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => handlePhoneNumberChange(e.target.value)}
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
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="idCard">תעודת זהות:</label>
          <input
            type="text"
            id="idCard"
            value={idCard}
            onChange={(e) => validateIDCard(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">סיסמה:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => isStrongPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">אימות סיסמה:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) =>  checkConfirmPassword(e.target.value)}
          />
        </div>
        {passwordError && <p className="error-message">{passwordError}</p>}
        {passwordMatchError && <p className="error-message">{passwordMatchError}</p>}
        <button onClick={handleRegister} disabled={isFormValid}>הרשם</button>
        <button onClick={handleLogin}>חזרה להתחברות</button>
      </form>
    </div>
  );
};

export default Register;
