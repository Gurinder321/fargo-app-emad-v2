import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { getAuth, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase.config';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const [users, setUsers] = useState([]);
  const auth = getAuth();
  useEffect(() => {
    // fetchUsers();
    onSnapshot(collection(db, 'user'), (snapshot) =>
      setUsers(
        snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((u) => u.id === auth.currentUser.uid)[0]
      )
    );
  }, []);

  useEffect(() => {
    // fetchUsers();
    if (users) {
      console.log('user', users);
      // if (!user.isApproved) {
      //   signOut(auth)
      //     .then(() => {
      //       // Sign-out successful.
      //       alert('User signed out ');
      //       navigate('/');
      //     })

      //     .catch((error) => {
      //       // An error happened.
      //     });
      // }
    }
  }, [users]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });

      console.log('newline:', users);
      navigate('/membership');
      alert('Login Success');
    } catch (error) {
      console.log(error);
    }
  };
  const { state } = useLocation();
  return (
    <Layout>
      <h1>Login</h1>
      <form onSubmit={onSubmitHandler}>
        <input type="email" value={email} id="email" placeholder="Email" onChange={onChange} />
        <input
          type="password"
          value={password}
          id="password"
          placeholder="Password"
          onChange={onChange}
        />
        <button type="submit">Login</button>
      </form>
      {state ? (
        <p>
          Hello, {state.name}, you've successfully registered. Please wait up to 2 hours for Admin
          to approve your profile.
        </p>
      ) : null}
    </Layout>
  );
};

export default Signin;
