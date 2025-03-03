// /src/components/Login.jsx
import React, { useState } from 'react';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

const Login = ({ onLogin }) => {
  const [error, setError] = useState(null);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = result.user;
      onLogin(user);
    } catch (err) {
      setError(err.message);
      console.error("Google Sign In Error", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <button 
        onClick={signInWithGoogle} 
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Sign in with Google
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Login;
