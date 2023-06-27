import React from 'react'
import { useState } from 'react'
import carg from '../../assets/cargo.png'

const ValuesBox = ({bk,fc,lc,item,c1,c2,c3,c4, t1,t2,t3,t4,t5,f1,f2,f3,f4,f5}) => {
    const [isVisible, setIsvisible] = useState(false)

  return (
    <div className='relative flex' onMouseEnter={()=>setIsvisible(true)} onMouseLeave={()=>setIsvisible(false)}>
        {item==='cutoff'? 
        <p className='text-white flex hover:bg-orange-500 justify-center font-semibold p-1.5 text-[13.5px] w-[90px] bg-blue-500 tracking-wider rounded-md'>
        <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5 mr-2' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>View</p>
        
        :item==='ship'? <svg fill="none" stroke="currentColor" className='w-4 h-4 -ml-2 -mt-5' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path>
        </svg> :

        item==='schedules'? <p className='text-white flex justify-center font-semibold p-1.5 text-[13.5px] w-[100px] bg-blue-500 tracking-wider rounded-md'> <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5 mr-2' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>Cut-Offs</p>
        :
        item==='schedulesF'? <p className='text-white flex hover:bg-orange-500 justify-center font-semibold p-1.5 text-[13.5px] w-[90px] bg-blue-500 tracking-wider rounded-md'> <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5 mr-2' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>Info</p>
        :

        <><img src={carg} alt="vessel" className='w-11 h-11 ml-8' /><svg fill="none" stroke="currentColor" className='w-5 h-5 -ml-1 -mt-1' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path>
        </svg></>}
       
        {((isVisible) && (item==='count')) &&
        <div className='w-[160px] flex flex-col p-1 bg-white border-2 border-black rounded-md shadow-lg absolute z-10 -top-[15px] -translate-x-8 justify-center items-start'>
            <p className='p-0.5 text-[13px]'>Completed Bookings: <span className='ml-2 text-red-500 font-semibold'>{bk}</span></p>
            <p className='p-0.5 text-[13px]'>Pending FCL Quries: <span className='ml-2 text-red-500 font-semibold'>{fc}</span></p>
            <p className='p-0.5 text-[13px]'>Pending LCL Quries: <span className='ml-2 text-red-500 font-semibold'>{lc}</span></p>
        </div>}

        {((isVisible) && (item==='cutoff')) ?
        <div className='w-[230px] flex flex-col p-1 bg-white border-2 border-black rounded-md shadow-lg absolute text-black z-10 -top-[45px] translate-x-4 justify-center items-start'>
            {/* <div className='w-full flex flex-col'><p className='p-0.5 text-[13px]'>Selected Vessel:</p> <p className='text-[13px] text-red-500 font-semibold'>{shipLine===''? 'MAEASK': shipLine} {vessel===''? 'ANDROMEDA': vessel}</p></div> */}
            
            <p className='text-[13px]'>B/L Cutoff: <span className='ml-2 text-red-500 font-semibold'>{c1}</span></p>
            <p className='text-[13px]'>FCL Closing: <span className='ml-2 text-red-500 font-semibold'>{c2}</span></p>
            <p className='text-[13px]'>VGM Cutoff: <span className='ml-2 text-red-500 font-semibold'>{c3}</span></p>
            <p className='text-[13px]'>ETD Colombo: <span className='ml-2 text-red-500 font-semibold'>{c4}</span></p>


        </div>: ((isVisible) && (item==='cutoff')) &&
        <div className='w-[150px] flex flex-col p-1 bg-white border-2 rounded-md shadow-lg absolute z-10 -top-[28px] -translate-x-2 justify-center items-start'>
          <p className='p-0.5 text-[13px]'>Not available here</p>
        </div>
      }

        {((isVisible) && (item==='schedules')) &&
        <div className='min-w-[240px] flex flex-col p-1 bg-white border-2 border-black rounded-md shadow-lg absolute z-10 -top-[55px] translate-x-20 justify-center items-start'>
            <div className='w-full flex justify-start'>
              <p className='text-[13px]'>LCL-Closing:</p> 
              <p className='text-[13px] ml-2 text-red-500 font-semibold flex justify-center'>{t4}</p>
                <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5 ml-3' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className='text-[13px]  text-red-500 font-semibold flex justify-center'>{t5}</p>
            </div>
            <p className='text-[13px]'>ETA-Colombo: <span className='ml-2 text-red-500 font-semibold'>{t1}</span></p>
            <p className='text-[13px]'>ETD-Colombo: <span className='ml-2 text-red-500 font-semibold'>{t2}</span></p>
            <p className='text-[13px]'>ETA-Destination: <span className='ml-2 text-red-500 font-semibold'>{t3}</span></p>

        </div>}

        {((isVisible) && (item==='schedulesF')) &&
        <div className='w-[200px] my-0.5 flex flex-col p-0.5 bg-white border-2 border-black rounded-md shadow-lg absolute z-10 -top-[55px] translate-x-20 justify-center items-start'>
            <p className='text-[13px] text-black'>ETD-Colombo: <span className='ml-2 text-red-500 font-semibold'>{f1}</span></p>
            <p className='text-[13px] text-black'>Transit: <span className='ml-2 text-red-500 font-semibold'>{f2} Days</span></p>
            <p className='text-[13px] text-black'>ETA-Destination: <span className='ml-2 text-red-500 font-semibold'>{f3}</span></p>
            <p className='text-[13px] text-black'>ShipMode: <span className='ml-2 text-red-500 font-semibold'>{f4}</span></p>
            {f4.toLowerCase()!=='direct' && <p className='text-[13px] text-black'>Transhipments: <span className='ml-2 text-red-500 font-semibold'>{f5}</span></p>}
        </div>}
       

    </div>
  )
}

export default ValuesBox
