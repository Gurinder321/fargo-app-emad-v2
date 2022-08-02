import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../../firebase.config';

import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
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
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(userCredential);
      const user = userCredential.user;

      updateProfile(auth.currentUser, { displayName: name });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, 'user', user.uid), formDataCopy);
      navigate('/');
      alert('Signup Success');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1>Register</h1>
      <form onSubmit={onSubmitHandler}>
        <input type="text" value={name} id="name" placeholder="Name" onChange={onChange} />
        <input type="email" value={email} id="email" placeholder="Email" onChange={onChange} />
        <input
          type="password"
          value={password}
          id="password"
          placeholder="Password"
          onChange={onChange}
        />
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
};

export default Signup;
