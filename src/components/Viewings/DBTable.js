import React from 'react'

const DBTable = ({type}) => {
  return (
   
<div className="w-full mt-1 overflow-x-auto">
    {type==='ship'? 
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-2">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-2">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Shippers
                </th>
                <th scope="col" className="px-6 py-3">
                    Destination
                </th>
               
                <th scope="col" className="px-6 py-3">
                    Total Cbm
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white tracking-wide border-b  dark:border-gray-400 text-gray-900">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Atlas lanka
                </th>
                <td className="px-6 py-4">
                    Hamburg
                </td>
               
                <td className="px-6 py-4">
                    35.9
                </td>
            </tr>
            <tr className="bg-white tracking-wide border-b dark:border-gray-400 text-gray-900">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Hemas
                </th>
                <td className="px-6 py-4">
                    Felixtowe
                </td>
               
                <td className="px-6 py-4">
                   23.6
                </td>
            </tr>
            <tr className="bg-white tracking-wide text-gray-900 border-b dark:border-gray-400">
                <th scope="row" className="px-6 py-4">
                    Dravima Lanka
                </th>
                <td className="px-6 py-4">
                    Singapore
                </td>
               
                <td className="px-6 py-4">
                    21.4
                </td>
            </tr>
            <tr className="bg-white tracking-wide text-gray-900 border-b dark:border-gray-400">
                <th scope="row" className="px-6 py-4">
                    Ferentino
                </th>
                <td className="px-6 py-4">
                    Busan
                </td>
               
                <td className="px-6 py-4">
                    11.4
                </td>
            </tr>
            <tr className="bg-white tracking-wide text-gray-900">
                <th scope="row" className="px-6 py-4">
                    Darwiston
                </th>
                <td className="px-6 py-4">
                    Singapore
                </td>
               
                <td className="px-6 py-4">
                    1.4
                </td>
            </tr>
        </tbody>
    </table>
    :
    type==='Salesman'?

    <table className="w-full border border-collapse">
        <thead className="bg-slate-100 flex text-black w-full">
            <tr className='text-start flex w-full'>
                <th className='px-2 py-2 min-w-[200px] border border-collapse'>
                    Shippers
                </th>
                <th className='px-2 py-2 min-w-[200px] border border-collapse'>
                    Destination
                </th>              
                <th className='px-2 py-2 min-w-[100px] border border-collapse'>
                    FCL/LCL
                </th>
                <th className='px-2 py-2 min-w-[200px] border border-collapse'>
                    Cargo
                </th>
            </tr>
        </thead>

        <tbody className='max-h-[200px] flex flex-col items-center overflow-y-scroll w-full'>
            <tr className="text-start items-center flex w-full ">
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    Atlas lanka
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    Hamburg
                </td> 
               
                <td className="px-2 py-2 border border-collapse min-w-[100px]">
                    FCL
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    20GP
                </td>
                
            </tr>
            <tr className="text-start items-center flex w-full">
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    Hemas
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    Felixtowe
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[100px]">
                   LCL
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                   20 boxes
                </td>
            </tr>
            <tr className="text-start items-center flex w-full">
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    Dravima Lanka
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    Singapore
                </td>               
                <td className="px-2 py-2 border border-collapse min-w-[100px]">
                    FCL
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    40HC
                </td>
            </tr>
            <tr className="text-start items-center flex w-full">
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    Ferentino
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    Busan
                </td>               
                <td className="px-2 py-2 border border-collapse min-w-[100px]">
                    FCL
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    40GP
                </td>
            </tr>
            <tr className="text-start items-center flex w-full">
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    Darwiston
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    Singapore
                </td>               
                <td className="px-2 py-2 border border-collapse min-w-[100px]">
                    LCL
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    40 Cartoons
                </td>
            </tr>
        </tbody>
    </table>: type==='crd'?
    <table className="w-full border border-collapse">
        <thead className="bg-slate-100 flex text-black w-full">
            <tr className='text-start flex w-full'>
                <th className='px-2 py-2 min-w-[250px] border border-collapse'>
                    Shipment
                </th>
                <th className='px-2 py-2 min-w-[150px] border border-collapse'>
                    FCL/LCL
                </th>
                <th className='px-2 py-2 min-w-[250px] border border-collapse'>
                    Shipper
                </th>              
                <th className='px-2 py-2 min-w-[200px] border border-collapse'>
                    Salesman
                </th>
                <th className='px-2 py-2 min-w-[200px] border border-collapse'>
                    Remaining Time
                </th>
            </tr>
        </thead>

        <tbody className='max-h-[200px] flex flex-col items-center overflow-y-scroll w-full'>
            <tr className="text-start items-center flex w-full ">
                <td className="px-2 py-2 border border-collapse min-w-[250px]">
                    Colombo-Sydney
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[150px]">
                    FCL
                </td>               
                <td className="px-2 py-2 border border-collapse min-w-[250px]">
                    Tetra Innovations
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    venura Bandara
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px] bg-red-500 m-1 text-white font-semibold text-center">
                    2 days 5 hours
                </td>
                
            </tr>
            <tr className="text-start items-center flex w-full ">
                <td className="px-2 py-2 border border-collapse min-w-[250px]">
                    Colombo-Dubai
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[150px]">
                    FCL
                </td>               
                <td className="px-2 py-2 border border-collapse min-w-[250px]">
                    Atlas-lanka
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    Duminda Almeda
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px] bg-red-500 m-1 text-white font-semibold text-center"> 
                    1 days 13 hours
                </td>
                
            </tr>
            <tr className="text-start items-center flex w-full ">
                <td className="px-2 py-2 border border-collapse min-w-[250px]">
                    Colombo-NewDehli        
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[150px]">
                    LCL
                </td>               
                <td className="px-2 py-2 border border-collapse min-w-[250px]">
                    Hemas lanka
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    Weeran Bandara
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px] bg-red-500 m-1 text-white font-semibold text-center">
                    3 days 11 hours
                </td>
                
            </tr>
            {/* <tr className="text-start items-center flex w-full ">
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    Colombo-Sydney
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[100px]">
                    FCL
                </td>               
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    Tetra Innovations
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    venura Bandara
                </td>
                <td className="px-2 py-2 border border-collapse min-w-[200px]">
                    2 days 5 hours
                </td>
                
            </tr> */}
           
        </tbody>
    </table>:
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-2">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Destinations
                </th>
                <th scope="col" class="px-6 py-3">
                    Total LCLs
                </th>
               
                <th scope="col" class="px-6 py-3">
                    Total Cbm
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b  dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Hamburg
                </th>
                <td class="px-6 py-4">
                    5
                </td>
               
                <td class="px-6 py-4">
                   34.4
                </td>
            </tr>
            <tr class="bg-white border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Felixtowe
                </th>
                <td class="px-6 py-4">
                    8
                </td>
               
                <td class="px-6 py-4">
                    29.8
                </td>
            </tr>
            <tr class="bg-white">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                   Singapore
                </th>
                <td class="px-6 py-4">
                    6
                </td>
               
                <td class="px-6 py-4">
                    15.4
                </td>
            </tr>
        </tbody>
    </table>
    }
</div>

  )
}

export default DBTable