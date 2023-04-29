import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBF7uTy5VcvMTayCZmIhtyKkI5_4KLD4yc",
  authDomain: "crown-clothing-db-fecca.firebaseapp.com",
  projectId: "crown-clothing-db-fecca",
  storageBucket: "crown-clothing-db-fecca.appspot.com",
  messagingSenderId: "867302985499",
  appId: "1:867302985499:web:297213a240eed942ad4dbe",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(`error creating the user:${error.message}`);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, paasowrd) => {
  if (!email || !paasowrd) return;
  return await createUserWithEmailAndPassword(auth, email, paasowrd);
};

export const signInAuthUserWithEmailAndPassword = async (email, paasowrd) => {
  if (!email || !paasowrd) return;
  return await signInWithEmailAndPassword(auth, email, paasowrd);
};
