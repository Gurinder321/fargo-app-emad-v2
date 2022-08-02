import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';
import User from './User';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // fetchUsers();
    onSnapshot(collection(db, 'user'), (snapshot) =>
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);
  return (
    <div>
      {users.map((u) => (
        <User users={u} />
      ))}
    </div>
  );
};

export default Users;
