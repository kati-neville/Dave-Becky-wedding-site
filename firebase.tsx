// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
	authDomain: "wedding-71d56.firebaseapp.com",
	projectId: "wedding-71d56",
	storageBucket: "wedding-71d56.appspot.com",
	messagingSenderId: "22337244573",
	appId: "1:22337244573:web:5a964a4cd3b6d31495f374",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
