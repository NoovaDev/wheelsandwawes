import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKU0GH9alR8PwwrGMAtuV42lbyPtmw9gc",
  authDomain: "wheelsandwawes.firebaseapp.com",
  projectId: "wheelsandwawes",
  storageBucket: "wheelsandwawes.firebasestorage.app",
  messagingSenderId: "380565553439",
  appId: "1:380565553439:web:0f5093322b5d2e7ad3302a",
  measurementId: "G-NWQE8L87G6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);