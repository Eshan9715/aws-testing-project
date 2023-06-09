import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Automan from '../TextUI/Automan'
import { MultipleInputs } from '../TextUI/MultipleInputs'
import user from '../../assets/user.png'
// import { useSelector } from 'react-redux'

var arr=[]
var addSalestoCRD = {} 

const AddAssigner = ({show,title,close,id,name,role,term,track,sal,doer,arrz}) => {
    var http = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();

    const [cName, setcName] = useState('')
    const [error, setError] = useState('')
    const [salesmans, setSalesmans] = useState([])
    const [crds, setCrds] = useState([])

    const [users, setUsers] = useState([])
    const [members, setmembers] = useState([])

    //salesmans.filter(t=>t._id===id)[0].assigned

    const [crlist, setcrList] = useState([]);

    const [staate, setstaate] = useState('')
    const [okDel, setokDel] = useState(false)

    //console.log(cName)

    useEffect(() => {
          const getUsers = ()=>{
            axios
            .get(`${http}/api/user`)
            .then((res) => {
              //console.log(res.data);
              setUsers(res.data.users)
            })
            .catch(err=> {
              console.log(err);
            })     
          }
          getUsers();

          const getMembers = ()=>{
            axios
            .get(`${http}/api/member`)
            .then((res) => {
              //console.log(res.data);
              setmembers(res.data.member)
              setSalesmans(members?.filter(e=> e.role==='salesman'))
              setCrds(members?.filter(er=> er.role==='crd'))

            })
            .catch(err=> {
              console.log(err);
            })     
          }
          getMembers();
    
    }, [http,members]);    

    //delArr = salesmans?.filter(t=>t._id===id)[0]?.assigned;

    const send = ()=>{
      if(role==='admin' && staate==='YES'){
        if(cName===''){
          setError('Please fill the required details !!')
        }else{
          sendRequest();
          close();
        }
      } else if(role==='admin' && staate==='NO'){
        sendRequest();
        close();

      }else if(role==='ratesmanager' && track==='addSal'){
        if(cName===''){
          setError('Please fill the required details !!')
        }else{
          sendRequest2();
          close();
        }
      }else if(role==='ratesmanager' && track==='addCRD' && okDel===false){
        console.log(crlist)
        crlist.map(e=>(
          arr.push(e.name)
        ))
        console.log(arr)
        sendRequest3(arr);
        close();
        
      } else if(role==='ratesmanager' && track==='addCRD' && okDel===true){
        console.log(arrz);
        deleteCRD(arrz);
        close();
        
        }else if(role==='ratesmanager' && track==='alterSal' && staate==='YES'){
        if(cName===''){
          setError('Please fill the required details !!')
        }else{
          sendRequest2();
          close();
        }
      } else if(role==='ratesmanager' && track==='alterSal' && staate==='NO'){
        close();

      } else if(role==='salesman' && track==='addOrEditCRD' && staate==='YES'){
        if(cName===''){
          setError('Please fill the required details !!')
        }else{
          sendRequest4();
          close();
        }
      } else if(role==='salesman' && track==='addOrEditCRD' && sal==='pending'){
        if(cName===''){
          setError('Please fill the required details !!')
        }else{
          sendRequest4();
          navigate('/clients')
          close();
        }
     
    }
  }

    const sendRequest = async() =>{
        const addSalesman = { 
          assignedTo: cName!==''? cName: 'Public',
          id: id,
        }        
        axios
        .put(`${http}/api/user/assignTo/${id}`,addSalesman)
        .then((res) => {
          console.log(res.data);
    
      });
      setstaate('');
      setcName('');
    }

    const sendRequest2 = async() =>{
      const addSalesman2 = { 
        assignedTo: cName, 
        id: id,
      }        
      axios
      .put(`${http}/api/user/assignTo/${id}`,addSalesman2)
      .then((res) => {
        console.log(res.data);
  
    });
    setcName('');

  }



  const addSalesmanToCRDs = async(arr)=>{
    for(let k=0; k<arr.length; k++){
      crds.filter(t=>t.name===arr[k])[0].assigned.push(name);
      var id1 = crds.filter(t=>t.name===arr[k])[0]._id

      addSalestoCRD = {
      assigned: (crds.filter(t=>t.name===arr[k])[0].assigned),
      id: id1,
      }
     
      axios
      .put(`${http}/api/member/assignCRD/${id1}`,addSalestoCRD)
      .then((res) => {
        console.log(res.data);

      //(res.data)
      })
    }
    arr.length=0
  }

  const sendRequest3 = async(arr) =>{
    const addCRDman = { 
      assigned: (salesmans.filter(t=>t._id===id)[0].assigned).concat(arr),
      id: id,
    }        
    axios
    .put(`${http}/api/member/assignCRD/${id}`,addCRDman)
    .then((res) => {
      console.log(res.data);
    });
  addSalesmanToCRDs(arr);
}

  const sendRequest4 = async() =>{
    const addCrd1 = { 
      assignedCRD: cName===''? 'pending': cName, 
      id: id,
    }        
    axios
    .put(`${http}/api/user/assignCRD/${id}`,addCrd1)
    .then((res) => {
      console.log(res.data);
    });
    setcName('');
    setstaate('');

  }

  if(!show){
      return null
  }

    const getCRDData = (p,ar) =>{
      //setdelArr(salesmans.filter(t=>t._id===id)[0].assigned)
      for( var i = 0; i < ar.length; i++){ 
    
        if ( ar[i] === p) { 
    
            ar.splice(i, 1); 
        }    
      }
      var arr1 = crds.filter(t=>t.name===p)[0].assigned;
      for( var j = 0; j < arr1.length; j++){ 
    
      if ( arr1[j] === name) { 
  
          arr1.splice(j, 1); 
      }    
    }
    console.log(arr1)
    deleteSales(arr1,p);
    console.log(ar)
    setokDel(true)
    }

    const deleteCRD = (arr) => {
      const delCRDman = { 
        assigned: arr,       
      }
  
      axios
        .put(`${http}/api/member/assignCRD/${id}`,delCRDman)
        .then((res) => {
          console.log(res.data);
      });
    }

    const deleteSales = (arr1,p) => {
    const delSalman = { 
      assigned: arr1,
      id: crds.filter(t=>t.name===p)[0]._id,
    }        

    axios
      .put(`${http}/api/member/assignCRD/${crds.filter(t=>t.name===p)[0]._id}`,delSalman)
      .then((res) => {
        console.log(res.data);
    });
  }
  

    

  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 z-20 bg-opacity-50 w-full flex justify-center items-center md:ml-20`}>
            <div className={`flex flex-col bg-white w-[40%] gap-4 rounded-lg shadow-lg`}>
            <h3 className='text-lg font-semibold text-center p-4 bg-sky-700 text-white'>{title}</h3>
            <div className='w-full flex justify-center items-center'>

                <div className='w-[90%] flex flex-col justify-center items-center gap-2'>
                    <div className='flex justify-center items-center gap-2'>

                    {/* addsalesman - By ratesmanager or admin to shipper */}
                      {role==='admin' && 
                      <div className='flex flex-col'>
                      <div className='flex justify-center items-center'>
                      <p>Is <span className='font-semibold'>{name}</span> regular shipper with Freight links ?</p>
                      <FormControl sx={{ m: 1, width:'140px',borderRadius:2 }}>
                              <InputLabel id="demo-select-small">status</InputLabel>
                                  <Select
                                      value={staate}
                                      label="status"
                                      onChange={(e)=>setstaate(e.target.value)}
                                      className='py-0.5'
                                      size='small'
                                  >
                                      <MenuItem value={"YES"}>YES</MenuItem>
                                      <MenuItem value={"NO"}>NO</MenuItem>
                                  </Select>
                      </FormControl>
                      </div>
                      {((staate==='YES') && (track==='addSal')) && <div className='w-[96%]'><Automan options={salesmans} title="Salesman name"  setSlData={setcName}/></div>}
                      </div>

                      }
                    </div>

                    {/* add salesman to shipper by rates manager*/}
                     {((track==='addSal') && (role==='ratesmanager')) && 
                      <>
                        <p className='mb-2 text-center'>Shipper <span className='font-semibold'>{name}</span> has <span className=' text-red-500 font-bold px-2'>not assigned</span> to Salesman!</p>
                        
                        {/* show trade term of shipper to ratesmanager */}
                        {((track==='addSal') && (role==='ratesmanager')) && <p className='mb-2'>Shipper <span className='font-semibold'>{name}</span> normally do <span className='font-semibold'>{term==='Both'? 'Both Imports & Exports': term==="Imports only"? "Imports only": "Exports only"}</span></p>}

                        {/* addsalesman - By ratesmanager or admin to shipper */}
                        {((role==='ratesmanager') && (track==='addSal')) && <div className='w-[96%]'><Automan options={salesmans} title="Salesman name"  setSlData={setcName}/></div>}

                        {/* <div className='w-[96%]'><Automan options={salesmans.filter(h=>!(users.filter(t=>t._id===id)[0].assignedTo===h.name))} title="Salesman name"  setSlData={setcName}/></div>                     */}
                      </>
                    }


                   
                    {/* For rates manager --- showCRD - CRD Count with salesman */}
                      {((track==='addCRD') && (role==='ratesmanager') && 
                      ((salesmans.filter(t=>t._id===id)[0].assigned).length===0)) &&
                      <p className='mb-2'>Salesman <span className='font-semibold'>{name}</span> has no CRDs!</p>}
                   
                      {/* Change salesman if ratesmanager want remove in clients table*/}
                      {((track==='alterSal') && (role==='ratesmanager')) && 
                      <>
                      <p className='mb-2 text-center'>Shipper <span className='font-semibold'>{name}</span> has dealed with Salesman <span className=' text-red-500 font-bold px-2'>{sal}</span> already!</p>

                      <p>If you want to change <span className='font-semibold'>{name}'s</span> salesman?</p>
                      <FormControl sx={{ m: 1, width:'140px',borderRadius:2 }}>
                              <InputLabel id="demo-select-small">status</InputLabel>
                                  <Select
                                      value={staate}
                                      label="status"
                                      onChange={(e)=>setstaate(e.target.value)}
                                      className='py-0.5'
                                      size='small'
                                  >
                                      <MenuItem value={"YES"}>YES</MenuItem>
                                      <MenuItem value={"NO"}>NO</MenuItem>
                                  </Select>
                      </FormControl>

                    {/* Editsalesman - By ratesmanager to shipper */}

                      {((staate==='YES') && (track==='alterSal') && (role==='ratesmanager')) && <div className='w-[96%]'><Automan options={salesmans.filter(h=>!(users.filter(t=>t._id===id)[0].assignedTo===h.name))} title="Salesman name"  setSlData={setcName}/></div>}

                    {/* no change with salesman */}

                    {((staate==='NO') && (track==='alterSal') && (role==='ratesmanager')) && <p>Then Shipper will continue with Salesman <span className=' text-red-500 font-bold px-2'>{sal}</span>. </p>}
                    
                    </>}

                    {/* Add or change CRD of shipper by salesman*/}
                    {((track==='addOrEditCRD') && (role==='salesman')) && 
                      <>
                      {
                        sal==='pending'? <p className='mb-2 text-center'>Shipper <span className='font-semibold'>{name}</span> <span className=' text-red-500 font-bold px-1'>doesn't have CRD</span> currently!</p>
                        : 
                        <p className='mb-2 text-center'>Shipper <span className='font-semibold'>{name}</span> has dealed with CRD <span className=' text-red-500 font-bold px-2'>{sal}</span> already!</p>
                      }

                    {sal!=='pending' && 
                    <>
                      <p>If you want to add or change <span className='font-semibold'>{name}'s</span> CRD?</p>
                      <FormControl sx={{ m: 1, width:'140px',borderRadius:2 }}>
                              <InputLabel id="demo-select-small">status</InputLabel>
                                  <Select
                                      value={staate}
                                      label="status"
                                      onChange={(e)=>setstaate(e.target.value)}
                                      className='py-0.5'
                                      size='small'
                                  >
                                      <MenuItem value={"YES"}>YES</MenuItem>
                                      <MenuItem value={"NO"}>NO</MenuItem>
                                  </Select>
                      </FormControl>
                    </>
                    }

                      {((staate==='YES') && (track==='addOrEditCRD') && (role==='salesman')) && 
                        <FormControl sx={{ m: 1, width:'98%',borderRadius:2 }}>
                              <InputLabel id="demo-select-small">CRD Name</InputLabel>
                                  <Select
                                      value={cName}
                                      label="CRD Name"
                                      onChange={(e)=>setcName(e.target.value)}
                                      className='py-0.5'
                                      size='small'
                                  >
                                  {(salesmans.filter(f=>f.name===doer)[0].assigned).map((r,index)=>
                                      <MenuItem value={r} key={index}>{r}</MenuItem>
                                  )}
                                  </Select>
                        </FormControl>
                      }

                      {((sal==='pending') && (track==='addOrEditCRD') && (role==='salesman')) && 
                        <FormControl sx={{ m: 1, width:'98%',borderRadius:2 }}>
                            <InputLabel id="demo-select-small">CRD Name</InputLabel>
                                <Select
                                    value={cName}
                                    label="CRD Name"
                                    onChange={(e)=>setcName(e.target.value)}
                                    className='py-0.5'
                                    size='small'
                                >
                                {(salesmans.filter(f=>f.name===doer)[0].assigned).map((r,index)=>
                                    <MenuItem value={r} key={index}>{r}</MenuItem>
                                 )}
                                </Select>
                        </FormControl>
                      }

                      {/* <Automan options={salesmans.filter(e=>e.role==='salesman').filter(f=>f.name===doer)[0].assigned} title="CRD name"  setSlData={setcName}/></div>} */}

                    {/* set new shipper as public by admin - pass to salesman */}

                      {((staate==='NO') && (track==='addOrEditCRD') && (role==='salesman') && (sal!=='pending')) && <p>Then Shipper will continue with CRD <span className=' text-red-500 font-bold px-2'>{sal}</span>. </p>}
                      {((staate==='NO') && (track==='addOrEditCRD') && (role==='salesman') && (sal==='pending')) && <p>Then Shipper doesn't have CRD yet. </p>}

                    </>}

                    {/* showCRD - already with salesman*/}
                    {((track==='addCRD') && (role==='ratesmanager') && 
                      ((salesmans.filter(t=>t._id===id)[0].assigned).length!==0)) &&
                      <p className='mb-2'>Salesman <span className='font-semibold'>{name}</span> has  <span className=' bg-red-500 text-white font-bold px-2 py-0.5 pb-1 mx-1 w-10 h-5 rounded-full'>{arrz?.length}</span> CRDs already!</p>}

                    {((role==='ratesmanager') && (track==='addCRD')) && arrz?.map((p,index)=>(
                      <div className='w-[95%] flex justify-between items-center' key={index}>
                        <div className='flex justify-start gap-2'>
                          <img src={user} alt='' className='w-8 h-8 bg-slate-600 rounded-full -p-4'/>
                          <p>{p}</p>
                        </div>
                        <svg fill="none" stroke="currentColor" onClick={()=>getCRDData(p,arrz)} className='w-7 h-7 cursor-pointer' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                        </svg>
                      </div>
                    ))}

                    {/* addCRD - By ratesmanager to salesman  ********************* */}
                    {((track==='addCRD') && (role==='ratesmanager')) && <div className='w-[96%] mt-4'><MultipleInputs data={(crds.filter(h=>!(salesmans.filter(t=>t._id===id)[0].assigned).includes(h.name)))} title="CRD name"  setData={setcrList} placeholder='Add CRDs here...'/></div> }

                    {/* addsalesman - By ratesmanager to shipper */}

                    {((staate==='YES') && (role==='ratesmanager') && (track==='addSalesman')) && <div className='w-[96%]'><Automan options={salesmans} title="Salesman name"  setSlData={setcName}/></div> }

                    {/* set new shipper as public by admin - pass to ratesmanager */}

                    {((staate==='NO') && (role==='admin')) && <p className='py-3 flex gap-3 px-8 font-semibold bg-white border-2 border-black shadow-md rounded-md'><svg fill="none" stroke="currentColor" className='w-6 h-6' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round"  stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
                        </svg>Continue as new shipper</p>}

                    
                </div>

            </div>

            {error!=='' && <p className='text-xs text-center text-red-600 mb-1'>{error}</p> }
     
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
        {/* </div> */}

    </div>

    
    )
}

export default AddAssigner