// Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');


    if (!validateEmail(email)) {
      const errorMessage = 'Zadejte platnou emailovou adresu.';
      setError(errorMessage);
      return;
    }
    if (password.trim() === '') {
      const errorMessage = 'Heslo nesmí být prázdné.';
      setError(errorMessage);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleError(error.code);
    }
  };

  const handleError = (errorCode) => {
    let errorMessage;
    switch (errorCode) {
      case 'auth/user-not-found':
        errorMessage = 'Uživatel s tímto emailem nebyl nalezen.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Špatné heslo.';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Přihlášení je momentálně nedostupné.';
        break;
      default:
        errorMessage = 'Nastala chyba. Zkuste to prosím znovu.';
    }
    setError(errorMessage);
  };

  return (
    <div>
      <form className="auth-form" onSubmit={handleLogin} noValidate>
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
        <button className="submit" type="submit">Přihlásit se</button>
      </form>
    </div>
  );
};

export default Login;
