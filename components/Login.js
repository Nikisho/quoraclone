import React from 'react'
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import Head from 'next/head';

function Login() {
    const provider = new GoogleAuthProvider();
    const signIn =  (e) => {
        e.preventDefault();
         signInWithPopup(auth, provider);
    };
  return (
    <div className='pt-4 grid place-items-center space-y-4
    '>
      <Head><title>Quora</title></Head>
        <Image
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Quora_Q_icon_2015.svg/768px-Quora_Q_icon_2015.svg.png?20201027180107'
          height={150}
          width={150}
          alt=''
        />
        <h1 className='bg-red-700 text-white p-3 
        font-semibold 
        rounded-xl 
        cursor-pointer hover:bg-red-500
        text-center'
        type='submit' onClick={signIn}>Sign in with Google</h1>
    </div>
  )
}

export default Login