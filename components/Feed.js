import React from 'react'
import InputBox from './InputBox';
import Posts from './Posts';

function Feed() {
  return (
    <div className='min-w-fit w-[45%]
    h-screen pb-44 pl-3 pt-6 
    overflow-y-auto scrollbar-hide '>
        <div>
            {/* InputBox  */}
            <InputBox/>

            {/* Posts  */}
            <Posts />
        </div>
    </div>
  )
}

export default Feed