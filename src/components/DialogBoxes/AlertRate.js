import React from 'react'

const AlertRate = ({origin, discharge, type,close, shipline, zipcode, destination, vdate, remarks, rates, show, title, send}) => {

    if(!show){
        return null
    }

    const arr = remarks.split(".");
    var len = remarks.split(".").length;
    arr.splice(len-1,1)
    console.log(origin)
    console.log(discharge)

  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 bg-opacity-50 w-full z-20 flex justify-center items-center md:ml-20`}>
            <div className={`flex flex-col bg-white w-1/2 gap-4 rounded-lg shadow-lg`}>
            <h3 className='text-lg font-semibold text-center p-4 bg-sky-700 text-white'>{title}</h3>

            <div className='w-full flex flex-col justify-center items-center'>

                <div className='w-full flex justify-center items-center p-1'>
                    <div className='w-[50%] flex flex-col justify-center items-end px-10 font-semibold'>
                        <p>Route :</p>
                    </div>

                    <div className='w-[50%] flex flex-col justify-center items-start'>
                    <p>{origin} - {discharge}</p>
                    </div>

                </div>

                <div className='w-full flex justify-center items-center p-1'>
                    <div className='w-[50%] flex flex-col justify-center items-end px-10 font-semibold'>
                        <p>Shipping line :</p>
                    </div>

                    <div className='w-[50%] flex flex-col justify-center items-start'>
                    <p>{shipline}</p>
                    </div>

                </div>

                <div className='w-full flex justify-center items-center p-1'>
                    <div className='w-[50%] flex flex-col justify-center items-end px-10 font-semibold'>
                        <p>Valid date :</p>
                    </div>
                    <div className='w-[50%] flex flex-col justify-center items-start'>
                        <p>{vdate}</p>
                    </div> 
                </div>

                <div className='w-full flex justify-center items-center p-1'>
                    <div className='w-[50%] flex flex-col justify-center items-end px-10 font-semibold'>
                        <p>Delivery Mode :</p>
                    </div>
                    <div className='w-[50%] flex flex-col justify-center items-start'>
                        <p>{type}</p>
                        <p>{destination}</p>
                        <p>{zipcode}</p>

                    </div> 
                </div>

                <div className='w-full flex justify-center items-center p-1'>
                    <div className='w-[50%] flex flex-col justify-center items-end px-10 font-semibold'>
                        <p>Rates :</p>
                    </div>
                    <div className='w-[50%] flex flex-col justify-center items-start'>
                        {rates.map((rat,index)=>
                            <div className='w-full'>
                                <div className='flex flex-col gap-2 w-full justify-center items-start' key={index}>
                                    <div className='flex justify-center items-start gap-4'>
                                        <p>{rat.containerType}</p>
                                        <p>$ {rat.price}</p>
                                       
                                    </div>
                                
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                <div className='w-full flex justify-center items-center p-1'>
                    <div className='w-[50%] flex flex-col justify-center items-end px-10 font-semibold'>
                        <p>Remarks :</p>
                    </div>
                    <div className='w-[50%] flex flex-col justify-center items-start'>
                        {arr.map((remark,index)=>
                            <div className='w-full'>
                                <div className='flex flex-col gap-2 w-full justify-center items-start' key={index}>
                                    <div className='flex justify-center items-start gap-4'>
                                        <p># {remark}.</p>
                                       
                                    </div>
                                
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
                
            <div className='flex w-full justify-center gap-5 items-center mb-5'>
                <button onClick={close}
                className="flex text-base items-center mt-3 justify-center w-[120px]  px-8 py-2 font-semibold text-white capitalize bg-red-500 rounded-md hover:bg-white hover:text-black hover:border-2 border-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>cancel</span>
                </button> 
                <button onClick={send}
                className="flex text-base items-center mt-3 justify-center w-[120px]  px-8 py-2 font-semibold text-white capitalize bg-orange-500 rounded-md hover:bg-white hover:text-black hover:border-2 border-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>ok</span>
                </button> 
            </div>

            </div>

    </div>

    
    )
}

export default AlertRate