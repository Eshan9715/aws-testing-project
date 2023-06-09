import React from 'react'

const Success = ({title,action,type,handleClick}) => {
  return (
    <div className=' w-full flex justify-center items-center p-2 '>
    <div  className={`${type==="low"? "w-[100%]":"w-[50%]"} flex flex-col justify-center items-center`}>
      <div className='w-full flex justify-center items-center bg-green-400 flex-col p-8 rounded-t-lg'>
        <svg fill="none" stroke="currentColor" stroke-width="1.5"  className='w-[70px] h-[70px] text-white' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>    
        <p className={`text-white  ${type==="low"? "text-base": type==="medium"? "text-lg" : type==="high"?"text-xl":"text-sm"}  tracking-widest font-bold`}>Success</p>                
      </div>
      <div className='w-full flex justify-center items-center bg-white flex-col shadow-md p-6 rounded-b-lg'>
        <p className={`text-gray-800 ${type==="low"? "text-sm": type==="medium"? "text-base" : type==="high"?"text-lg":"text-sm"} text-center  tracking-wide`}>Congratulations, {title}</p>                
        <p className={`text-gray-800 ${type==="low"? "text-sm": type==="medium"? "text-base" : type==="high"?"text-lg":"text-sm"} text-center mt-3  tracking-wide`}>has been successfully {action}</p>   

        <button onClick={handleClick}
        className="flex items-center justify-center w-full my-2 px-6 py-3 mt-6 font-bold text-base tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-400 rounded-md hover:bg-green-200 focus:outline-none focus:ring focus:ring-lime-300 focus:ring-opacity-50">
        <span>Continue </span>

        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className='w-4 h-4 mt-1 ml-2'>
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
        </svg>
      </button>           
      </div>

      
    </div>
    
    
   
    </div>
  //   <div className="relative top-20 mx-auto p-5 border w-[50%] shadow-lg rounded-md bg-white">
	//     <div className="mt-3 text-center">
	// 	    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
  //         <svg
  //           className="h-6 w-6 text-green-600"
  //           fill="none"
  //           stroke="currentColor"
  //           viewBox="0 0 24 24"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             stroke-linecap="round"
  //             stroke-linejoin="round"
  //             stroke-width="2"
  //             d="M5 13l4 4L19 7"
  //           ></path>
  //         </svg>
	// 	    </div>
  //     <h3 className="text-lg leading-6 font-medium text-gray-900">Successful!</h3>
	// 	  <div className="mt-2 px-7 py-3">
	// 		  <p className="text-sm text-gray-500">
	// 			Account has been successfully registered!
	// 		  </p>
	// 	  </div>
	// 	  <div className="items-center px-4 py-3">
  //       <button
  //         id="ok-btn"
  //         className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
  //       >
  //         OK
  //       </button>
	// 	  </div>
	//   </div>
  // </div>

  )
}

export default Success