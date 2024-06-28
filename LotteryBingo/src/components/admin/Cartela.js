import React from 'react'
import { Link } from 'react-router-dom'

const Cartela = () => {
  return (
    <div  className='tw-flex tw-justify-center tw-items-center'>
      <div className='tw-mt-20 tw-rounded-md tw-bg-white tw-shadow-lg tw-p-4 tw-px-10 '>
        <div>
         <h1 className='tw-text-start tw-text-blue-800 tw-font-semibold tw-text-3xl'>Cartela Board Generator</h1>
        </div>
        <div className='tw-flex tw-gap-7 tw-mt-10'>
            <Link to={'/card'} className='tw-border-2 tw-p-1 tw-px-4 tw-border-blue-800 tw-text-blue-800'>Show Cards</Link>
            <Link to={'/generator'} className='tw-border-2 tw-p-1 tw-px-4 tw-border-blue-800 tw-text-blue-800'>Create New Board</Link>
            
        </div>
        
      </div>
    </div>
  )
}

export default Cartela
