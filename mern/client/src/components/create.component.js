import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthHeader } from 'react-auth-kit';
import Modal from './modal/modal.component';

export default function Create() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    rating: '',
    fee: '',
    sales: '',
    region: '',
  });
  const [modal, setModal] = useState({ show: false });

  const navigate = useNavigate();
  const authHeader = useAuthHeader();

  function updateForm(value) {
    return setForm(prev => {
      return { ...prev, ...value };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    setModal(() => {
      return { show: true };
    });
  }

  async function handleConfirm() {
    const newPerson = { ...form };

    await fetch('http://localhost:5000/agent-create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader(),
      },
      body: JSON.stringify(newPerson),
    }).catch(error => {
      navigate(`/error/${error}`);
      return;
    });

    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      rating: '',
      fee: '',
      sales: '',
      region: '',
    });

    navigate('/agent', { state: { created: true } });
  }

  function handleClose() {
    setModal(() => {
      return { show: false };
    });
  }

  return (
    <div>
      <h3>Create Agent</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            className='form-control'
            id='firstName'
            value={form.firstName}
            onChange={e => updateForm({ firstName: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            className='form-control'
            id='lastName'
            value={form.lastName}
            onChange={e => updateForm({ lastName: e.target.value })}
          />
        </div>
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
          <label htmlFor='phone'>Phone Number</label>
          <input
            type='text'
            className='form-control'
            id='phone'
            value={form.phone}
            onChange={e => updateForm({ phone: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='rating'>Rating</label>
          <input
            type='text'
            className='form-control'
            id='rating'
            value={form.rating}
            onChange={e => updateForm({ rating: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='fee'>Fee</label>
          <input
            type='text'
            className='form-control'
            id='fee'
            value={form.fee}
            onChange={e => updateForm({ fee: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='sales'>Sales</label>
          <input
            type='text'
            className='form-control'
            id='sales'
            value={form.sales}
            onChange={e => updateForm({ sales: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='regionOptions'
              id='regionNorth'
              value='north'
              checked={form.region === 'north'}
              onChange={e => updateForm({ region: e.target.value })}
            />
            <label htmlFor='regionNorth' className='form-check-label'>
              North
            </label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='regionOptions'
              id='regionSouth'
              value='south'
              checked={form.region === 'south'}
              onChange={e => updateForm({ region: e.target.value })}
            />
            <label htmlFor='regionSouth' className='form-check-label'>
              South
            </label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='regionOptions'
              id='regionEast'
              value='east'
              checked={form.region === 'east'}
              onChange={e => updateForm({ region: e.target.value })}
            />
            <label htmlFor='regionEast' className='form-check-label'>
              East
            </label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='regionOptions'
              id='regionWest'
              value='west'
              checked={form.region === 'west'}
              onChange={e => updateForm({ region: e.target.value })}
            />
            <label htmlFor='regionWest' className='form-check-label'>
              West
            </label>
          </div>
        </div>
        <div className='form-group'>
          <input type='submit' value='Create' className='btn btn-primary' />
        </div>
      </form>
      <Modal
        show={modal.show}
        text='Confirm creation?'
        handleConfirm={handleConfirm}
        handleClose={handleClose}
      />
    </div>
  );
}
