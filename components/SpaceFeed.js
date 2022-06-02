import { collection, collectionGroup, query, where } from 'firebase/firestore';
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import InputBoxSpace from './InputBoxSpace'
import PostsSpace from './PostsSpace';
import Image from 'next/image';
import { db } from '../firebase';
function SpaceFeed({id}) {
  const [realTimeSpace] = useCollection(
    query(collection(db, "spaces"), where("title", "==", `${id}`))
  )
  return (
    <div className='min-w-fit w-[45%]
    h-screen pb-44 pl-3 pt-6 
    overflow-y-auto scrollbar-hide space-y-2'>
      <div className='flex bg-white p-3 rounded-xl space-x-4'>
      {realTimeSpace?.docs.map((doc) => (
        <>
        <Image
        className='rounded-xl'
          src={doc.data().postImage}
          height={80}
          width={80}
          alt=''
        />
        <p className='font-bold text-2xl capitalize'>{doc.data().title}</p>
        </>
      ))}
      </div>
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