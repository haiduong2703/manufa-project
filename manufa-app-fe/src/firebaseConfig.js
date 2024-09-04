// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD76tmnkvy2jQU3pQ9i9u8vi7S-RFFSoKA",
    authDomain: "manufa-aa821.firebaseapp.com",
    projectId: "manufa-aa821",
    storageBucket: "manufa-aa821.appspot.com",
    messagingSenderId: "681257188887",
    appId: "1:681257188887:web:3fd52e4ac73ca512696652",
    measurementId: "G-3WJ1NSDYDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage }; // Đảm bảo biến storage được export