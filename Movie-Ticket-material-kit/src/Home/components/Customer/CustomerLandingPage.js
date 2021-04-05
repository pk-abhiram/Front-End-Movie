import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

function CustomerLandingPage() {
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const { deleteUser } = useAuth();
  var user = useAuth().currentUser;
  const history = useHistory();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/');
    } catch {
      setError('Failed to log out');
    }
  }
  async function deleteU() {
    setError('');
    try {
      await deleteUser();
      history.push('/');
    } catch {
      setError('Failed to log out');
    }
  }
  return (
    <div className='w-100 text-center mt-2'>
      <h3>Customer</h3>
      <h3>{user.email}</h3>
      {error && error}
      <Button variant='link' onClick={deleteU}>
        Delete
      </Button>
      <Button variant='link' onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
}

export default CustomerLandingPage;
