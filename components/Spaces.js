import React from 'react'
import Image from 'next/dist/client/image';
import { GlobeIcon } from '@heroicons/react/outline';

function Spaces({ src, title }) {
  return (
    <div className='flex items-center space-x-2 my-2 p-2 hover:bg-gray-200 cursor-pointer
    rounded-md'>
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

export default Spaces