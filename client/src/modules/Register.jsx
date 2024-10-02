// Register.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');


    if (!validateEmail(email)) {
      const errorMessage = 'Zadejte platnou emailovou adresu.';
      setError(errorMessage);
      return;
    }
    if (!validatePassword(password)) {
      const errorMessage = 'Heslo musí mít alespoň 8 znaků.';
      setError(errorMessage);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleError(error.code);
    }
  };

  const handleError = (errorCode) => {
    let errorMessage;
    switch (errorCode) {
      case 'auth/email-already-in-use':
        errorMessage = 'Tento email je již registrován.';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Registrace je momentálně nedostupná.';
        break;
      default:
        errorMessage = 'Nastala chyba. Zkuste to prosím znovu.';
    }
    setError(errorMessage);
  };

  return (
    <div>
      <form className="auth-form" onSubmit={handleRegister} noValidate>
        <label>email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>heslo</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <span style={{ color: 'red' }}>{error}</span>}
        <button className="submit" type="submit">Zaregistrovat se</button>
      </form>
    </div>
  );
};

export default Register;
