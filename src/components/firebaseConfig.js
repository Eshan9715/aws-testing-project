// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS5MLf0ca0DQviAsg89TkMJrfZgDztgfc",
  authDomain: "fl-booking-images-storage.firebaseapp.com",
  projectId: "fl-booking-images-storage",
  storageBucket: "fl-booking-images-storage.appspot.com",
  messagingSenderId: "851440932457",
  appId: "1:851440932457:web:5d26d0d17b06df3c84b4f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;