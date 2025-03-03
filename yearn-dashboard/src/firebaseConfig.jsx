// /src/firebaseConfig.jsx
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBxpVNGkRZ57n6YtrqYAXqp-2b5-mIY2q4",
  authDomain: "daychallenge-412be.firebaseapp.com",
  projectId: "daychallenge-412be",
  storageBucket: "daychallenge-412be.firebasestorage.app",
  messagingSenderId: "42750912789",
  appId: "1:42750912789:web:2a6ab81b450e2e8a1d611c",
  measurementId: "G-XG0CB58DQQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
