import React from 'react'
import Image from 'next/image';
import {HomeIcon,
        UserGroupIcon,
        PencilAltIcon,
        BellIcon,
        ClipboardListIcon,
        SearchIcon,
        GlobeAltIcon  } from "@heroicons/react/outline";
import HeaderIcon from './HeaderIcon';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

function Header() {
    const [user] = useAuthState(auth);
    const provider = new GoogleAuthProvider();
    let button;
    const signIn = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider);
    }
    const logOut = () => {
        signOut(auth);
    }
  return (
    <div className='sticky top-0 
                    z-50
                    bg-white
                    flex items-center
                    p-1
                    lg:px-5
                    shadow-md'>
        {/* Left  */}
        <div className='flex 
                items-center
                ml-0
                md:ml-28'>
            <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/768px-Quora_logo_2015.svg.png?20170609154433'
                   width={88}
                   height={25}
                   layout='fixed'
            />
            <div className='flex ml-4 
                    justify-center flex-grow
                    pl-2'> 
                <HeaderIcon active Icon={HomeIcon} />
                <HeaderIcon Icon={ClipboardListIcon} />
                <HeaderIcon Icon={PencilAltIcon} />
                <HeaderIcon Icon={UserGroupIcon} />
                <HeaderIcon Icon={BellIcon} />

            </div>
        </div>
        {/* Right  */}
        <div className='flex'>
            <div className='hidden lg:flex bg-gray-100
                    p-2 rounded-xl
                    active:ring
                    ml-5
                    mr-2
                    '>
                <SearchIcon className=" h-6 text-gray-500"/>
                <input type="text"
                    placeholder='Search Quora'
                    className='
                    inline-flex
                    ml-2
                    items-center
                    bg-transparent
                    outline-none
                    placeholder-gray-500'
                />

            </div>
            
        </div>
        <div className='flex min-w-fit'>
            {user ?  
                 
                 <Image className='rounded-full animate-pulse'
                 src={user.photoURL}
                 width={30}
                 height={30}
                 alt=''
                 onClick={logOut}
                />
                :
                <div className='flex items-center bg-red-700       
                    rounded-full text-white p-4 h-6 ml-4
                    font-bold'>
                    <button type='submit' onClick={signIn}>Sign in </button>
                </div>
            }
        </div>

        <div className='flex ml-2'>
            <HeaderIcon Icon={GlobeAltIcon} />
        </div>

        <div className='flex items-center bg-red-700
                        
                        min-w-fit
                        rounded-full text-white p-4 h-6 ml-2
                        font-bold'>
                
                <button type='submit'> Add question</button>
        </div>
    </div>
  )
}

export default Header