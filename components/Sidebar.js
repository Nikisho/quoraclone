import React, { useState, setOpen, useRef } from 'react'
import Spaces from './Spaces';
import { db } from '../firebase';
import { storage } from '../firebase';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import { PencilAltIcon } from '@heroicons/react/outline';
import { addDoc, collection, doc, setDoc, query } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable, uploadString } from 'firebase/storage';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';
import Link from 'next/dist/client/link';
function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const [user] = useAuthState(auth);
  const [imageToPost, setImageToPost] = useState(null);
  const [realTimeSpaces] = useCollection(
    query(collection(db, "spaces"))
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const filePickerRef = useRef(null);
  const inputRef = useRef(null);
  
  const createSpace = async (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    
    await addDoc(collection(db, 'spaces'), { 
      title: inputRef.current.value,
      user: user.displayName
    })
    .then((document) => {
      if (imageToPost) {
        const storage = getStorage();
        const storageRef = ref(storage, `spaces/${document.id}`);
        const uploadTask = uploadString(storageRef, imageToPost, 'data_url');
        const uploadTaskBytes = uploadBytesResumable(storageRef, imageToPost);
        removeImage();

        uploadTaskBytes.on(
          'state_changed',
          null,
          (error) => console.error(error),
          () => {
            getDownloadURL(ref(storage, `spaces/${document.id}`)).then((url) => {
              setDoc(doc(db, "spaces", document.id), {
                postImage: url
              }, { merge: true })
            })
          }
        )
      };
    })
    inputRef.current.value = '';
    handleClose();
  };

  const addSpaceImage = (e) => {
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
    <div className='ml-4 md:ml-28  mt-7 text-gray-500 min-w-fit'>
        {/* top  */}
        <div 
          onClick={handleOpen}
          className='flex items-center p-2 rounded-md bg-gray-200 pr-7
          cursor-pointer hover:bg-gray-300 '>
          <p> + Create Space </p>
        </div>

        {/* middle  */}
        <div>
          {/* modal  */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className='absolute p-5 border-2 bg-gray-50
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-grow
            rounded-md min-w-fit'>

              <h1 className='text-xl mb-2'>Create a space</h1>
              <p className='mb-5'>Share your interests, curate content, host discussions, and more.</p>
              <div>
                  <p className='text-xl mb-3'>Name</p>
                  <form>
                    <input type='text' 
                    ref={inputRef}
                    className='outline-none border rounded-md p-2 w-full
                    placeholder:italic focus:border-blue-500' 
                    placeholder='Enter the name of your space'/>
                    <button hidden onClick={createSpace} type='submit'></button>
                  </form>
              </div>
              <div onClick={() => filePickerRef.current.click()}
                  className='mt-8 flex px-3 py-0.1 rounded-md  max-w-fit
                  bg-green-500 hover:animate-pulse cursor-pointer'>
                <p className='text-md my-2'> + add image</p>
                <PencilAltIcon className='mt-3 ml-3 items-center h-5 '/>
                <input ref={filePickerRef} onChange={addSpaceImage} type="file" hidden/>
              </div>
    
                {imageToPost && (
                  <div onClick={removeImage} className=' absolute right-9 mr-1 bottom-1 filter mt-2 hover:
                  brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer'>
                      <img className = ' h-16 top-1 object-contain' src={imageToPost} alt="" />
                      <p className='text-xs text-red-500 '>Remove</p>
                  </div>
                )}
            </Box>
          </Modal>
        </div>

        {/* bottom  */}
        <div className='mt-1'>
          {realTimeSpaces?.docs.map((space) => (
            <Link href={`/${space.data().title}`}>
                <a>
                <Spaces
                  key={space.id}
                  src={space.data().postImage}
                  title={space.data().title}
                />
              </a>
            </Link>
          ))}
        </div>
       
    </div>
  )
}

export default Sidebar;