import Head from 'next/head'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar';
//import Navbar from '../components/Navbar';
export default function Home() {
  return (
    <div>
      <Head>
        <title>Quora!(sort off)</title>
      </Head>

      {/* Header */}
      <Header />

      <main className='flex'>
        {/* Sidebar  */}
        <Sidebar />

        {/* Feed  */}
        {/* Navbar  */}

      </main>
    </div>
  )
}
