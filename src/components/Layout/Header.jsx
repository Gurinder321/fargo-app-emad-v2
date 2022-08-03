import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebase.config';

import { getAuth, signOut } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';

const Header = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    setUser(auth.currentUser);
    console.log('Auth.currentUser', auth.currentUser);
    if (auth.currentUser) {
      onSnapshot(collection(db, 'user'), (snapshot) =>
        setUserInfo(
          snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))

            .filter((u) => u.id === auth.currentUser.uid)[0]
        )
      );
    }
    // if (userInfo && !userInfo.isApproved) {
    //   // signOut(auth)
    //   //   .then(() => {
    //   //     // Sign-out successful.
    //   //     navigate('/');
    //   //   })

    //   //   .catch((error) => {
    //   //     // An error happened.
    //   //   });
    //   console.log(userInfo);
    // }
  }, [auth.currentUser]);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert('User signed out ');
        navigate('/');
      })

      .catch((error) => {
        // An error happened.
      });
  };

  // const getUserData = (uid) => {
  //   db.database()
  //     .ref('users/' + uid)
  //     .once('value', (snap) => {
  //       console.log(snap.val());
  //     });
  // };
  // console.log(user ? getUserData(user.uid) : null);
  return (
    // <>
    //   <Link to="/">Home</Link>
    //   <Link to="/signup">Signup</Link>
    //   <Link to="/signin">Signin</Link>
    //   <Link to="/register">RegisterSteps</Link>
    //   <Link to="/dashboard">Dashboard</Link>

    // {userInfo ? (
    //   userInfo.isApproved ? (
    //     <div>
    //       <Link to="/membership">Membership</Link>
    //       <button onClick={handleSignout}>Signout</button>
    //     </div>
    //   ) : null
    // ) : null}
    // </>

    // New header
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <Link to="/">
            <span className="font-semibold text-xl tracking-tight text-white">Fargo App</span>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link
              to="/signup"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Signup
            </Link>
            <Link
              to="/dashboard"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Dashboard
            </Link>

            {userInfo ? (
              userInfo.name ? (
                <div>
                  <Link to="/membership">Membership</Link>
                  <button onClick={handleSignout}>Signout</button>
                </div>
              ) : null
            ) : null}
          </div>
          <div>
            <Link
              to="/signin"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Register Steps
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

// understnad the code we've completed
