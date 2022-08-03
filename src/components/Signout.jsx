import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { db } from '../firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';

function Signout() {
  const navigate = useNavigate();
  const auth = getAuth();
  // const [approved, setApproved] = useState(false)
  //   const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if (auth.currentUser) {
      onSnapshot(collection(db, 'user'), (snapshot) =>
        signoutIfNotApproved(
          snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((u) => u.id === auth.currentUser.uid)[0]
        )
      );

      // signoutIfNotApproved()
    }
  }, []);
  const signoutIfNotApproved = (userInfo) => {
    console.log('approved:', userInfo);
    if (!userInfo.isApproved) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          alert('User signed out ');
          navigate('/');
        })

        .catch((error) => {
          // An error happened.
        });
    }
    navigate('/');
  };

  return (
    <div>
      signout
      {/* {userInfo && userInfo.name} */}
    </div>
  );
}

export default Signout;
