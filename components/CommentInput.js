import React, { useRef } from 'react';
import Image from 'next/image';
function CommentInput({photo}) {
    const inputRef = useRef(null)
    const sendComment = async (e) => {
        e.preventDefault();
        if (!inputRef.current.value) return;
    }
  return (
    <div className='p-2 rounded-md bg-gray-200'>
        {/* commentInput */}
        <div className='flex '>
            <Image
                className='rounded-full'
                height={35}
                width={35}
                src={photo}
            />
            <form  className='flex flex-1'>
                <input
                    className='flex-grow
                    px-5
                    ml-2
                    items-center
                    rounded-md
                    outline-none
                    placeholder-gray-500'
                    type="text"
                    placeholder='Add a comment..'

                />
                <button type='submit' hidden onClick={sendComment} />
            </form>
        </div>
        {/* Comments  */}
        <div>

        </div>
    </div>
  )
}

export default CommentInput