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
  const [isValidDate, setIsFutureDate] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidIDCard, setIsValidIDCard] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log('handleRegister');
    // Implement your registration logic here
    // const userData = await RestAPI.createUser(
    //   first_last_name,
    //   username,
    //   system_password, // Use system_password here
    //   email,
    //   phone,
    //   city,
    //   street,
    //   house_number,
    //   date_of_birth,
    //   id_card,
    //   is_admin
    // );

    // console.log(userData, 'user');

    // Password validation
    // if (!passwordError) {
    //   alert('הסיסמה חייבת להכיל לפחות 8 תווים, אות גדולה, אות קטנה, ומספר.');
    //   return;
    // }
    // confirmPassword validation
    // if (!passwordMatchError) {
    //   alert('הסיסמא ואימות הסיסמא צריכים להיות זהים');
    //   return;
    // }
    //Check the date
    // if (!isValidDate) {
    //   alert('תאריך הלידה אינו תקין');
    //   return;
    // }
    // //Check the phone
    // if (!isValidPhoneNumber) {
    //   alert('מספר הטלפון אינו תקין, בבקשה הכנס שוב');
    //   return;
    // }
    // //Check the email
    // if (!isValidEmail) {
    //   alert('כתובת האימייל אינה חוקית, בבקשה הכנס שוב');
    //   return;
    // }
    // //Check the idCard
    // if (!isValidIDCard) {
    //   alert('תעודת הזהות אינה תקינה, בבקשה הכנס שוב');
    //   return;
    // }
    // // Send the userData object to your server to handle registration


    // if (isValidEmail && isValidPhoneNumber && isValidDate && isValidIDCard && passwordError && passwordMatchError) {

    console.log('after checking the inputs');

    const newUser = await RestAPI.createUser(
      first_last_name,
      username,
      system_password, // Use system_password here
      email,
      phone,
      city,
      street,
      house_number,
      date_of_birth,
      id_card,
      is_admin
    );

    console.log(newUser);
    if (newUser && newUser.status === 201) {
      // Registration successful, navigate to the login page
      alert('נרשמת בהצלחה!');
      navigate('/login');
    } else {
      // Registration failed, set the registration error message
      console.log('faild to create user');
    }

  }



  const handleLogin = () => {
    navigate('/login');
  };

  // Function to check if the confirm password like a password
  const checkConfirmPassword = (confirmPassword) => {
    setPasswordMatchError(system_password !== confirmPassword);
    setConfirmPassword(confirmPassword);
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">אימות סיסמה:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => checkConfirmPassword(e.target.value)}
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
