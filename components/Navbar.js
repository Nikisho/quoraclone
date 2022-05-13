import React from 'react';
import Spaces from './Spaces';
import Suggestions from './Suggestions';
function Navbar() {
  return (
    <div className='pr-4 p-3 pt-8 bg-gray-100'>
        <div className='bg-white border-b p-3 text-md font-semibold'>
          <p>Spaces to follow</p>
        </div>
        <div>
          <Suggestions title='welcome to quora'/>
          <Suggestions src="https://links.papareact.com/zof" title='sonny'/>
          <Suggestions title='space1'/>
          <Suggestions title='plants'/>
        </div>
    </div>
  )
}

export default Navbar;