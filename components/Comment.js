import React from 'react';
import Comments from './CommentInput';
import Image from 'next/image';

function Comment({image, message, name, timestamp}) {

  return (
    <div className='p-3 bg-white border'>
      <div className='flex space-x-2 items-center'>
        {image && 
          <Image
            className='rounded-full'
            height={30}
            width={30}
            src={image}
          />
        }

        <p className='font-bold'>{name}</p>
        <p className='text-xs text-gray-400'>
          {new Date(timestamp?.toDate()).toLocaleString()}
      </p>
      </div>
      <p>{message}</p>
    </div>
  )
}

export default Comment