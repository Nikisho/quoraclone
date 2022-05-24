import React, { useRef, useState } from 'react';
import Image from "next/image";
import { db, auth } from '../firebase';
import { collection, addDoc, setDoc, doc, serverTimestamp, query } from "firebase/firestore";
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import { getStorage, ref, getDownloadURL, uploadBytesResumable, uploadString } from "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    PencilAltIcon,
    PencilIcon,
    QuestionMarkCircleIcon,
    CameraIcon,
} from "@heroicons/react/outline"
import { useCollection } from 'react-firebase-hooks/firestore';

function InputBoxSpace({pid}) {
    const [user] = useAuthState(auth);
    const inputRef = useRef(null);
    const filePickerRef = useRef(null);
    const [imageToPost, setImageToPost] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = React.useState(false);
    
    const sendPost = async (e) => {
        e.preventDefault();
        if (!inputRef.current.value) return
        
        await addDoc(collection(db, `${pid}-posts`), {
            message: inputRef.current.value,
            name: user.displayName,
            image: user.photoURL,
            timestamp: serverTimestamp(),
        })
        .then((document) => {
            if (imageToPost) { 
                const storage = getStorage();
                const storageRef = ref(storage, `${pid}-posts/${document.id}`);
                const uploadTask = uploadString(storageRef, imageToPost, 'data_url');
                const uploadTaskBytes = uploadBytesResumable(storageRef, imageToPost);
                uploadTaskBytes.on(
                    'state_changed',
                    null,
                    (error) => console.error(error),
                    async () => {
                        await getDownloadURL(ref(storage, `${pid}-posts/${document.id}`)).then((url) => {
                            setDoc(doc(db, `${pid}-posts`, document.id), {
                                postImage: url
                            }, { merge: true })
                        })
                    }
                )
            };
        })
        inputRef.current.value = "";
        removeImage();
        handleClose();
    };

    const addPostImage = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
          setImageToPost(readerEvent.target.result)
        }
    };
    
      const removeImage = () => {
        setImageToPost(null);
    };
  return (
    <div className='bg-white p-1 rounded-md
    shadow-md text-gray-500 font-medium mt-1 min-w-min'>
        <div className='flex space-x-4 px-2 pt-1 pb-1 items-center'>
            {user && (
                <Image
                    className='rounded-full'
                    src={user.photoURL}
                    width={30}
                    height={30}
                    layout='fixed'
                />
            )}
            <form  className='flex flex-1'>
                <input
                    onClick={handleOpen}
                    className='h-8 bg-gray-100 rounded-full
                    flex-grow px-5 outline-0 transition duration-700 ease-in-out hover:bg-gray-200'
                    type='text'
                    placeholder='What do you want to ask or share?'
                    
                />
            </form>
        </div>
        <div onClick={handleOpen} className='flex flex col justify-evenly border-t'>
            {/* questionmark  */}
            <div className='inputIcon border-r'>
                <QuestionMarkCircleIcon className='h-5'/>
                <p className='text-xw sm:text-sm
                xl:text-base'>Ask</p>
            </div>

            {/* Answer  */}
            <div className='inputIcon border-r'>
                <PencilAltIcon className='h-5'/>
                <p className='text-xw sm:text-sm
                xl:text-base'>Answer</p>
            </div>

            {/* Post  */}
            <div className='inputIcon'>
                <PencilIcon className='h-5'/>
                <p className='text-xw sm:text-sm
                xl:text-base'>Post</p>
            </div>

        </div>
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='absolute p-5 border-2 bg-gray-50
                top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-grow
                rounded-md min-w-fit w-1/2 top-4/5'>
                <div className='text-xl text-center '>
                    <p>Create Post</p>
                </div>
                
                <div className='h-80 border-t mt-1'>
                    <form>
                        <textarea className='outline-0 bg-transparent w-full h-80' 
                            type='text'
                            placeholder='Say something..'
                            ref={inputRef}
                        />
                    </form>
                </div>
                <div className='flex space-x-1 
                    p-1 rounded-md items-center '>
                    <form>
                        <button onClick={sendPost} 
                            type='submit'
                            className='mr-2 text-white cursor-pointer hover:animate-pulse rounded-full max-w-fit p-2 px-4 bg-blue-600 flex-row-reverse'>
                            <p>Post</p>
                        </button>
                    </form>
                    <div onClick={() => filePickerRef.current.click()} className='flex items-center cursor-pointer'>
                        <CameraIcon  className='h-7'/>
                        <input  ref={filePickerRef} 
                                onChange={addPostImage} 
                                type="file" 
                                hidden
                        />
                    </div>
                    {imageToPost && (
                        <div onClick={removeImage} className='flex flex-col px-8 filter hover:
                        brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer'>
                            <img className = 'h-16 object-contain' src={imageToPost} alt="" />
                            <p className='text-xs text-red-500 text-center'>Remove</p>
                        </div>
                    )}
                </div>
            </Box>
          </Modal>
        </div>
    </div>
  )
}

export default InputBoxSpace