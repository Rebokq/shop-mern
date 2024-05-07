
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// eslint-disable-next-line
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD7wbkLAciUjHK-BQV7Eo01lqqRM_6rHyw",
  authDomain: "ecom-81dd2.firebaseapp.com",
  projectId: "ecom-81dd2",
  storageBucket: "ecom-81dd2.appspot.com",
  messagingSenderId: "460816013122",
  appId: "1:460816013122:web:e4fd1f3d9ddae395b29adb"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();