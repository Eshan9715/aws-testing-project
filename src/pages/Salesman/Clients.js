import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Badge, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import DataTable from '../../components/Viewings/DataTable'
import { useSelector } from 'react-redux'

//var http = "http://localhost:5000";  
//var http =  "https://cute-plum-caterpillar-tie.cyclic.app" 

const Clients = () => {
    const loggedUser = useSelector(state=> state.auth.value);
    const [search, setSearch] = useState('')
    const [role, setRole] = useState('')
    
    const [tabmode, setTabmode] = useState('all')

    const [salescdetails, setsalescDetails] = useState([])
    const [crdcdetails, setcrdcDetails] = useState([])
    const [pencdetails, setpencDetails] = useState([])
    const [pubcdetails, setpubcDetails] = useState([])
    const [oldcdetails, setoldcDetails] = useState([])
    const [alldetails, setallDetails] = useState([])
    const [rattadetails, setrattaDetails] = useState([])

    const [loading,setLoading] = useState(false)

    var http = process.env.REACT_APP_BASE_URL;

    const [name, setName] = useState('')
    // const [id, setID] = useState('')

    const [catomode, setCatomode] = useState('')
    const [satomode, setSatomode] = useState('')

    useEffect(() => {
        setRole(loggedUser.role)
        setName(loggedUser.userName)
    }, [loggedUser]);

    useEffect(() => {
        //   axios
        //   .get(`${http}/api/user?assignedTo=pending`)
        //   .then((res) => {
        //     console.log(res.data);
        //     setpencDetails(res.data.users)
        //   })
        //   .catch(err=> {
        //     console.log(err);
        //   })     

        //   axios
        //   .get(`${http}/api/user?assignedTo=Public`)
        //   .then((res) => {
        //     console.log(res.data);
        //     setpubcDetails(res.data.users)
        //   })
        //   .catch(err=> {
        //     console.log(err);
        //   })    
        const getSUMClients = ()=>{
          setLoading(true)
          axios
          .get(`${http}/api/user`)
          .then((res) => {
            //console.log(res.data);
            setoldcDetails(res.data.users)
            setallDetails(oldcdetails.filter(e=> (e.assignedTo!=="pending")))
            setpubcDetails(oldcdetails.filter(e=> (e.assignedTo==="Public")))
            setpencDetails(oldcdetails.filter(e=> (e.assignedTo==="pending")))
            setrattaDetails(oldcdetails.filter(e=> (e.assignedTo!=="pending") && (e.assignedTo!=="Public")))
            setLoading(false)
            // ((oldcdetails.filter(e=> (e.assignedTo!=="pending"))).length===0 || (oldcdetails.filter(e=> (e.assignedTo==="Public"))).length===0 || (oldcdetails.filter(e=> (e.assignedTo==="pending"))).length===0 || 
            // (oldcdetails.filter(e=> (e.assignedTo!=="pending") && (e.assignedTo!=="Public"))).length===0) && setLoading(false)

          })
          .catch(err=> {
            console.log(err);
          })     

        }
        getSUMClients();
        
    }, [http,oldcdetails]);

    useEffect(() => {
        const getSalesClients = ()=>{
            setLoading(true)
            axios
            .get(`${http}/api/user?assignedTo=${name}`)
            .then((res) => {
              //console.log(res.data);
              setsalescDetails(res.data.users)
              setLoading(false)
            })
            .catch(err=> {
              console.log(err);
            })  
          }
  
          getSalesClients();
          
          const getCRDClients = ()=>{
            setLoading(true)
            axios
            .get(`${http}/api/user?assignedCRD=${name}`)
            .then((res) => {
              //console.log(res.data);
              setcrdcDetails(res.data.users)
              setLoading(false)
            })
            .catch(err=> {
              console.log(err);
            })   
          }  
  
          getCRDClients();
    }, [http,name]);



    // console.log(salescdetails)
    // console.log(crdcdetails)
    // console.log(pencdetails)
    // console.log(pubcdetails)
    // console.log(oldcdetails)


    const conditionalComponent2 = () => {
        if(tabmode==='pending' && role==='admin'){
            if(catomode==='Name') {
                return <DataTable role={role} loading={loading} tabmode={tabmode} term='clients' data={pencdetails?.filter((cdetail)=> search.toLowerCase()===''? cdetail :cdetail.name.toLowerCase().includes(search.toLowerCase()))} />;
            }else if(catomode==='CompanyName'){
                return <DataTable role={role} loading={loading} tabmode={tabmode} data={pencdetails?.filter((sdetail)=> search.toLowerCase()===''? sdetail :sdetail.companyName.toLowerCase().includes(search.toLowerCase()))} />;
            // }else if(catomode==="Assigned"){
            //     return <DataTable role={role} loading={loading} tabmode={tabmode} data={pencdetails?.filter((sdetail)=> sdetail.name).sort().reverse()} />; 
            // // }else if(satomode==="Max: Bookings"){
            // //     return <DataTable role={role} loading={loading} tabmode={tabmode} data={spdetails?.filter((sdetail)=> sdetail.bookings.length).sort().reverse()} />;
            // }else if(satomode==="Max: Clients"){
            //     return <DataTable role={role} loading={loading} tabmode={tabmode} data={spdetails?.filter((sdetail)=> sdetail.clients.length!==0? sdetail.clients.length.sort().reverse(): sdetail)} />;
            }else{
                return <DataTable role={role} loading={loading} term='clients' tabmode={tabmode} data={pencdetails} />;

            }
       }else if(tabmode==='Public' && role==='ratesmanager'){
            if(catomode==='Name') {
                return <DataTable role={role} loading={loading} tabmode={tabmode} term='clients'  data={pubcdetails?.filter((cdetail)=> search.toLowerCase()===''? cdetail :cdetail.name.toLowerCase().includes(search.toLowerCase()))} />;
            }else if(catomode==='CompanyName'){
                return <DataTable role={role} loading={loading} tabmode={tabmode} term='clients'  data={pubcdetails?.filter((cdetail)=> search.toLowerCase()===''? cdetail :cdetail.companyName.toLowerCase().includes(search.toLowerCase()))} />;
            // }else if(satomode==="Assigned"){
            //     return <DataTable role={role} loading={loading} tabmode={tabmode}  data={pubcdetails?.filter((crddetail)=> crddetail.name).sort().reverse()} />; 
            // }else if(satomode==="Max: Bookings"){
            //     return <DataTable role={role} loading={loading} tabmode={tabmode}  data={pubcdetails?.filter((crddetail)=> crddetail.bookings.length!==0? crddetail.bookings.length.sort().reverse(): crddetail)} />;
            // }else if(satomode==="Max: Clients"){
            //     return <DataTable role={role} loading={loading} tabmode={tabmode}  data={pubcdetails?.filter((crddetail)=> crddetail.clients.length!==0? crddetail.clients.length.sort().reverse(): crddetail)} />;
            }else{
                return <DataTable role={role} loading={loading} tabmode={tabmode} term='clients'  data={pubcdetails} />;
            }
       }else if(tabmode==='all' && ((role==='ratesmanager'))){
            if(catomode==='Name') {
                return <DataTable role={role} loading={loading} tabmode={tabmode} name={name} term='clients'  data={rattadetails.filter((cdetail)=> search.toLowerCase()===''? cdetail :cdetail.name.toLowerCase().includes(search.toLowerCase()))} />;
            }else if(catomode==='CompanyName'){
                return <DataTable role={role} loading={loading} tabmode={tabmode} name={name} term='clients'  data={rattadetails.filter((cdetail)=> search.toLowerCase()===''? cdetail :cdetail.companyName.toLowerCase().includes(search.toLowerCase()))} />;
            }else if(catomode==='Assigned'){
                return <DataTable role={role} loading={loading} tabmode={tabmode} name={name} term='clients'  data={rattadetails.filter((cdetail)=> search.toLowerCase()===''? cdetail :cdetail.assignedTo.toLowerCase().includes(search.toLowerCase()))} />;
            // }else if(satomode==="Assigned"){
            //     return <DataTable role={role} loading={loading} tabmode={tabmode} name={name} term='clients'  data={rattadetails.filter((crddetail)=> crddetail.name).sort().reverse()} />; 
            // }else if(satomode==="Max: Bookings"){
            //     return <DataTable role={role} loading={loading} tabmode={tabmode} name={name} term='clients'  data={rattadetails.filter((crddetail)=> crddetail.bookings.length!==0? crddetail.bookings.length.sort().reverse(): crddetail)} />;
            // }else if(satomode==="Max: Clients"){
            //     return <DataTable role={role} loading={loading} tabmode={tabmode} name={name} term='clients'  data={rattadetails.filter((crddetail)=> crddetail.clients.length!==0? crddetail.clients.length.sort().reverse(): crddetail)} />;
            }else{
                 return <DataTable role={role} loading={loading} tabmode={tabmode} name={name} term='clients'  data={rattadetails} />;
            }
        }else if(tabmode==='all' && (role==='admin')){
            if(catomode==='Name') {
                return <DataTable role={role} loading={loading} tabmode={tabmode} name={name} term='clients'  data={alldetails.filter((cdetail)=> search.toLowerCase()===''? cdetail :cdetail.name.toLowerCase().includes(search.toLowerCase()))} />;
            }else if(catomode==='CompanyName'){
                return <DataTable role={role} loading={loading} tabmode={tabmode} name={name} term='clients'  data={alldetails.filter((cdetail)=> search.toLowerCase()===''? cdetail :cdetail.companyName.toLowerCase().includes(search.toLowerCase()))} />;
            }else if(catomode==='Assigned'){
                return <DataTable role={role} loading={loading} tabmode={tabmode} name={name} term='clients'  data={alldetails.filter((cdetail)=> search.toLowerCase()===''? cdetail :cdetail.assignedTo.toLowerCase().includes(search.toLowerCase()))} />;
            // }else if(satomode==="Assigned"){
            //     return <DataTable role={role} loading={loading} tabmode={tabmode} name={name} term='clients'  data={alldetails.filter((crddetail)=> crddetail.name).sort().reverse()} />; 
            // }else if(satomode==="Max: Bookings"){
            //     return <DataTable role={role} loading={loading} tabmode={tabmode} name={name} term='clients'  data={alldetails.filter((crddetail)=> crddetail.bookings.length!==0? crddetail.bookings.length.sort().reverse(): crddetail)} />;
            // }else if(satomode==="Max: Clients"){
            //     return <DataTable role={role} loading={loading} tabmode={tabmode} name={name} term='clients'  data={alldetails.filter((crddetail)=> crddetail.clients.length!==0? crddetail.clients.length.sort().reverse(): crddetail)} />;
            }else{
                 return <DataTable role={role} loading={loading} tabmode={tabmode} name={name} term='clients'  data={alldetails} />;
            }
        }

        if(role==='salesman'){
            if(catomode==='Name') {
                return <DataTable role={role} loading={loading}  name={name} term='clients'  data={salescdetails?.filter((cdetail)=> search.toLowerCase()===''? cdetail :cdetail.name.toLowerCase().includes(search.toLowerCase()))} />;
            }else if(catomode==='CompanyName'){
                return <DataTable role={role} loading={loading}  name={name} term='clients'  data={salescdetails?.filter((cdetail)=> search.toLowerCase()===''? cdetail :cdetail.companyName.toLowerCase().includes(search.toLowerCase()))} />;
            }else if(catomode==='Assigned'){
                return <DataTable role={role} loading={loading}  name={name} term='clients'  data={salescdetails?.filter((cdetail)=> search.toLowerCase()===''? cdetail :cdetail.assignedTo.toLowerCase().includes(search.toLowerCase()))} />;
            }else{
                return <DataTable role={role} loading={loading}  name={name} term='clients'  data={salescdetails} />;
            }
        }

        if(role==='crd'){
            if(catomode==='Name') {
                return <DataTable role={role} loading={loading}  name={name} term='clients'  data={crdcdetails?.filter((cdetail)=> search.toLowerCase()===''? cdetail :cdetail.name.toLowerCase().includes(search.toLowerCase()))} />;
            }else if(catomode==='CompanyName'){
                return <DataTable role={role} loading={loading}  name={name} term='clients'  data={crdcdetails?.filter((cdetail)=> search.toLowerCase()===''? cdetail :cdetail.companyName.toLowerCase().includes(search.toLowerCase()))} />;
            }else if(catomode==='Assigned'){
                return <DataTable role={role} loading={loading}  name={name} term='clients'  data={crdcdetails?.filter((cdetail)=> search.toLowerCase()===''? cdetail :cdetail.assignedTo.toLowerCase().includes(search.toLowerCase()))} />;
            }else{
                return <DataTable role={role} loading={loading}  name={name} term='clients'  data={crdcdetails} />;
            }
        }
    }
    // console.log(cdetails?.filter(e=>((e.assignedTo!=="pending") && (e.assignedTo!=="Public"))))

  return (
    <div className={`w-full h-screen flex overflow-hidden justify-end items-center text-black bg-white`}>                  
       <div className='w-[100%] mdd:w-[90%] mt-[140px] flex justify-start items-center h-full flex-col p-4 gap-3'>   
           
            <div className='w-[95%]'>
                <div className='w-full flex justify-between items-center'>
                    <div className="flex min-w-[320px]">
                        {((role==='salesman') || (role==='crd')) && <h2 className='text-black font-bold text-3xl ml-1'>Clients</h2>}

                        {/* Tabs */}
                        {role==='admin' && 
                        <ul className="w-full flex -mb-px text-sm font-medium text-center gap-3" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                            
                            <li className="mr-2 py-1.5" role="presentation">
                            <Badge color='error' badgeContent={oldcdetails?.filter(e=> (e.assignedTo!=="pending")).length}>
                                <button onClick={()=>setTabmode("all")}  className={`inline-block ${tabmode==="all"? "bg-orange-500 text-white": 'bg-gray-500 text-white'} px-6 py-3 text-white rounded-md active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">All</button>
                            </Badge>
                            </li>    
                            <li className="mr-2 py-1.5" role="presentation">
                            <Badge color='error' badgeContent={pencdetails?.length}  >
                                <button onClick={()=>setTabmode("pending")}  className={`inline-block ${tabmode==="pending"? "bg-orange-500 text-white": 'bg-gray-500 text-white'} px-6 py-3 text-white rounded-md active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">New Shippers</button>
                            </Badge>
                            </li>
                                        
                        
                        </ul>}

                        {role ==='ratesmanager' && 
                        <ul className="w-[95%] flex flex-wrap -mb-px text-sm font-medium text-center gap-3" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                            
                            
                            <li className="mr-2 py-1.5" role="presentation">            
                            <button onClick={()=>setTabmode("all")}  className={`inline-block ${tabmode==='all'? "bg-orange-500 text-white": 'bg-gray-500 text-white'} px-6 py-3 text-white rounded-md active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Assigned<span className='ml-2 px-2 py-0.5 bg-white text-black font-semibold rounded-full w-10 h-8'>{rattadetails.length}</span></button>                           
                            </li>

                            <li className="mr-2 py-1.5" role="presentation">
                            <Badge color='error' badgeContent={pubcdetails?.length}  >
                                <button onClick={()=>setTabmode("Public")}  className={`inline-block ${tabmode==="Public"? "bg-orange-500 text-white": 'bg-gray-500 text-white'} px-6 py-3 text-white rounded-md active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">New Shippers</button>
                            </Badge>
                            </li>                
                        
                        </ul>}

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
                            <MenuItem value={"CompanyName"}>CompanyName</MenuItem>
                            <MenuItem value={"Assigned"}>Assigned</MenuItem>

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
                            <MenuItem value={"Name (Z-A)"}>Name (Z-A)</MenuItem>
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
                    
            {conditionalComponent2()}
               
        </div>
    </div>
     )
}

export default Clients