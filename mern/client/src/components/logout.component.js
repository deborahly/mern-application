import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';

export default function Logout() {
  const signOut = useSignOut();
  const navigate = useNavigate();

  function yesHandler() {
    signOut();
    navigate('/login');
  }

  function noHandler() {
    navigate('/');
  }

  return (
    <div>
      <h3>Are you sure you want to logout?</h3>
      <div className='mt-3'>
        <button
          type='button'
          value='yes'
          className='btn btn-primary mx-3'
          onClick={yesHandler}
        >
          Yes
        </button>
        <button
          type='button'
          value='no'
          className='btn btn-primary mx-3'
          onClick={noHandler}
        >
          No
        </button>
      </div>
    </div>
  );
}
