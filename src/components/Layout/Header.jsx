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
    if (userInfo && !userInfo.isApproved) {
      // signOut(auth)
      //   .then(() => {
      //     // Sign-out successful.
      //     navigate('/');
      //   })

      //   .catch((error) => {
      //     // An error happened.
      //   });
      console.log(userInfo);
    }
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
    <>
      <Link to="/">Home</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/signin">Signin</Link>
      <Link to="/register">RegisterSteps</Link>
      <Link to="/dashboard">Dashboard</Link>

      {userInfo ? (
        userInfo.isApproved ? (
          <div>
            <Link to="/membership">Membership</Link>
            <button onClick={handleSignout}>Signout</button>
          </div>
        ) : null
      ) : null}
    </>
  );
};

export default Header;

// understnad the code we've completed
