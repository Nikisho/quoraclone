import Head from 'next/head'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar';
//import Navbar from '../components/Navbar';

function Home() {
  
  return (
    
    <div className='bg-gray-100'>
      <Head>
        <title>Quora</title>
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
export default Home;