import axios from 'axios';
import React, { useState,useEffect } from 'react'
import TextField from '@mui/material/TextField';
import dollar from '../../assets/dollar.png'
import {FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {RateTile} from '../../components/RateTile';
import { useSelector } from 'react-redux';

const ViewRates = () => {
  var http = process.env.REACT_APP_BASE_URL;

  const loggedUser = useSelector((state)=> state.auth.value);

    const [viewRates, setViewRates] = useState([])

    useEffect(() => {

      const getRates = ()=>{
        axios
        .get(`${http}/api/rate`)
        .then((res) => {
          console.log(res.data);
          setViewRates(res.data.rates)
        })
        .catch(err=> {
          console.log(err);
        })     
      }
      getRates();
      
  }, [http,loggedUser]);

    var validDate = null;

    const [search, setSearch] = useState('')
    const [catomode, setCatomode] = useState('Discharge')

    console.log(validDate)

  return (
    <>
     <div className={`w-full h-screen flex overflow-hidden justify-end items-center text-black bg-white`}>               
        <div className='w-[100%] mdd:w-[90%] flex justify-start items-center h-full flex-col p-4 gap-3'>

          <div className='w-full h-full flex flex-col justify-start items-center '>
              <div className='w-[82%]  mt-[70px]  flex justify-between items-center fixed'>
                <div className="flex items-center justify-center text-center gap-2">
                  <img src={dollar} alt='' className='w-[80px]' />
                  <p className="text-xl sm:text-3xl text-black font-bold leading-none">Rate Schedule</p>                 
                </div>

                <div className="flex items-center justify-center text-center gap-2">
                  <FormControl sx={{ m: 1, minWidth: 150,borderRadius:2 }} size="small">
                      <InputLabel id="demo-select-small">Catogery</InputLabel>
                      <Select
                        value={catomode}
                          label="Catogery"
                          onChange={(e)=>setCatomode(e.target.value)}
                      >
                      <MenuItem value={"Discharge"}>Discharge</MenuItem>
                        <MenuItem value={"Shipline"}>Shipline</MenuItem>
                        <MenuItem value={"Shipping mode"}>Shipping mode</MenuItem>
                        <MenuItem value={"Destination"}>Destination</MenuItem>
                      </Select>
                    </FormControl>
                  
                    <TextField label="Search" variant="outlined" size="small" className='border rounded-md py-1.5 mt-1 w-[300px]' value={search} onChange={(e)=>setSearch(e.target.value)}/>

                </div>
              </div>

              <div className='w-[95%] mt-[140px] flex flex-col justify-between items-center overflow-y-auto overflow-x-hidden'>

                  <div className='w-full flex flex-col'>
                    {catomode==='Discharge'?  
                    <>
                    {viewRates?.filter((rat)=> search.toLowerCase()===''? rat: rat.discharge.toLowerCase().includes(search.toLowerCase())).map((rat)=>{
                      return(
                      <RateTile key={rat._id} 
                          origin={rat.origin}
                          destination={rat.destination}
                          discharge={rat.discharge}
                          vdate={rat.validDate}
                          shipline={rat.shipline}
                          deliveryMode={rat.deliveryMode}
                          rates={rat.rates}
                          remarks={rat.remarks}
                          zipcode={rat.zipCode}
                          id={rat._id}
                      />
                    )})} 
                    </> 
                    : 
                    catomode==='Shipline'? 
                    <>
                    {viewRates?.filter((rat)=> search.toLowerCase()===''? rat: rat.shipline.toLowerCase().includes(search.toLowerCase())).map((rat)=>{
                      return(
                      <RateTile key={rat._id} 
                          origin={rat.origin}
                          destination={rat.destination}
                          discharge={rat.discharge}
                          vdate={rat.validDate}
                          shipline={rat.shipline}
                          deliveryMode={rat.deliveryMode}
                          rates={rat.rates}
                          remarks={rat.remarks}
                          zipcode={rat.zipCode}
                          id={rat._id}

                      />
                    )})} 
                    </> 
                    : 
                    catomode==='Shipping mode'? 
                    <>
                    {viewRates?.filter((rat)=> search.toLowerCase()===''? rat: rat.deliveryMode.toLowerCase().includes(search.toLowerCase())).map((rat)=>{
                      return(
                      <RateTile key={rat._id} 
                          origin={rat.origin}
                          destination={rat.destination}
                          discharge={rat.discharge}
                          vdate={rat.validDate}
                          shipline={rat.shipline}
                          deliveryMode={rat.deliveryMode}
                          rates={rat.rates}
                          remarks={rat.remarks}
                          zipcode={rat.zipCode}
                          id={rat._id}

                      />
                    )})} 
                    </> 
                    : 
                    catomode==='Destination'? 
                    <>
                    {viewRates?.filter((rat)=> search.toLowerCase()===''? rat: rat.destination.toLowerCase().includes(search.toLowerCase())).map((rat)=>{
                      return(
                      <RateTile key={rat._id} 
                          origin={rat.origin}
                          destination={rat.destination}
                          discharge={rat.discharge}
                          vdate={rat.validDate}
                          shipline={rat.shipline}
                          deliveryMode={rat.deliveryMode}
                          rates={rat.rates}
                          remarks={rat.remarks}
                          zipcode={rat.zipCode}
                          id={rat._id}

                      />
                    )})} 
                    </> 
                    :  
                    <>
                    {viewRates.map((rat)=>{
                      return(
                      <RateTile key={rat._id} 
                          origin={rat.origin}
                          destination={rat.destination}
                          discharge={rat.discharge}
                          vdate={rat.validDate}
                          shipline={rat.shipline}
                          deliveryMode={rat.deliveryMode}
                          rates={rat.rates}
                          remarks={rat.remarks}
                          zipcode={rat.zipCode}
                          id={rat._id}

                      />
                    )})} 
                    </>
                    }
                  </div>               
              </div>
          </div>
        </div>

    </div>
    </> 
    
  )
}

export default ViewRates


