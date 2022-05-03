import React from 'react'

function HeaderIcon({ Icon, active }) {
  return (
    <div className='flex items-center
                    cursor-pointer
                    hover:bg-gray-100
                    rounded-xl
                    p-2
                    border-b-2
                    border-white
                    active:border-red-700
                    group'>
        <Icon className={`h-7
                          w-10
                          text-gray-500
                          text-center
                          mx-auto
                          ${active && 'text-red-700'}`}
        />
    </div>
  )
}

export default HeaderIcon