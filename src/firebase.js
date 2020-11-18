import firebase from 'firebase/app'
import 'firebase/database'

var firebaseConfig = {
  apiKey: "AIzaSyD5Q2T8H4r_hszygeWK5joGi_7vhjDCtdk",
  authDomain: "react-crud-4351b.firebaseapp.com",
  databaseURL: "https://react-crud-4351b.firebaseio.com",
  projectId: "react-crud-4351b",
  storageBucket: "react-crud-4351b.appspot.com",
  messagingSenderId: "429118872998",
  appId: "1:429118872998:web:bfee3d4d368a33e14a8367"
};

// Initialize Firebase

var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
