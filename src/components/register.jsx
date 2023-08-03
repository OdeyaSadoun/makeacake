import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [is_admin, setIsAdmin] = useState('false');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [isValidDate, setIsFutureDate] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidIDCard, setIsValidIDCard] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async() => {
    console.log('handleRegister');
    // Implement your registration logic here
    const userData = {
      first_last_name,
      username,
      email,
      phone,     
      city,
      street,
      house_number,
      date_of_birth,
      id_card,
      system_password,
      is_admin // Assuming this is not part of the registration form
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


    if(isValidEmail && isValidPhoneNumber && isValidDate && isValidIDCard && passwordError && passwordMatchError){
      // After successful registration, you can redirect to the login page
      setIsFormValid(true); 
      const newUser = await RestAPI.createUser(
        userData.first_last_name,
        userData.username,
        userData.email,
        userData.phone,
        userData.city,
        userData.street,
        userData.house_number,
        userData.date_of_birth,
        userData.id_card,
        userData.system_password,
        userData.is_admin
      );  
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
   if (system_password === confirmPassword){
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
            value={first_last_name}
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
            value={house_number}
            onChange={(e) => setNumhouse(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">תאריך לידה:</label>
          <input
            type="date"
            id="dateOfBirth"
            value={date_of_birth}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="idCard">תעודת זהות:</label>
          <input
            type="text"
            id="idCard"
            value={id_card}
            onChange={(e) => validateIDCard(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">סיסמה:</label>
          <input
            type="password"
            id="password"
            value={system_password}
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
