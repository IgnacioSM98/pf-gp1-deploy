import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";

export const app = firebase.initializeApp({
  projectId: "pf-gp1",
  appId: "1:927317925312:web:d38e5c8a5d687843d83c25",
  storageBucket: "pf-gp1.appspot.com",
  locationId: "us-central",
  apiKey: "AIzaSyCwQh5Cg2NQKzZHMIbcHR3eWCzlHHOrshY",
  authDomain: "pf-gp1.firebaseapp.com",
  messagingSenderId: "927317925312",
});

export const authentincation = getAuth(app);
