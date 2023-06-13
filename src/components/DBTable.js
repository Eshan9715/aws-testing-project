import React from 'react'

const DBTable = ({type}) => {
  return (
   
<div class="w-full relative overflow-x-auto mt-1">
    {type==='ship'? 
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-2">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-2">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Shippers
                </th>
                <th scope="col" class="px-6 py-3">
                    Destination
                </th>
               
                <th scope="col" class="px-6 py-3">
                    Total Cbm
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white tracking-wide border-b  dark:border-gray-400 text-gray-900">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Atlas lanka
                </th>
                <td class="px-6 py-4">
                    Hamburg
                </td>
               
                <td class="px-6 py-4">
                    35.9
                </td>
            </tr>
            <tr class="bg-white tracking-wide border-b dark:border-gray-400 text-gray-900">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Hemas
                </th>
                <td class="px-6 py-4">
                    Felixtowe
                </td>
               
                <td class="px-6 py-4">
                   23.6
                </td>
            </tr>
            <tr class="bg-white tracking-wide text-gray-900 border-b dark:border-gray-400">
                <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap">
                    Dravima Lanka
                </th>
                <td class="px-6 py-4">
                    Singapore
                </td>
               
                <td class="px-6 py-4">
                    21.4
                </td>
            </tr>
            <tr class="bg-white tracking-wide text-gray-900 border-b dark:border-gray-400">
                <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap">
                    Ferentino
                </th>
                <td class="px-6 py-4">
                    Busan
                </td>
               
                <td class="px-6 py-4">
                    11.4
                </td>
            </tr>
            <tr class="bg-white tracking-wide text-gray-900">
                <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap">
                    Darwiston
                </th>
                <td class="px-6 py-4">
                    Singapore
                </td>
               
                <td class="px-6 py-4">
                    1.4
                </td>
            </tr>
        </tbody>
    </table>
    :
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