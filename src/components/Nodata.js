import React from 'react'
import noData from '../assets/noData.png'


const Nodata = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[460px] border-2 w-full bg-white text-lg'>
    <img src={noData} alt='' className='w-[300px]' />

    No Relevant Data here!

    </div>
    )
}

export default Nodata