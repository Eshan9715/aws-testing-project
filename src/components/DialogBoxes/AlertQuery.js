import React from 'react'

const AlertQuery = ({origin, destination,serviceMode, type, cargosFCL,cargosLCL, show, close, rDate, title, send, errorStaus,como, freight,forwarder,sta}) => {

    if(!show){
        return null
    }
    
  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 bg-opacity-50 w-full flex justify-center items-center md:ml-20`}>
            <div className={`flex flex-col bg-white w-1/2 gap-4 rounded-lg shadow-lg`}>
            <h3 className='text-lg font-semibold text-center p-4 bg-sky-700 text-white'>{title}</h3>

            <div className='w-full flex flex-col justify-center items-center'>

                <div className='w-full flex justify-center items-center p-1'>
                    <div className='w-[50%] flex flex-col justify-center items-end px-10 font-semibold'>
                        <p>Route :</p>
                    </div>

                    <div className='w-[50%] flex flex-col justify-center items-start'>
                    <p>{origin} - {destination}</p>
                    </div>

                </div>

                <div className='w-full flex justify-center items-center p-1'>
                    <div className='w-[50%] flex flex-col justify-center items-end px-10 font-semibold'>
                        <p>Cargo ready date :</p>
                    </div>

                    <div className='w-[50%] flex flex-col justify-center items-start'>
                    <p>{rDate}</p>
                    </div>

                </div>

                <div className='w-full flex justify-center items-center p-1'>
                    <div className='w-[50%] flex flex-col justify-center items-end px-10 font-semibold'>
                        <p>Commodity :</p>
                    </div>

                    <div className='w-[50%] flex flex-col justify-center items-start'>
                    <p>{como}</p>
                    </div>

                </div>

                <div className='w-full flex justify-center items-center p-1'>
                    <div className='w-[50%] flex flex-col justify-center items-end px-10 font-semibold'>
                        <p>Service Mode :</p>
                    </div>

                    <div className='w-[50%] flex flex-col justify-center items-start'>
                    <p>{serviceMode}</p>
                    </div>

                </div>

                {((sta!=='') && (type==='LCL'))  && <div className='w-full flex justify-center items-center p-1'>
                    <div className='w-[50%] flex flex-col justify-center items-end px-10 font-semibold'>
                        <p>Shipper :</p>
                    </div>

                    <div className='w-[50%] flex flex-col justify-center items-start'>
                    <p>{forwarder}</p>
                    </div>

                </div>}

                <div className='w-full flex justify-center items-center p-1'>
                    <div className='w-[50%] flex flex-col justify-center items-end px-10 font-semibold'>
                        <p>Freight Charges :</p>
                    </div>

                    <div className='w-[50%] flex flex-col justify-center items-start'>
                    <p>{freight}</p>
                    </div>

                </div>

                <div className='w-full flex justify-center items-center p-1'>
                    <div className='w-[50%] flex flex-col justify-center items-end px-10 font-semibold'>
                        <p>Shipment type :</p>
                    </div>
                    <div className='w-[50%] flex flex-col justify-center items-start'>
                        {sta!==''? <p>{type} | {sta}</p>:
                        <p>{type}</p>}

                    </div> 
                </div>

                <div className='w-full flex justify-center items-center p-1'>
                    <div className='w-[50%] flex flex-col justify-center items-end px-10 font-semibold'>
                        <p>Cargo :</p>
                    </div>
                    <div className='w-[50%] flex flex-col justify-center items-start'>
                        {type==="FCL"? cargosFCL.map((cargo,index)=>
                            <div className='w-full'>
                                <div className='flex flex-col gap-2 w-full justify-center items-start' key={index}>
                                    <div className='flex justify-center items-start gap-6'>
                                        <p>{cargo.containerType}</p>
                                        <p>{cargo.quantity}</p>

                                    </div>
                                   
                                
                                </div>
                            </div>
                        ):
                        <div className='flex justify-center items-start gap-4'>
                            <p>{cargosLCL.totalPackages}</p>
                            <p>{cargosLCL.totalVolume} Cbm</p>
                                      
                        </div>
                        }

                    </div>
                </div>
            </div>

             <p className='text-[13px] text-red-600 mb-1 text-center'>{errorStaus}</p>                       
     
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

export default AlertQuery


 