import React from 'react'
import Image from 'next/dist/client/image';
function Spaces({ src, title }) {

  return (
    <div className='flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer
    rounded-md'>
      { src && (
        <Image className='rounded-full'
            src={src}
            width={25}
            height={25}
            layout="fixed"
        />
      )}
        <p className='hidden sm:inline-flex font-small capitalize'>{title}</p>
    </div>
  )
}

export default Spaces