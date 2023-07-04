import React from 'react'
import { useState } from 'react';
import AddAssigner from '../Addings/AddAssigner';
// import LoadingView from './LoadingView';
import Nodata from '../Default/Nodata';
import SeeCRDData from './SeeCRDData';
import ValuesBox from './ValuesBox';
import ChangeRole from '../Addings/ChangeRole';
import pend from '../../assets/pend.gif' 

const DataTable = ({data, role,tabmode,term,name,loading}) => {
    //console.log(loading)
    const [addAsg, setAddAsg] = useState(false)
    const [addSal, setAddSal] = useState(false)
    const [alterRole, setalterRole] = useState(false)

    const [addCRD, setAddCRD] = useState(false)

    const [seeAsg, setSeeAsg] = useState(false)
    const [alterAsg, setAlterAsg] = useState(false)
    //console.log(data)

    const [id,setId] = useState('');
    const [sman,setSman] = useState('');
    const [crman,setCrman] = useState('');

    const [crdList, setCrdList] = useState([])
    const [salesList, setSalesList] = useState([])

    const [yname,setYname] = useState('');
    const [cname,setCname] = useState('');
    const [crname,setCrname] = useState('');
    const [doer,setDoer] = useState('');
    const [rolez,setrolez] = useState('');

    const addAssigner = (x,y,z)=>{
        setAddAsg(true)
        setId(x)
        setYname(y)
        setCrdList(z)
    }

    const changeRole = (x,y,z)=>{
        setalterRole(true)
        setId(x)
        setYname(y)
        setrolez(z)
    }

    const alterAssigner = (x,y,z)=>{
        setAlterAsg(true)
        setId(x)
        setYname(y)
        setSman(z)
       // setCrdList(z)
    }

    const addSalesman = (x,y,z)=>{
        setAddSal(true)
        setId(x)
        setYname(y)
        setSman(z)
       // setCrdList(z)
    }

    const seeCRDData = (p,q,r) =>{
        setSeeAsg(true)
        setId(p)
        setCname(q)
        setSalesList(r)
    }

    const addCRDToShipper = (a,b,c)=>{
        setAddCRD(true)
        setId(a)
        setCrname(b)
        setCrman(c)
        setDoer(name)
    }

  return (
    <div className='w-[95%]'>
        <table className="text-center w-full border-2">
            <thead className="bg-slate-200 flex text-black w-full">
                <tr className='text-center flex w-full mb-1 border-2'>
                       
                    <th className={`p-3 w-[25%]`}>Profile</th>
                    <th className={`p-3 w-[25%]`}>Contacts</th>
                    {/* {role==='ratesmanager'?<th className='py-3 w-[10%] text-center'>Mobile</th>: <th className='py-3 w-[15%] text-center'>Mobile</th>} */}
                    {term!=="clients" && <th className='py-3 w-[15%] text-center justify-center flex'>Clients </th>}
                    {term==="clients" && <th className='py-3 w-[15%] text-center'>FCL / LCL</th> }                             
                    {term==="clients" && <th className='py-3 w-[10%] text-center'>Live Queries</th>}
                    {term!=="clients" && <th className='py-3 w-[15%] text-center justify-center flex'>Bookings </th>}
                    {tabmode==='Salesman' && <th className='py-3 w-[15%] text-center justify-center flex'>Assigned CRDs </th>} {tabmode==='CRD' && <th className='py-3 w-[15%] text-center justify-center flex'>Assigned Salesmans </th>}
                    {((term==='clients') && (role!=='salesman')) && <th className={`p-3 ${tabmode==='pending'? 'w-[15%]': 'w-[25%]'}`}>Assinged</th>}
                    {((term==='clients') && (role==='salesman')) && <th className='py-3 w-[15%] text-center'>AssingedCRD</th>}

                    {role==='ratesmanager' && <th className='py-3 w-[10%] text-center'>Action</th>}
                    {role==='salesman' && <th className='py-3 w-[10%] text-center'>Action</th>}
                    {((role==='admin') && (tabmode==='pending')) && <th className='py-3 w-[10%] text-center'>Action</th>}
                    {((role==='admin') && ((tabmode==='Salesman')||(tabmode==='CRD') )) && <th className='py-3 w-[10%] text-center'>Action</th>}

                </tr>
            </thead>

            <tbody className='bg-slate-50 flex flex-col items-center justify-between overflow-y-scroll w-full max-h-[60vh]'>
                <>                   
                    <>
                        {
                            (data.length===0 && loading)? 
                            <div className='w-full flex flex-col justify-center items-center font-semibold gap-3 min-h-[200px]'>
                            <img src={pend} alt='' className='w-12 h-12'/>
                            <p>Loading Data...</p>
                            </div>
                            :(data.length===0 && !loading)? <Nodata/> : 
                                role==='salesman'? 
                                data.map((sdetail,i)=>(
                                <tr className='text-center items-center flex w-full mb-4' key={i}>
                                    <td className={`p-3 w-[25%] `}>
                                        <div className='w-full flex justify-start items-center'>
                                            <img
                                                className='w-12 h-12 rounded-full'
                                                src={sdetail.image}
                                                alt=""
                                            /> 
                                            <div className='flex justify-center items-start flex-col gap-1'>
                                            <p className='ml-2'>{sdetail.name}</p>
                                            {(data.filter(e=>e.role==='user')).length!==0?<p className='ml-2 text-[14px] text-start text-red-500 font-semibold'>{sdetail.companyName}</p>:<p className='ml-2 text-[14px] text-start text-red-500 font-semibold'>{sdetail.role}</p>}
                                            </div>

                                        </div>
                                    </td>
                                    
                                    <td className={`p-3 w-[25%]`}>
                                        <div className='flex flex-col gap-1'>
                                            <p className='ml-2'>{sdetail.email}</p>
                                            <p className='ml-2 text-[14px] font-semibold text-red-500 tracking-wider'>{sdetail.mobileNumber}</p>
                                        </div>
                                    </td>

                                    {term==="clients" && <td className='px-1 py-1.5 w-[15%]'>
                                        <div className='flex justify-center items-center'>
                                        <ValuesBox item='count' bk={sdetail.bookings.length} fc={sdetail.fclqueries.length} lc={sdetail.lclqueries.length} />
                                        </div>
                                    </td>}
                                    {term==="clients" && <td className={`px-0.5 py-1.5 ${((sdetail.fclqueries.length)>0 || (sdetail.lclqueries.length))>0 ? 'bg-green-500':'bg-red-500'} text-white w-[10%] ml-4  rounded-md`}>{((sdetail.fclqueries.length)>0 || (sdetail.lclqueries.length))>0 ? 'Ongoing': 'No Queries'}                                           
                                    </td>}
                                
                                    {term==="clients" && <td className='p-3 w-[15%]'>{sdetail.assignedCRD}</td>}
                                    
                                    {role==='salesman' && 
                                    <td className='p-3 w-[10%] gap-3'>
                                        <div className='w-full flex justify-center items-center gap-3'>                                              
                                            {(((data.filter(e=>e.role==='user')).length!==0) && (role==='salesman')) &&  <svg fill="none" onClick={()=>addCRDToShipper(sdetail._id,sdetail.name, sdetail.assignedCRD)} stroke="currentColor" stroke-width="1.5" className='w-7 h-7 cursor-pointer p-1.5 bg-blue-500 rounded-md text-white font-bold' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                            </svg>}                                           
                                        </div>                                    
                                    </td> }                                                                                      
                                </tr>
                            ))
                            
                            : data.map((sdetail,j)=>(
                                <tr className='text-center items-center flex w-full mb-4' key={j}>
                                    <td className={`p-3 w-[25%] `}>
                                        <div className='w-full flex justify-start items-center'>
                                            <img
                                                className='w-12 h-12 rounded-full'
                                                src={sdetail.image}
                                                alt=""
                                            /> 
                                            <div className='flex justify-center items-start flex-col gap-1'>
                                            <p className='ml-2'>{sdetail.name}</p>
                                            {(data.filter(e=>e.role==='user')).length!==0?<p className='ml-2 text-[14px] text-start text-red-500 font-semibold'>{sdetail.companyName}</p>:<p className='ml-2 text-[14px] text-start text-red-500 font-semibold'>{sdetail.role}</p>}
                                            </div>

                                        </div>
                                    </td>
                                    
                                    <td className={`p-3 w-[25%]`}>
                                        <div className='flex flex-col gap-1'>
                                            <p className='ml-2'>{sdetail.email}</p>
                                            <p className='ml-2 text-[14px] font-semibold text-red-500 tracking-wider'>{sdetail.mobileNumber}</p>
                                        </div>
                                    </td>

                                    {term==="clients" && <td className='px-1 py-1.5 w-[15%]'>
                                        <div className='flex justify-center items-center'>
                                        <ValuesBox item='count' bk={sdetail.bookings.length} fc={sdetail.fclqueries.length} lc={sdetail.lclqueries.length} />
                                        </div>
                                    </td>}
                                    {term==="clients" && <td className={`px-0.5 py-1.5 ${((sdetail.fclqueries.length)>0 || (sdetail.lclqueries.length))>0 ? 'bg-green-500':'bg-red-500'} text-white w-[10%] ml-4  rounded-md`}>{((sdetail.fclqueries.length)>0 || (sdetail.lclqueries.length))>0 ? 'Ongoing': 'No Queries'}                                           
                                    </td>}

                                    {term!=="clients" && <td className='p-3 w-[15%]'>0</td>}
                                    {term!=="clients" && <td className='p-3 w-[15%]'>0</td>}
                                    {term==="clients" && 
                                    <td className={`p-3 ${tabmode==='pending'? 'w-[15%]': 'w-[25%]'}`}>
                                        <div className='flex flex-col gap-1'>
                                            <p className='ml-2 text-[13.5px]'>Sal: <span className='font-bold'>{sdetail.assignedTo}</span></p>
                                            <p className='ml-2 text-[13.5px]'>CRD: <span className='font-bold'>{sdetail.assignedCRD}</span></p>
                                        </div>                                        
                                    </td>}
                                    {term!=="clients" && <td className='p-3 w-[15%]'>{sdetail.assigned.length}</td>}


                                    {role==='ratesmanager' && 
                                    <td className='p-3 w-[10%] gap-3'>
                                        <div className='w-full flex justify-center items-center gap-3'>
                                            {(data.filter(e=>e.role==='salesman')).length!==0 && 
                                            <svg fill="none" onClick={()=>addAssigner(sdetail._id,sdetail.name, sdetail.assigned)} stroke="currentColor" stroke-width="1.5" className='w-7 h-7 cursor-pointer p-1.5 bg-blue-500 rounded-md text-white font-bold' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                            </svg> }

                                            {(data.filter(e=>e.role==='crd')).length!==0 && <svg fill="none" stroke="currentColor" onClick={()=>seeCRDData(sdetail._id,sdetail.name, sdetail.assigned)} className='w-7 h-7 cursor-pointer p-1.5 bg-blue-500 rounded-md text-white font-bold' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>}

                                            {(((data.filter(e=>e.role==='user')).length!==0) && (tabmode!=='Public')) &&   <svg fill="none" onClick={()=>alterAssigner(sdetail._id,sdetail.name, sdetail.assignedTo)} stroke="currentColor" stroke-width="1.5" className='w-7 h-7 cursor-pointer p-1.5 bg-blue-500 rounded-md text-white font-bold' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                            </svg>}

                                            {(((data.filter(e=>e.role==='user')).length!==0) && (tabmode==='Public'))  && <svg fill="none" onClick={()=>addSalesman(sdetail._id,sdetail.name, sdetail.assignedTo)} stroke="currentColor" stroke-width="1.5" className='w-7 h-7 cursor-pointer p-1.5 bg-blue-500 rounded-md text-white font-bold' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                            </svg>}
                                            
                                        </div>                                    
                                    </td>
                                    }

                                    {((role==='admin') && (tabmode==='pending')) && 
                                    <td className='p-3 w-[10%] gap-3'>
                                        <div className='w-full flex justify-center items-center gap-3'>                                              
                                            {(data.filter(e=>e.role==='user')).length!==0 &&  <svg fill="none" onClick={()=>addSalesman(sdetail._id,sdetail.name, sdetail.assignedTo)} stroke="currentColor" stroke-width="1.5" className='w-7 h-7 cursor-pointer p-1.5 bg-blue-500 rounded-md text-white font-bold' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                            </svg>}

                                            
                                        </div>                                    
                                    </td>} 

                                    {((role==='admin') && ((tabmode==='Salesman')||(tabmode==='CRD') )) && 
                                    <td className='p-3 w-[10%] gap-3'>
                                        <div className='w-full flex justify-center items-center gap-3'>                                              
                                            {(data.filter(e=>e.role!=='user')).length!==0 &&  <svg fill="none" onClick={()=>changeRole(sdetail._id,sdetail.name,sdetail.role )} stroke="currentColor" stroke-width="1.5" className='w-7 h-7 cursor-pointer p-1.5 bg-blue-500 rounded-md text-white font-bold' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                            </svg>}
                                            
                                        </div>                                    
                                    </td>}     

                                    {(role==='salesman') &&  
                                    <td className='p-3 w-[15%] gap-3'>
                                        <div className='w-full flex justify-center items-center gap-3'>                                              
                                            {(data.filter(e=>e.role==='user')).length!==0 &&  <svg fill="none" onClick={()=>addCRDToShipper(sdetail._id,sdetail.name, sdetail.assignedCRD)} stroke="currentColor" stroke-width="1.5" className='w-7 h-7 cursor-pointer p-1.5 bg-blue-500 rounded-md text-white font-bold' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                            </svg>}                                             
                                        </div>                                    
                                    </td>}                                                                                                                      
                                </tr>
                            ))
                        }
                
                    </>          
                </>
                    
            </tbody> 
                            
        </table>
        <ChangeRole show={alterRole} id={id} name={yname} role={rolez}  title='Change Role' close={()=>setalterRole(false)} />

        <AddAssigner show={addAsg} id={id} name={yname} arrz={crdList} title='Assign CRDs' role={role} track='addCRD' close={()=>setAddAsg(false)} />
        <SeeCRDData show={seeAsg} id={id} name={cname} arr={salesList} title='View CRD Data' role={role} close={()=>setSeeAsg(false)} />
        <AddAssigner show={alterAsg} id={id} name={yname} sal={sman} title='Alter Salesman' role={role} track='alterSal' close={()=>setAlterAsg(false)} />
        <AddAssigner show={addCRD} id={id} doer={doer} name={crname} sal={crman} title='Add or edit CRD' role={role} track='addOrEditCRD' close={()=>setAddCRD(false)} />
        <AddAssigner show={addSal} id={id} name={yname} sal={sman} title='Add Salesman' role={role} track='addSal' close={()=>setAddSal(false)} />

    </div>
  )
}

export default DataTable


