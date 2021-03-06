import React, {useState} from 'react';
import Image from "next/image";
import CommentInput from './CommentInput';
import {
  ShareIcon,
  ChatAltIcon,
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon
} from '@heroicons/react/outline'
import { collection, doc, query, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { increment } from 'firebase/firestore';
import Comments from './Comments';
import { useCollection } from 'react-firebase-hooks/firestore';

function PostSpace({ name, message, postImage, image, timestamp, votes, pid, id }) {
  //const [user] = useAuthState(auth);
  const [hide, setHide] = useState(true);
  const upvote = () => {
      setDoc(doc(db, `${pid}-posts`, id), {
        votes: increment(1),
      }, { merge: true })
  };

  const downvote = () => {
    setDoc(doc(db, `${pid}-posts`, id), {
      votes: increment(-1),
    }, { merge : true })
  };

  const expandComments = () => {
    if (hide==false) {
      setHide(hide=true);
    } else {
      setHide(hide=false);
    }
  }

  return (
    <div className='flex flex-col '>
        <div className='p-5 bg-white mt-5 rounded-t-2xl
        shadow-xl'>
          <div className='flex items-center space-x-2'>
            <Image
              className='rounded-full'
              src={image}
              width={40}
              height={40}
              alt=''
            />
            <div>
              <p className='font-medium'>{name}</p>
              <p className='text-xs text-gray-400'>
                {new Date(timestamp?.toDate()).toLocaleString()}
              </p>
            </div>
          </div>
          <p className='pt-4 text-xl'>{message}</p>
        </div>
        {postImage && (
            <div className='relative h-64 md:h-[420px] bg-white'>
                <Image alt='' src={postImage} objectFit='cover'
                layout='fill'/>
            </div>
        )}
        <div className='flex justify-start items-center 
                      rounded-b-md bg-white p-2
                      space-x-3
                      shadow-md text-gray-500 border-t'>

              {/* vote */}
              <div className='flex items-center  rounded-2xl bg-gray-100 '>
                  <div onClick={upvote} className='p-2 cursor-pointer rounded-full hover:bg-gray-200 text-blue-500'>
                      <ChevronDoubleUpIcon className=' h-4'/>
                  </div>

                  <p className=' border-r p-2 text-sm '>{votes}</p>

                  <div onClick={downvote} className='p-2 cursor-pointer rounded-full hover:bg-gray-200 '>
                    <ChevronDoubleDownIcon className=' h-4'/>
                  </div>
              </div>
              {/* Share  */}
              <div className='hover:bg-gray-100 p-2 cursor-pointer rounded-2xl'>
                <ShareIcon className='h-6' />
              </div>
              {/* Comment  */}
              <div onClick={expandComments} className='hover:bg-gray-100 p-2 cursor-pointer rounded-2xl'>
                <ChatAltIcon className='h-6' />
              </div>
        </div>

        {hide? 
              <>
              </> 
              : 
              <>
                <CommentInput postId={id}/>
                <Comments postId={id} />
              </>
        }
    </div>
  )
}

export default PostSpace