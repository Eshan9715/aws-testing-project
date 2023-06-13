import React from 'react'
import user from '../assets/user.png'
import moment from 'moment'

export const Message = ({type,msg,time,person,chatReply}) => {
  console.log(person)
  return (
    <div className={`w-full ${type==='my'? 'items-end ':'items-start'} flex justify-center flex-col mt-2`}>
        <div className='max-w-[55%] flex flex-col'>
            <div className='w-full flex justify-start items-start gap-2'>
                <img src ={user} alt='user' className='w-7 h-7 rounded-full' />
                <div className={`w-full ${type==='my'? 'bg-gray-300 text-black':'bg-sky-600 text-white'} flex flex-col gap-0.5 py-1.5 rounded-md`}>
                    <div className='w-full flex justify-between items-center'>
                      <p className='text-[12.5px] px-2'>{type==='my'? 'You': person}</p>
                      <div className='flex justify-start gap-1 px-2 items-start cursor-pointer' onClick={chatReply}>
                        <svg fill="none" stroke="currentColor" className='w-3 h-3' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"></path>
                        </svg>
                        <p className='text-[11px] font-semibold'>Reply</p>
                      </div>
                    </div>
                    <p className={`px-2`}>{msg}</p>
                </div>
            </div>
            <p className='w-full flex justify-end items-center text-[13px]'>{moment(time).fromNow()}</p>

        </div>
    </div>
  )
}

export const RepliedMessage = ({type,msg,time,person,chatReply,type1,msg1,person1}) => {
  return (
    <div className={`w-full ${type==='my'? 'items-end ':'items-start'} flex justify-center flex-col mt-2`}>
        <div className='max-w-[55%] flex flex-col'>
            <div className='w-full flex justify-start items-start gap-2'>
                <img src ={user} alt='user' className='w-7 h-7 rounded-full' />
                <div className={`w-full ${type==='my'? 'bg-gray-300 text-black':'bg-sky-600 text-white'} flex flex-col gap-0.5 py-1.5 rounded-md`}>
                    <div className='w-full flex justify-between items-center'>
                      <p className='text-[12.5px] px-2'>{type==='my'? 'You': person}</p>
                      <div className='flex justify-start gap-1 px-2 items-start cursor-pointer' onClick={chatReply}>
                        <svg fill="none" stroke="currentColor" className='w-3 h-3' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"></path>
                        </svg>
                        <p className='text-[11px] font-semibold'>Reply</p>
                      </div>
                    </div>

                    <div className={`w-full flex justify-center items-start`}>
                      <div className={`w-full m-1 p-1 ${type1==='my'? 'bg-gray-100 text-black':'bg-sky-400 text-white'} flex flex-col justify-center items-start border rounded-md`}>
                        <p className='text-[12.5px] px-2 text-start'>{type1==='my'? 'You': person1}</p>
                        <p className={`px-2 mt-2 text-[13px]`}>{msg1}</p>
                      </div>
                    </div>
                    
                    <p className={`px-2`}>{msg}</p>
                </div>
            </div>
            <p className='w-full flex justify-end items-center text-[13px]'>{moment(time).fromNow()}</p>

        </div>
    </div>
  )
}

export const ReplyMessage = ({type,msg,person,noReply}) => {
  return (
    <div className={`w-full ${type==='my'? 'bg-gray-300 text-black':'bg-sky-600 text-white'} flex justify-center items-center gap-2`}>
        <div className={`w-full flex flex-col gap-0.5 py-1.5 px-2`}>
            <div className='w-full flex justify-between items-center'>
              <p className='text-[12.5px] px-2'>{type==='my'? 'You': person}</p>
            </div>
            <p className={`px-2`}>{msg}</p>
        </div>
        <div className='flex justify-end items-center'>
            <svg fill="none" stroke="currentColor" className='w-9 h-9 font-semibold p-1' onClick={noReply} stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        </div>
    </div>
  )
}

