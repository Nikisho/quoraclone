import React from 'react'
import InputBox from './InputBox';
import Posts from './Posts';

function Feed() {
  return (
    <div className=' w-[45%]
    min-w-fit 
    h-screen pb-44 pl-3 pt-6 
    overflow-y-auto scrollbar-hide'>
        <div>
            {/* InputBox  */}
            <InputBox/>

            {/* Posts  */}
            <Posts 
            />
        </div>
    </div>
  )
}

export default Feed