import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import QueryTile from '../../components/QueryTile'
import noData from '../../assets/noData.png'
import { useSelector } from 'react-redux'

var rlfinalizedFullCargo = []
//var http = "http://localhost:5000";  
//var http =  "https://cute-plum-caterpillar-tie.cyclic.app" 

const QueryList = () => {
    const [role, setRole] = useState('')
    const [name, setName] = useState('')

    const [frueryData, setFRueryData] = useState([])
    const [lrueryData, setLRueryData] = useState([])
    const [search, setSearch] = useState('')
    const [id, setID] = useState('')
    //const [rlfinalizedFullCargo,setRlFinalizedFullCargo] = useState([]);
    var http = process.env.REACT_APP_BASE_URL; 
  
    const loggedUser = useSelector((state)=> state.auth.value);

    useEffect(() => {
        setRole(loggedUser.role)
        setName(loggedUser.userName)
        setID(loggedUser.userID)

        const getRueries = ()=>{
          axios
          .get(`${http}/api/fclquery/user/${id}`)
          .then((res) => {
            //console.log(res.data);
            setFRueryData(res.data.user.fclqueries)
          })
          .catch(err=> {
            console.log(err);
          })     
  
          axios
          .get(`${http}/api/lclquery/user/${id}`)
          .then((res) => {
            //console.log(res.data);
            setLRueryData(res.data.user.lclqueries)
          })
          .catch(err=> {
            console.log(err);
          })   
        }
        getRueries();
   
    }, [id,http,loggedUser]);

    rlfinalizedFullCargo = [...frueryData, ...lrueryData];

    //console.log(rlfinalizedFullCargo);
    // console.log(typeof(rlfinalizedFullCargo));
    //console.log(typeof rlfinalizedFullCargo);


    
  return (
    <>
        <div className={`w-full h-screen flex overflow-hidden justify-end items-center text-black bg-white`}>               
            <div className='w-[100%] mdd:w-[90%] flex justify-start items-center h-full flex-col p-4 gap-3'>
               
                <div className='w-full h-full flex-col flex justify-start items-center gap-3'>

                    <div className="flex w-[82%] mt-[70px] justify-start fixed items-start">
                        <div className='w-[100%] flex justify-between items-center'>
                            <div className="flex items-center justify-center text-center gap-2">
                            <svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-10 h-10 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                            </svg>
                            <p className="text-xl sm:text-3xl text-black font-bold leading-none">Query list</p>
                            
                            </div>

                            
                            <div className="flex items-center justify-center text-center gap-2">
                                <FormControl sx={{ m: 1, minWidth: 150,borderRadius:2 }} size="small">
                                <InputLabel id="demo-select-small">Catogery</InputLabel>
                                <Select
                                    //value={catomode}
                                    label="Catogery"
                                    //onChange={(e)=>setCatomode(e.target.value)}
                                >
                                    <MenuItem value={"StatusWise"}>StatusWise</MenuItem>
                                    <MenuItem value={"Destination"}>Destination</MenuItem>
                                    <MenuItem value={"FCL/LCL"}>FCL/LCL</MenuItem>
                                    <MenuItem value={"MonthWise"}>MonthWise</MenuItem>

                                </Select>
                                </FormControl>
                            
                                <TextField label="Search" variant="outlined" size="small" className='border rounded-md py-1.5 mt-1 w-[300px]' value={search} onChange={(e)=>setSearch(e.target.value)}/>

                            </div>
                        </div>


                    </div>

                    {/* disabled={(frueryData?.filter(p=>p.receiver===name).filter(e=> e.status==="complete").length)===0} */}


                    <div className='w-[95%] mt-[140px] max-h-[510px] overflow-y-auto overflow-x-hidden mb-2'>
                    {rlfinalizedFullCargo.length!==0?

                        rlfinalizedFullCargo.sort((a,b)=> new Date(b.updatedAt) - new Date(a.updatedAt)).map((obj)=>(
                        <QueryTile key={obj._id}
                            OportName={obj.origin} 
                            DportName={obj.destination} 
                            containerMode={obj.containerMode}
                            cargos={obj.cargo} 
                            status={obj.status}
                            rDate={obj.rDate}
                            savedDate = {obj.createdAt}
                            id = {obj._id}
                            selVessel={obj.selVessel}
                            selShipLine = {obj.selShipLine}
                            layout = 'list'
                            commodity = {obj.commodity}
                            freight = {obj.freight}
                            //cutoff = {obj.cutoff[0]}
                            selVoyage={obj.selVoyage}
                            updatedDate = {obj.updatedAt}

                        />
                        )):
                        <>
                            <div className='flex justify-center flex-col items-center h-[500px] border-2 w-full rounded-md bg-gray-100 text-lg'>
                                <img src={noData} alt='' className='w-[300px]' />
                                <p>No relevant data here!</p>

                            </div>
                        </>
                        }
                    </div>
                </div>

            </div>


        </div>
    </>
  )
}

export default QueryList