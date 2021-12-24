// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator  } from "firebase/auth";
import "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtKdE-UUs4ty1wO4sJuxh4KzuewyO5T1I",
  authDomain: "learn-online-web.firebaseapp.com",
  projectId: "learn-online-web",
  storageBucket: "learn-online-web.appspot.com",
  messagingSenderId: "34491301303",
  appId: "1:34491301303:web:92776b8edcea2e3ca3fc32",
  measurementId: "G-FYNVM85SY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage(app);

// connectAuthEmulator(auth, "http://localhost:9099");
// connectFirestoreEmulator(db, 'localhost', 8080);

export { app, analytics, auth, db, storage };