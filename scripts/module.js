import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInAnonymously, updateProfile } from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { enableIndexedDbPersistence, getFirestore, collection, getDocs, query, where, orderBy, doc, setDoc, addDoc, updateDoc, getDoc, onSnapshot, arrayUnion } from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js';
const app = initializeApp({
  apiKey: "AIzaSyAQN1QvkSMxwxF_sfG6vSJO8--UPLWZX8E",
  authDomain: "project-center-d29ff.firebaseapp.com",
  projectId: "project-center-d29ff",
  storageBucket: "project-center-d29ff.appspot.com",
  messagingSenderId: "562872607417",
  appId: "1:562872607417:web:c04fae25d445ed3d367168",
  measurementId: "G-DDBDV29K73"
});
const db = getFirestore(app);
enableIndexedDbPersistence(db);
const auth = getAuth(app);
const user = auth.currentUser;
	
export { 
	db, collection, getDocs, query, where, orderBy, 
	doc, setDoc, addDoc, updateDoc, getDoc, onSnapshot, arrayUnion,
	auth, user, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInAnonymously, updateProfile
};