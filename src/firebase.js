import firebase from 'firebase/app'
import 'firebase/database'

var firebaseConfig = {
  apiKey: "AIzaSyB9qlWdNkD_BnYqEe6nv-NU1F67C5c3sNs",
  authDomain: "react-crud-916fd.firebaseapp.com",
  projectId: "react-crud-916fd",
  storageBucket: "react-crud-916fd.appspot.com",
  messagingSenderId: "249856415759",
  appId: "1:249856415759:web:e9c1ec5e5affc62a406b7a"
};

// Initialize Firebase

var fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
