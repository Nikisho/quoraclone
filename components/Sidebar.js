import React, { useState, setOpen } from 'react'
import Spaces from './Spaces';
import { db } from '../firebase';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import { PencilAltIcon } from '@heroicons/react/outline';


const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='ml-4 md:ml-28  mt-5 pr-7 text-gray-500'>
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
            top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-grow
            rounded-md'>

              <h1 className='text-xl mb-2'>Create a space</h1>
              <p className='mb-5'>Share your interests, curate content, host discussions, and more.</p>
              <div>
                  <p className='text-xl mb-3'>Name</p>
                  <input type='text' 
                  className='outline-none border rounded-md p-2 w-full
                  placeholder:italic focus:border-blue-500' 
                  placeholder='Enter the name of your space'/>
              </div>
              <div className='mt-8 flex px-3 py-0.1 rounded-md  max-w-fit
              bg-green-500 hover:animate-pulse cursor-pointer'>
                <p className='text-md my-2'> + add image</p>
                <PencilAltIcon className='mt-3 ml-3 items-center h-5 '/>
              </div>
            </Box>
          </Modal>
        </div>

        {/* bottom  */}
        <div className='mt-1'>
          <Spaces title='potatoes'/>
          <Spaces title='aubergines'/>
          

        </div>
       
    </div>
  )
}

export default Sidebar;