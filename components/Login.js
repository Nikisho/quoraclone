import React from 'react'
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function Login() {
    const provider = new GoogleAuthProvider();
    const signIn =  (e) => {
        e.preventDefault();
         signInWithPopup(auth, provider);
    };
  return (
    <div className='flex items-center bg-red-700       
        rounded-full text-white p-4 h-6 ml-4
        font-bold active:animate-ping max-w-fit '>
    <button type='submit' onClick={signIn}>Sign in </button>
</div>
  )
}

export default Login