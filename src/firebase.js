import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAbQ2mHRl1ZJzpLnkPBulCBR1d23y7RzVA",
  authDomain: "todo-app-1719e.firebaseapp.com",
  databaseURL: "https://todo-app-1719e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-app-1719e",
  storageBucket: "todo-app-1719e.appspot.com",
  messagingSenderId: "754082289786",
  appId: "1:754082289786:web:7f8f281698c740573d03c3"
});

const database = getDatabase(app);
export const auth = app.auth();
export default database;
