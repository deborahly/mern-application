import { useState } from 'react';
import { useSignIn, useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import BootstrapAlert, { variantList } from './alert.component';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [alert, setAlert] = useState({
    variant: '',
    content: '',
    active: false,
  });

  function updateForm(value) {
    return setForm(prev => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const loginAttempt = {
      email: form.email,
      password: CryptoJS.HmacSHA512(
        form.email + form.password,
        form.password
      ).toString(),
    };
    const response = await fetch(`http://localhost:5000/login`, {
      method: 'POST',
      body: JSON.stringify(loginAttempt),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(error => {
      navigate(`/error/${error}`);
      return;
    });
    if (!response.ok) {
      // Reset form
      setForm(() => {
        return { email: '', password: '' };
      });
      // Update alert status
      setAlert(() => {
        return {
          variant: variantList.danger,
          content: 'Incorrect username or password. Please try again.',
          active: true,
        };
      });
      // Add 5s timeout
      const timer = setTimeout(() => {
        setAlert(() => {
          return {
            variant: '',
            content: '',
            active: false,
          };
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
    // If response.ok
    const responseObj = await response.json();
    const user = responseObj.data;
    if (
      signIn({
        token: user.accessToken,
        expiresIn: 3600,
        tokenType: 'Bearer',
        authState: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      })
    ) {
      navigate('/');
    } else {
      navigate('/error/Please try again');
    }
  }

  return isAuthenticated() ? (
    <h3 className='text-center py-2'>You are already logged in 😉</h3>
  ) : (
    <div>
      <h3>Login</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            className='form-control'
            id='email'
            value={form.email}
            onChange={e => updateForm({ email: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            value={form.password}
            onChange={e => updateForm({ password: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <input type='submit' value='Login' className='btn btn-primary' />
        </div>
      </form>
      {alert.active && (
        <BootstrapAlert alertVariant={alert.variant}>
          {alert.content}
        </BootstrapAlert>
      )}
    </div>
  );
}
