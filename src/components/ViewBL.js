import React from 'react'
import BLPDF from './BLPDF'
import { PDFDownloadLink } from '@react-pdf/renderer'

const ViewBL = ({show,close,blData,freight,origin,vessel,shipline,destination,id,voyage}) => {
  console.log(blData)

  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 z-20 bg-opacity-50 w-full flex justify-center items-center md:ml-20`}>
        <div className={`flex flex-col bg-white w-[50%] gap-4 rounded-lg shadow-lg overflow-y-auto max-h-[450px]`}>
        {/* <BLPDF blData={blData} vessel={vessel} shipline={shipline}
             origin={origin} destination={destination} freight={freight} voyage={voyage} id={id} /> */}
        <div className='w-full flex flex-col justify-center items-center p-4'>
          <h2 className='font-semibold text-lg'>B / L Instructions</h2>

          <div className='w-full flex flex-col justify-start items-start'>
            <p className='text-sm text-gray-500'>Shipper</p>
            <p className='text-[16px]'>{blData.shipperName}</p>
            <p className='text-[16px]'>{blData.shipperAddress}</p>
            <p className='text-[14px]'>{blData.shippermail} / {blData.shipperTele}</p>

          </div>

          <div className='w-full flex flex-col justify-start items-start'>
          <div className='h-0.5 bg-gray-300 w-full my-2 px-4'></div>
            <p className='text-sm text-gray-500'>Consignee</p>
            <p className='text-[16px]'>{blData.consigneeName}</p>
            <p className='text-[16px]'>{blData.consigneeAddress}</p>
            <p className='text-[14px]'>{blData.consigneemail} / {blData.consigneeTele}</p>

          </div>

          <div className='w-full flex flex-col justify-start items-start'>
          <div className='h-0.5 bg-gray-300 w-full my-2 px-4'></div>
            <p className='text-sm text-gray-500'>Notify party</p>
            <p className='text-[16px]'>{blData.notifyName}</p>
            <p className='text-[16px]'>{blData.notifyAddress}</p>
            <p className='text-[14px]'>{blData.notifymail} / {blData.notifyTele}</p>

          </div>

          <div className='h-0.5 bg-gray-300 w-full my-2 px-4'></div>
          <div className='w-full grid grid-cols-3'>
          <div className='w-full flex flex-col justify-center items-start'>

            <p className='text-sm text-gray-500'>Vessel / Voyage</p>
            <p className='text-[16px]'>{vessel} / {voyage}</p>
            <p className='text-[16px]'></p>

          </div>

          <div className='w-full flex flex-col justify-center items-start'>

            <p className='text-sm text-gray-500'>Port of loading</p>
            <p className='text-[16px]'>{origin.split(',')[1]}</p>
            <p className='text-[16px]'></p>

          </div>

          <div className='w-full flex flex-col justify-center items-start'>

            <p className='text-sm text-gray-500'>Final Destination / Delivery</p>
            <p className='text-[16px]'>{destination.split(',')[1]}</p>
            <p className='text-[16px]'></p>

          </div>
          </div>

          <div className='w-full flex flex-col justify-start items-start'>
          <div className='h-0.5 bg-gray-300 w-full my-2 px-4'></div>
            <p className='text-sm text-gray-500'>Mark & Values</p>
            <p className='text-[16px]'>{blData.markNvalues}</p>          
          </div>

          <div className='w-full flex flex-col justify-start items-start'>
          <div className='h-0.5 bg-gray-300 w-full my-2 px-4'></div>
            <p className='text-sm text-gray-500'>Freight Details</p>
            <p className='text-[16px]'>{freight}</p>          
          </div>

          <div className='w-full flex flex-col justify-start items-start'>
          <div className='h-0.5 bg-gray-300 w-full my-2 px-4'></div>
            <p className='text-sm text-gray-500'>Cargo Description</p>
            <p className='text-[16px]'>{blData.cargoDesc}</p>          
          </div>

          <div className='h-0.5 bg-gray-300 w-full my-2 px-4'></div>
          <div className='w-full grid grid-cols-4'>
          <div className='w-full flex flex-col justify-center items-start'>

            <p className='text-sm text-gray-500'>No: of Packages</p>
            <p className='text-[16px]'>{blData.NoPackages}</p>

          </div>

          <div className='w-full flex flex-col justify-center items-start'>

            <p className='text-sm text-gray-500'>Gross Weight</p>
            <p className='text-[16px]'>{blData.GrossWeight} Kg</p>

          </div>

          <div className='w-full flex flex-col justify-center items-start'>

            <p className='text-sm text-gray-500'>Net Weight</p>
            <p className='text-[16px]'>{blData.NetWeight} Kg</p>

          </div>

          <div className='w-full flex flex-col justify-center items-start'>

          <p className='text-sm text-gray-500'>Volume</p>
          <p className='text-[16px]'>{blData.Volume} Cbm</p>

          </div>
          </div>

          <div className='h-0.5 bg-gray-300 w-full my-2 px-4'></div>
          <div className='w-full grid grid-cols-2'>
          <div className='w-full flex flex-col justify-center items-start'>

            <p className='text-sm text-gray-500'>Container Number:</p>
            <p className='text-[16px]'>{blData.containerData}</p>

          </div>

          <div className='w-full flex flex-col justify-center items-start'>

            <p className='text-sm text-gray-500'>Seal Number</p>
            <p className='text-[16px]'>{blData.sealData}</p>

          </div>

          </div>

          
        </div>


        <div className='w-full flex justify-center items-center gap-3 mb-4'>
        <button onClick={close} 
            className="flex text-base items-center mt-3 justify-center w-[120px]  px-8 py-2 font-semibold text-white capitalize bg-red-500 rounded-md hover:bg-white hover:text-black hover:border-2 border-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
            <span>cancel</span>
        </button>
        <PDFDownloadLink document={<BLPDF blData={blData} vessel={vessel} shipline={shipline}
             origin={origin} destination={destination} freight={freight} id={id} voyage={voyage}/>} filename="BL_FORM">
            {({loading}) => (loading ? <button className="flex text-base items-center mt-3 justify-center w-[120px]  px-8 py-2 font-semibold text-red-500 bg-white capitalize rounded-md border-2 border-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">Loading Document...</button> : 
            <button className="flex text-base items-center mt-3 justify-center w-[120px]  px-8 py-2 font-semibold text-red-500 bg-white capitalize rounded-md border-2 border-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">Download</button> )}
        </PDFDownloadLink>

         
        </div>
       
        </div>

    </div>
  )
}

export default ViewBL


