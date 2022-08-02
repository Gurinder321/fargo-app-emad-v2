// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAGWr5Dm9Ciu74jz4bg0CvszLEkLBfgIeI',
  authDomain: 'fargo-signin.firebaseapp.com',
  projectId: 'fargo-signin',
  storageBucket: 'fargo-signin.appspot.com',
  messagingSenderId: '699747577761',
  appId: '1:699747577761:web:7ba1bef0ab39f88a9fe5e0',
  measurementId: 'G-7R7GLYDGST',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
