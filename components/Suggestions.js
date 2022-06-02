import React from 'react'
import Image from 'next/dist/client/image';
import { GlobeIcon } from '@heroicons/react/outline';

function Suggestions({ src, title }) {
  return (
    <div className='flex items-center space-x-2 p-3 hover:bg-gray-200 cursor-pointer
    rounded-sm border-t border-b bg-white w-48'>
      { src? (
        <Image className='rounded-md'
            src={src}
            width={25}
            height={25}
            alt=''
            layout="fixed"
        />
      ) :
      (
        <GlobeIcon 
          height={25}
          width={25}
          layout='fixed'
        />
      )}
        <p className='inline-flex text-sm capitalize'>{title}</p>
    </div>
  )
}

export default Suggestions;