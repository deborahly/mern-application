import { useState, useEffect } from 'react';

export default function Login() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    token: '',
  });

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    document.title = `Welcome back, ${user.firstName}!`;
  });

  function updateForm(value) {
    return setForm(prev => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const loginAttempt = {
      email: form.email,
      password: form.password,
    };

    const response = await fetch(`http://localhost:5000/login`, {
      method: 'POST',
      body: JSON.stringify(loginAttempt),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const responseObj = await response.json();
    const user = responseObj.data;
    setUser(user);
  }

  return (
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
    </div>
  );
}
