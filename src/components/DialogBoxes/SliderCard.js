import React from 'react'
import shipO from '../../assets/ship.png'

const SliderCard= ({discharge,containers,shipmode, validPeriod, shippingline}) => {
  const DportKeys = discharge.split(",");
//   const day = validPeriod.split(",")[1]

  return (
        <div className='w-[95%] flex items-center bg-white rounded-lg px-6 py-3 border'>
          <div className='w-full flex justify-center items-start flex-col'>
            <div className='w-full flex justify-between items-center'>
              <div className='flex justify-center items-center gap-2'>
                  <span>{DportKeys[0]}</span>
                  <span>{DportKeys[1]}</span>
                  <img src={`https://flagcdn.com/20x15/${DportKeys[2].toLowerCase()}.png`} alt="flag" />
              </div>

              <div className='flex justify-center items-center gap-3'>
              <h4 className='font-semibold text-xs text-slate-400'>Until: <span className='text-sm text-black ml-2'> {validPeriod}</span></h4>
              </div>
            </div>

            <div className='w-full h-0.5 bg-slate-200 my-1'></div>

            <div className='w-full flex justify-between items-center'>
              <div className='flex flex-col justify-center items-start my-2'>
              {containers.map((rat,index)=>(
                    <div className='w-full flex justify-start items-center gap-x-12 gap-y-2' key={index}>
                      <div className='flex justify-start items-center gap-2'>
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"></path>
                        </svg>
                        <p>{rat.containerType}</p>

                      </div>
                  
                      <p>$ {rat.rate}</p>

                    </div>
                ))}

              </div>

              <div className='flex justify-center items-start my-2 flex-col'>
                <div className='flex justify-center items-center gap-2'>
                  <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-6 h-6 mt-1' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"></path>
                  </svg>
                  <span className='font-semibold text-xs'>{shipmode}</span>

                </div>
                <div className='flex justify-center items-center gap-2'>
                  <img src={shipO} alt='' className='w-6 h-6'/>
                  <span className='font-semibold text-xs'>{shippingline}</span>

                </div>

              </div>



            </div>
               
          </div>
        </div>

    
  )
}

export default SliderCard