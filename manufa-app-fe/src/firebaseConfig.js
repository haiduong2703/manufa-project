// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAfL4V31l5ETHIssrJylSRVFX9GZYkI5mw",
    authDomain: "manufa-451b1.firebaseapp.com",
    projectId: "manufa-451b1",
    storageBucket: "manufa-451b1.appspot.com",
    messagingSenderId: "230256582097",
    appId: "1:230256582097:web:46c010f57a32d7957754f0",
    measurementId: "G-D4JCR5B90H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage }; // Đảm bảo biến storage được export