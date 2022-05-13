import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Header from './Header';
import Head from 'next/head';
import Login from './Login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Layout({ children }) {
  const [user] = useAuthState(auth);
  if (!user) return <Login />
  
  return (
    <div className='bg-gray-100'>
      <Head><title>Quora</title></Head>
      <Header />
        <main className='flex space-x-6'>
        <Sidebar/>
          {children}
        <Navbar/>
      </main>
    </div>
  )
}

export default Layout