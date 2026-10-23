// Loaded lazily by Session, so the public page renders before the Firebase SDK arrives.
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore/lite';
import type { ServerConfig } from './session';

// Web config of the app "homepage" in project projects-costa; these values are public by design
const app = initializeApp({
  apiKey: 'AIzaSyDiXhmiw4p_dspfZwc9_4xb4C4CKcHSyY8',
  authDomain: 'projects-costa.firebaseapp.com',
  projectId: 'projects-costa',
  storageBucket: 'projects-costa.firebasestorage.app',
  messagingSenderId: '144755815187',
  appId: '1:144755815187:web:a94858130ffc4e47bee0e6',
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
