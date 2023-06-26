import React from 'react'
import { useState } from 'react';
import AddAssigner from '../Addings/AddAssigner';

const AdminDataTable = ({data, role, xFact}) => {
    const [addAsg, setAddAsg] = useState(false)
    const [id,setId] = useState('');
    const [crdList, setCrdList] = useState([])
    const [yname,setYname] = useState('');

  return (
    <div className='w-[95%]'>
        <table className="text-center w-full border-2">
            <thead className="bg-slate-200 flex text-black w-full">
                <tr className='text-center flex w-full mb-2'>
                       
                        <th className='py-3 w-[30%]  text-center'>Profile</th>

                        <th className='py-3 w-[30%] text-center'>Email</th>
                        <th className='py-3 w-[20%] text-center'>Mobile</th>
                        <th className='py-3 w-[20%] text-center'>Action</th>
                </tr>
            </thead>

            <tbody className='bg-white flex flex-col items-center justify-between overflow-y-scroll w-full max-h-[340px]'>
                <>                   
                        <>
                            {
                                data.map((sdetail,i)=>(
                                    <tr className='text-center items-center flex w-full mb-4' key={i}>
                                        <td className='p-3 w-[30%]'>
                                            <div className='w-full flex justify-start items-center'>
                                                <img
                                                    className='w-12 h-12 rounded-full'
                                                    src={sdetail.image}
                                                    alt=""
                                                /> 
                                                <div className='flex flex-col gap-1'>
                                                <p className='ml-2'>{sdetail.name}</p>
                                                <p className='ml-2 text-[14px] text-start text-red-500 font-semibold'>{sdetail.role}</p>
                                                </div>
   
                                            </div>
                                        </td>
                                      
                                        <td className='p-3 text-[14px] w-[30%]'>{sdetail.email}</td>
                                        <td className='p-3 w-[20%]'>{sdetail.mobileNumber}</td>

                                        <td className='p-3 w-[20%] gap-3'>
                                        <div className='w-full flex justify-center items-center gap-3'>
                                        <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-7 h-7 cursor-pointer p-1.5 bg-blue-500 rounded-md text-white font-bold' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                        </svg>
                                         
                                        </div>                                    
                                        </td>                                                                                    
                                    </tr>
                                ))
                            }
                    
                        </>          
                </>
                    
            </tbody> 
                            
        </table>
        <AddAssigner show={addAsg} id={id} name={yname} arr={crdList} title='Assign CRDs' role={role} track='addCRD' close={()=>setAddAsg(false)} />

    </div>
  )
}

export default AdminDataTable