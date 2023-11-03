import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq82hyX1-z1DKwmjw-fy5iZbwpVVak_6w",
  authDomain: "hotel-booking-68b00.firebaseapp.com",
  projectId: "hotel-booking-68b00",
  storageBucket: "hotel-booking-68b00.appspot.com",
  messagingSenderId: "19218369608",
  appId: "1:19218369608:web:20169e9c21f62449a29c7d",
  measurementId: "G-611VQH0JJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore using the app
const db = getFirestore(app);

export { db }; // Export the Firestore instance for use in your application
