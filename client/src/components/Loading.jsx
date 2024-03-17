import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="w-20 h-20 rounded-full animate-ping bg-green-500"></div>
      <p className='text-stone-900'>Loading Data...</p>
    </div>
  )
}

export default Loading
