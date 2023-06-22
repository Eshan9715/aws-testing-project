import React from 'react'
import sandWatch from '../../assets/sand_watch.gif'

const Adminapproval = ({show,close}) => {
   
    if(!show){
        return null
    }

  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 z-20 bg-opacity-50 w-full flex justify-center items-center`}>
            <div className={`flex flex-col bg-white w-[35%] h-[450px] gap-4 rounded-lg shadow-lg`}>
            <div className='w-full flex justify-center items-center'>

                <div className='w-[90%] flex flex-col justify-center items-center gap-2'>
                    <img src={sandWatch} alt='' className='w-[350px]' />
                    <p className='text-2xl font-semibold'>Waiting for admin approval</p>
                    <p className='text-[17px]'>to place bookings with Freight Links!</p>
                </div>

            </div>
     
            <div className='flex w-full justify-center items-center mb-5'>
                <button onClick={close} 
                className="flex text-base items-center mt-3 justify-center w-[120px]  px-8 py-2 font-semibold text-white capitalize bg-red-500 rounded-md hover:bg-white hover:text-black hover:border-2 border-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>OK</span>
                </button> 
               
            </div>

            </div>

    </div>
    
    )
}

export default Adminapproval