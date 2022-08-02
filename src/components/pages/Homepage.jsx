import React from 'react';
import Layout from '../Layout/Layout';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';

const Homepage = () => {
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    console.log(querySnapshot);

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };
  return (
    <Layout>
      <h1>Homepage</h1>
      <button onClick={getData}>Submit</button>
    </Layout>
  );
};

export default Homepage;
