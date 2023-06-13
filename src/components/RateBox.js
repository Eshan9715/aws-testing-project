import React from 'react'
import { useState } from 'react'

const RateBox = ({item,destination,zipcode,commodity,vessel,voyage,company,sales,crd,post}) => {
    const [isVisible, setIsvisible] = useState(false)

  return (
    <div className='relative flex' onMouseEnter={()=>setIsvisible(true)} onMouseLeave={()=>setIsvisible(false)}>
        {item==='rate' &&
        <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path>
        </svg>}
        {(item==='cargo' || 'ship'|| 'fac' || 'consol' || 'consol#' || 'userok'|| 'mobileC') &&
        <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-4 h-4 -ml-[14px] -mt-[22px]' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path>
        </svg>}

        {((isVisible) && (item==='rate')) &&
        <div className='min-w-[200px] flex flex-col p-1 bg-white border-2 border-black rounded-md shadow-lg absolute z-10 -top-[12px] translate-x-8 justify-center items-start'>
            <p className='w-full p-0.5 text-[13px]'>Destination: <span className='ml-1 text-red-500 font-semibold'>{destination}</span></p>
            {zipcode!=='' && <p className='p-0.5 text-[13px]'>zipcode: <span className='ml-1 text-red-500 font-semibold'>{zipcode}</span></p>}
        </div>}

        {((isVisible) && (item==='cargo')) &&
        <div className='min-w-[200px] flex flex-col p-1 bg-white border-2 border-black rounded-md shadow-lg absolute z-10 -top-[24px] translate-x-2 justify-center items-start'>
            <p className='w-full text-[13px]'>Commodity : </p>
            <span className='text-[13px] text-red-500 font-semibold'>{commodity}</span>
        </div>}

        {((isVisible) && (item==='ship')) &&
        <div className='min-w-[200px] flex flex-col p-1 bg-white border-2 border-black rounded-md shadow-lg absolute z-10 -top-[24px] translate-x-2 justify-center items-start'>
            <p className='w-full text-[13px]'>Vessel : </p>
            <span className='text-[13px] text-red-500 font-semibold'>{vessel}-{voyage}</span>
        </div>}

        {((isVisible) && (item==='fac')) &&
        <div className='min-w-[200px] flex flex-col p-1 bg-white border-2 border-black rounded-md shadow-lg absolute z-10 -top-[24px] translate-x-2 justify-center items-start'>
            <p className='w-full text-[13px]'>Company : </p>
            <span className='text-[13px] text-red-500 font-semibold'>{company}</span>
        </div>}

        {((isVisible) && ((item==='consol') || (item==='userok'))) &&
        <div className='min-w-[200px] flex flex-col p-1 bg-white border-2 border-black rounded-md shadow-lg absolute z-10 -top-[30px] translate-x-2 justify-center items-start'>
            <p className='p-0.5 text-[13px]'>Sales person: <span className='ml-2 text-red-500 font-semibold'>{sales}</span></p>
            <p className='p-0.5 text-[13px]'>CRD: <span className='ml-2 text-red-500 font-semibold'>{crd}</span></p>
        </div>}

        {((isVisible) && (item==='consol#')) &&
        <div className='min-w-[200px] flex flex-col p-1 bg-white border-2 border-black rounded-md shadow-lg absolute z-10 -top-[30px] translate-x-2 justify-center items-start'>
            <p className='p-0.5 text-[13px]'>Handled by: <span className='ml-2 text-red-500 font-semibold'>{sales}</span></p>
            <p className='p-0.5 text-[13px]'>CRD: <span className='ml-2 text-red-500 font-semibold'>{crd}</span></p>
        </div>}

        {((isVisible) && (item==='mobileC')) &&
        <div className='min-w-[200px] flex flex-col p-1 bg-white border-2 border-black rounded-md shadow-lg absolute z-10 -top-[30px] translate-x-2 justify-center items-start'>
            <p className='p-0.5 text-[13px]'>{post}<span className='ml-2 text-red-500 font-semibold'>{crd}</span></p>
        </div>}
    </div>
  )
}

export default RateBox