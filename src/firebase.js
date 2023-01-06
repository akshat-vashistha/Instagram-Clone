import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/storage"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAmYcSqTJdMWkP8MvtvZK47z2m6jErEbzk",
    authDomain: "instagram-clone-app-45fff.firebaseapp.com",
    projectId: "instagram-clone-app-45fff",
    storageBucket: "instagram-clone-app-45fff.appspot.com",
    messagingSenderId: "525833519201",
    appId: "1:525833519201:web:9306b004bee0cf083cea20",
    measurementId: "G-PMY6Q4QBDF"
});
//we just defined an object 
//this is initialising the firebase app

const db = firebaseApp.firestore();
const auth= firebase.auth();
const storage = firebase.storage();

export {db, auth, storage}