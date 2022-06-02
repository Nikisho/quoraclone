import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { setDoc, collection, serverTimestamp, addDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
function CommentInput({postId}) {
    const inputRef = useRef(null);
    const [user] = useAuthState(auth);
    const sendComment = async (e) => {
        e.preventDefault();
        if (!inputRef.current.value) return;
        //db.collection('posts').doc(postId).collection('comments').add({
        await addDoc(collection(db, "posts", `${postId}`, "comments"), {
            message: inputRef.current.value,
            name: user.displayName,
            image: user.photoURL,
            timestamp: serverTimestamp()
        });
        inputRef.current.value = "";
    }
  return (
    <div className='p-2 rounded-md bg-gray-200'>
        {/* commentInput */}
        <div className='flex '>
            <Image
                className='rounded-full'
                height={35}
                width={35}
                alt=''
                src={user.photoURL}
            />
            <form  className='flex flex-1'>
                <input
                    className='flex-grow
                    px-5
                    ml-2
                    items-center
                    rounded-full
                    outline-none
                    placeholder-gray-500'
                    type="text"
                    placeholder='Add a comment..'
                    ref={inputRef}
                />
                <button type='submit' hidden onClick={sendComment} />
            </form>
        </div>
    </div>
  )
}

export default CommentInput