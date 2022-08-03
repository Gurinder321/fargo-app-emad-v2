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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });

      console.log('newline:', users);
      navigate('/signout');
      alert('Login Success');
    } catch (error) {
      console.log(error);
    }
  };
  const { state } = useLocation();
  return (
    <Layout>
      {/* <form onSubmit={onSubmitHandler}>
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
      ) : null} */}

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-full bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
          <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  id="email"
                  placeholder="Email"
                  onChange={onChange}
                  autoComplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  id="password"
                  placeholder="Password"
                  onChange={onChange}
                  autoComplete="password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-96"
            >
              Login
            </button>
          </form>
          {state ? (
            <p>
              Hello, {state.name}, you've successfully registered. Please wait up to 2 hours for
              Admin to approve your profile.
            </p>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
