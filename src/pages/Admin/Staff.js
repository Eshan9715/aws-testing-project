import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import DataTable from '../../components/Viewings/DataTable'
import AdminDataTable from '../../components/Viewings/AdminDataTable'
import { useSelector } from 'react-redux'

//var http = "http://localhost:5000";  
//var http =  "https://cute-plum-caterpillar-tie.cyclic.app" 

const Staff = () => {
  var http = process.env.REACT_APP_BASE_URL;
  
  const loggedUser = useSelector(state=> state.auth.value);

    const [sdetails, setsDetails] = useState([])
    const [search, setSearch] = useState('')
    const [catomode, setCatomode] = useState('')
    const [satomode, setSatomode] = useState('')

    const [tabmode, setTabmode] = useState('Salesman')

    const [spdetails, setspDetails] = useState([])
    const [crddetails, setcrdDetails] = useState([])
    const [othdetails, setothDetails] = useState([])
    const [role,setRole] = useState('')
    //const [loading,setLoading] = useState(false)

    useEffect(() => {
        setRole(loggedUser.role)
        const getStaff = ()=>{
            // setLoading(true)
          axios
          .get(`${http}/api/member`)
          .then((res) => {
            //console.log(res.data);
            setsDetails(res.data.member)
            setcrdDetails(sdetails.filter((e)=>e.role==="crd"))
            setspDetails(sdetails.filter((e)=>e.role==="salesman"))
            setothDetails(sdetails.filter((e)=>(e.role!=="salesman" && e.role!=="crd" )))

          })
          .catch(err=> {
            console.log(err);
          })  
        //   setLoading(false)   
        }
        getStaff();
        
    }, [sdetails,http,loggedUser]);

    const conditionalComponent = () => {
        if(tabmode==='Salesman'){
            if(catomode==='Name') {
                return <DataTable role={role}  tabmode={tabmode} data={spdetails?.filter((sdetail)=> search.toLowerCase()===''? sdetail :sdetail.name.toLowerCase().includes(search.toLowerCase()))} />;
            }else if(catomode==='Email'){
                return <DataTable role={role} tabmode={tabmode} data={spdetails?.filter((sdetail)=> search.toLowerCase()===''? sdetail :sdetail.email.toLowerCase().includes(search.toLowerCase()))} />;
            }else if(catomode==='Assigned'){
                return <DataTable role={role} tabmode={tabmode} data={spdetails?.filter((sdetail)=> search.toLowerCase()===''? sdetail :sdetail.assigned.includes(search.toLowerCase()))} />;
            }else if(satomode==="NameByDSC"){
                return <DataTable role={role} tabmode={tabmode} data={spdetails?.filter((sdetail)=> sdetail.name).sort().reverse()} />; 
            // }else if(satomode==="Max: Bookings"){
            //     return <DataTable role={role} tabmode={tabmode} data={spdetails?.filter((sdetail)=> sdetail.bookings.length).sort().reverse()} />;
            }else if(satomode==="Max: Clients"){
                return <DataTable role={role} tabmode={tabmode} data={spdetails?.filter((sdetail)=> sdetail.clients.length!==0? sdetail.clients.length.sort().reverse(): sdetail)} />;
            }else{
                return <DataTable role={role} tabmode={tabmode} data={spdetails} />;

            }
       }else if(tabmode==='CRD'){
            if(catomode==='Name') {
                return <DataTable role={role} tabmode={tabmode}  data={crddetails?.filter((crddetail)=> search.toLowerCase()===''? crddetail :crddetail.name.toLowerCase().includes(search.toLowerCase()))} />;
            }else if(catomode==='Email'){
                return <DataTable role={role} tabmode={tabmode}  data={crddetails?.filter((crddetail)=> search.toLowerCase()===''? crddetail :crddetail.email.toLowerCase().includes(search.toLowerCase()))} />;
            }else if(satomode==="NameByDSC"){
                return <DataTable role={role} tabmode={tabmode}  data={crddetails?.filter((crddetail)=> crddetail.name).sort().reverse()} />; 
            // }else if(satomode==="Max: Bookings"){
            //     return <DataTable role={role} tabmode={tabmode}  data={crddetails?.filter((crddetail)=> crddetail.bookings.length!==0? crddetail.bookings.length.sort().reverse(): crddetail)} />;
            }else if(satomode==="Max: Clients"){
                return <DataTable role={role} tabmode={tabmode}  data={crddetails?.filter((crddetail)=> crddetail.clients.length!==0? crddetail.clients.length.sort().reverse(): crddetail)} />;
            }else{
                return <DataTable role={role} tabmode={tabmode}  data={crddetails} />;
            }
       }else if(tabmode==='Others'){
            if(catomode==='Name') {
                return <AdminDataTable role={role}  data={othdetails?.filter((othdetail)=> search.toLowerCase()===''? othdetail :othdetail.name.toLowerCase().includes(search.toLowerCase()))} />;
            }else if(catomode==='Email'){
                return <AdminDataTable role={role}  data={othdetails?.filter((othdetail)=> search.toLowerCase()===''? othdetail :othdetail.email.toLowerCase().includes(search.toLowerCase()))} />;
            }else if(satomode==="NameByDSC"){
                return <AdminDataTable role={role}  data={othdetails?.filter((othdetail)=> othdetail.name).sort().reverse()} />;            
            }else{
                return <AdminDataTable role={role} data={othdetails}  />;
            }
        }
    }

  return (
    <>
        <div className={`w-full h-screen flex overflow-hidden justify-end items-center text-black bg-white`}>               
            <div className='w-[100%] mdd:w-[90%] flex justify-start items-center h-full flex-col p-4 gap-3'>              

                <div className='w-[95%] mt-[60px]'>
                    <div className='w-full flex justify-between items-center'>
                        <div className="my-2 flex">
                            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                            
                                <li className="mr-2 py-1.5" role="presentation">
                                    <button onClick={()=>setTabmode("Salesman")} className={`inline-block ${tabmode==="Salesman"? "bg-orange-500": 'bg-gray-500'} px-4 py-3 text-white rounded-lg active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Sales Persons<span className='ml-2 px-2 py-0.5 bg-white text-black font-semibold rounded-full w-10 h-8'>{spdetails.length}</span></button>
                                </li>
                                <li className="mr-2 py-1.5" role="presentation">
                                    <button onClick={()=>setTabmode("CRD")} className={`inline-block ${tabmode==="CRD"? "bg-orange-500": 'bg-gray-500'} px-4 py-3 text-white rounded-lg active`}id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">CRDs<span className='ml-2 px-2 py-0.5 bg-white text-black font-semibold rounded-full w-10 h-8'>{crddetails.length}</span></button>
                                </li>
                                {role==='admin' && <li className="mr-2 py-1.5" role="presentation">
                                    <button onClick={()=>setTabmode("Others")} className={`inline-block ${tabmode==="Others"? "bg-orange-500": 'bg-gray-500'} px-4 py-3 text-white rounded-lg active`} id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Others<span className='ml-2 px-2 py-0.5 bg-white text-black font-semibold rounded-full w-10 h-8'>{othdetails.length}</span></button>
                                </li>}
                                
                            </ul>

                        </div>
                    
                        <div className="flex items-center justify-center text-center gap-2">
                            <FormControl sx={{ m: 1, minWidth: 150,borderRadius:2 }} size="small">
                            <InputLabel id="demo-select-small">Catogery</InputLabel>
                            <Select
                                value={catomode}
                                label="Catogery"
                                onChange={(e)=>setCatomode(e.target.value)}
                                size='small'              
                            >                            
                                <MenuItem value={"Name"}>Name</MenuItem>
                                <MenuItem value={"Email"}>Email</MenuItem>
                                {/* <MenuItem value={"Assigned"}>Assigned</MenuItem> */}

                                {tabmode==="CRD" && <MenuItem value={"Assigned To"}>Assigned To</MenuItem>}

                            </Select>
                            </FormControl>

                            {catomode!=='' && <svg fill="none" onClick={()=>setCatomode("")} stroke="currentColor" stroke-width="1.5" className='w-5 h-5 cursor-pointer text-gray-400' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>}
                        
                            <TextField label="Search" variant="outlined" size="small"  
                                InputProps={{
                                endAdornment: <InputAdornment position="start">
                                    {search!=='' && <svg fill="none" onClick={()=>setSearch("")} stroke="currentColor" stroke-width="1.5" className='w-5 h-5 cursor-pointer text-gray-400' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>}
                                </InputAdornment>,
                                }}
                                className='border rounded-md py-1.5 mt-1 w-[150px]' value={search} onChange={(e)=>setSearch(e.target.value)}/>
                        </div>

                        <div className="flex items-center justify-center text-center gap-2">
                            <FormControl sx={{ m: 1, minWidth: 150,borderRadius:2 }} size="small">
                            <InputLabel id="demo-select-small">Sort by</InputLabel>
                            <Select
                                value={satomode}
                                label="Sort by"
                                onChange={(e)=>setSatomode(e.target.value)}
                                size='small'              
                            >                            
                                <MenuItem value={"NameByDSC"}>NameByDSC</MenuItem>
                                {/* <MenuItem value={"Max: Bookings"}>Max: Bookings</MenuItem> */}
                                {tabmode!=='Others' && <MenuItem value={"Max: Clients"}>Max: Clients</MenuItem>}
                            </Select>
                            </FormControl>

                            {satomode!=='' && <svg fill="none" onClick={()=>setSatomode("")} stroke="currentColor" stroke-width="1.5" className='w-5 h-5 cursor-pointer text-gray-400' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>}
                        
                        </div>
                    </div>
                </div> 

                {conditionalComponent()}
            </div>
        </div>
    </>                              
    )
}

export default Staff