import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Access the auth module
const auth: Auth = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore
const firestore: Firestore = getFirestore(firebaseApp);

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export { auth, firestore }; // Export Firestore and Authentication
export default firebaseApp;
