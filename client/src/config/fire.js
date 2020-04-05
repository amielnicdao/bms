import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBw32QhqfV3oAVODUFZpROSt-K0UkY04wY",
    authDomain: "fitnessbms-7a82f.firebaseapp.com",
    databaseURL: "https://fitnessbms-7a82f.firebaseio.com",
    projectId: "fitnessbms-7a82f",
    storageBucket: "fitnessbms-7a82f.appspot.com",
    messagingSenderId: "702627496391",
    appId: "1:702627496391:web:e57a7da41c7ae4085899e2",
    measurementId: "G-JD7MV5SXZS"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;