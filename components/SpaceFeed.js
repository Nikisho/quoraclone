import React from 'react'
import InputBoxSpace from './InputBoxSpace'
import PostsSpace from './postsSpace';
function SpaceFeed({id}) {
  return (
    <div className='min-w-fit w-[45%]
    h-screen pb-44 pl-3 pt-6 
    overflow-y-auto scrollbar-hide'>
        <InputBoxSpace 
            pid={id}
        />
        <PostsSpace
          id={id}
        />
    </div>
  )
}

export default SpaceFeed