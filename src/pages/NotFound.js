import React from 'react'
import ntf from '../assets/not_found.gif';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
    const navigate = useNavigate();

  return (
    <div className={`w-full h-screen flex overflow-hidden justify-end items-center text-black bg-white`}>                  
      <div className='w-[100%] mdd:w-[90%] flex justify-center items-center h-full flex-col p-4 gap-3'>      
        <img src={ntf} alt='' className='w-[300px] h-[300px]' />
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl md:text-3xl lg:text-4xl text-gray-800 mt-6">Page Not Found</p>
          <p className="md:text-lg lg:text-xl text-gray-600 mt-8">Sorry, the page you are looking for could not be found.</p>
          <button onClick={()=>navigate('/')} className='flex justify-center items-center px-3 py-2 gap-2 bg-blue-500 text-white mt-4 rounded-md'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
          </svg>
          <span>Return Home</span></button>
        </div>
      </div>
    </div>

  )
}

export default NotFound