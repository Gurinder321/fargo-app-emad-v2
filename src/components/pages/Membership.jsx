import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Layout from '../Layout/Layout';
import { getAuth } from 'firebase/auth';

const Membership = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    setUser(auth.currentUser);
  }, [auth.currentUser]);
  return <Layout>{user ? <h1>{user.displayName}</h1> : 'Not loggedIn user'}</Layout>;
};

export default Membership;
