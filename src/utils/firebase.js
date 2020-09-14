import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBQQdNRemDZWF1zphzkbFXE6o7oPN27qxc",
  authDomain: "redesign-6fa8b.firebaseapp.com",
  databaseURL: "https://redesign-6fa8b.firebaseio.com",
  projectId: "redesign-6fa8b",
  storageBucket: "redesign-6fa8b.appspot.com",
  messagingSenderId: "349995441750",
  appId: "1:349995441750:web:4a48ed60f6ea576e6425f7"
};

/** Create firebase app, and create auth & db */
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };