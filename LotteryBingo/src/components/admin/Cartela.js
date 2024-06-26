import React from 'react'
import { Link } from 'react-router-dom'

const Cartela = () => {
  return (
    <div  className=' flex justify-center items-center'>
      <div className=' mt-20 rounded-md bg-white shadow-lg p-4 px-10 '>
        <div>
         <h1 className=' text-start text-blue-800 font-semibold text-3xl'>Cartela Board Generator</h1>
        </div>
        <div className=' flex gap-7 mt-10'>
            <Link to={'/card'} className=' border-2 p-1 px-4 border-blue-800 text-blue-800'>Show Cards</Link>
            <Link to={'/generator'} className=' border-2 p-1 px-4 border-blue-800 text-blue-800'>Create New Board</Link>
            
        </div>
        
      </div>
    </div>
  )
}

export default Cartela
