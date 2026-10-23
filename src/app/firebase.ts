// Loaded lazily by Session, so the public page renders before the Firebase SDK arrives.
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore/lite';
import type { ServerConfig } from './session';

// Web config of the app "homepage" in project costapaul; these values are public by design (the API
// key only answers costapaul.com, costapaul.web.app, costapaul.firebaseapp.com and localhost:4200)
const app = initializeApp({
  apiKey: 'AIzaSyC21DN-kghtgU7qjmkkDHe4YZbktSUffbM',
  authDomain: 'costapaul.firebaseapp.com',
  projectId: 'costapaul',
  storageBucket: 'costapaul.firebasestorage.app',
  messagingSenderId: '1008880690600',
  appId: '1:1008880690600:web:c0a87da93ccac603e8699d',
});

const auth = getAuth(app);
const db = getFirestore(app);

export function watchUser(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export function signInWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export function signOutUser() {
  return signOut(auth);
}

// firestore.rules let only accounts listed in admins/{email} read this document
export async function loadServerConfig() {
  const snapshot = await getDoc(doc(db, 'private', 'server'));
  return (snapshot.data() as ServerConfig | undefined) ?? null;
}
