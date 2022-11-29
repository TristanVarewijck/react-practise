// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { 
    getFirestore,
    connectFirestoreEmulator
 } from "firebase/firestore";
 import { getAuth, connectAuthEmulator } from "firebase/auth";
 import {getFunctions, connectFunctionsEmulator} from "firebase/functions";


const firebaseConfig = {
    apiKey: "AIzaSyBlr5126h1KmCMzCzn3SFW7wIXGr-kdof8",
    authDomain: "notes-app-75129.firebaseapp.com",
    projectId: "notes-app-75129",
    storageBucket: "notes-app-75129.appspot.com",
    messagingSenderId: "576244835290",
    appId: "1:576244835290:web:3def3d93629c472c1316e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

if(window.location.hostname === "localhost") {
    connectFirestoreEmulator(db, "localhost", 8080);
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFunctionsEmulator(functions, "localhost", 5001);
}

export { db, functions, auth };


