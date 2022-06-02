import React from 'react';
import Suggestions from './Suggestions';
import Link from 'next/dist/client/link';

function Navbar() {
  return (
    <div className='pr-4 p-3 pt-8 bg-gray-100'>
        <div className='bg-white border-b p-3 text-md font-semibold'>
          <p>Spaces to follow</p>
        </div>
        <div>
          <Link href='/welcome to quora'>
            <a>
              <Suggestions title='welcome to quora'/>
            </a>
          </Link>
          <Link href='/Lifestyle and Welbeing'>
            <a>
              <Suggestions title='Lifestyle and Welbeing'/>
            </a>
          </Link>
          <Link href='/Felling lucky?'>
            <a>
            <Suggestions title='Felling lucky?'/>
            </a>
          </Link>
          
          
        </div>
    </div>
  )
}

export default Navbar;