import React, { useEffect, useRef, useState } from 'react'
import vessel from '../assets/ship.png'
import RateBox from '.././components/Viewings/RateBox'
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import { useSelector } from 'react-redux'

export const RateTile = ({vdate,origin,destination,discharge,zipcode,shipline,rates,deliveryMode,remarks,id}) => {
  const[show, setShow] = useState(false)
  const[editRateSch, setEditRateSch] = useState(false)
  // const[delRate, setDelRate] = useState(false)
  const [ldetails, setlDetails] = useState([])
  var http = process.env.REACT_APP_BASE_URL;
  console.log(id)

  const loggedUser = useSelector((state)=> state.auth.value);

  useEffect(() => {
    const getLines = ()=>{
      axios
      .get(`${http}/api/line`)
      .then((res) => {
        console.log(res.data);
        setlDetails(res.data.lines)
      })
      .catch(err=> {
        console.log(err);
      })     
    }
    getLines();
    
}, [http,loggedUser]);
  const arr = remarks.split(".");
  var len = remarks.split(".").length;
  arr.splice(len-1,1)
  
  console.log(arr)

  const DelRate = (key)=>{
    axios.delete(`${http}/api/rate/${key}`)  
      .then(res => {  
        console.log(res);  
        console.log(res.data);
  })
  window.location.reload(false)

}

    const OportKeys = origin.split(",");
    const DportKeys = discharge.split(",");
    console.log(OportKeys)
    console.log(DportKeys)

  return (
    <div className="w-[100%] flex flex-col p-2.5 bg-white border shadow-md rounded-md mt-3 mb-2">
         <div className='w-full flex justify-center items-center'>
            <div className='w-[90%] flex flex-col'>
              <div className='w-full flex justify-between flex-row gap-2'>
               <div className='flex p-2'>
                  <div className='flex justify-center items-center gap-3'>
                      <span>{OportKeys[0]},</span>
                      <span>{OportKeys[1]}</span>
                      <img src={`https://flagcdn.com/20x15/${OportKeys[2].toLowerCase()}.png`} alt="flag" />
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mt-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <div className='flex justify-center items-center gap-2'>
                      <span>{DportKeys[0]},</span>
                      <span>{DportKeys[1]}</span>
                      <img src={`https://flagcdn.com/20x15/${DportKeys[2].toLowerCase()}.png`} alt="flag" />
                  </div>
                  <div className='flex py-2 px-6 shadow-md rounded-md border gap-2 mx-4'>
                    <img src={vessel} alt='' className='w-6 h-6'/>
                    <p className='text-center'>{shipline}</p>
                  </div>
               </div>

               <div className='flex justify-between items-center'>
                 <button onClick={()=>setShow(!show)}
                    className={`flex ${show? "border-2 text-black bg-white rounded-md border-black":"bg-blue-800 text-white"} items-center justify-center max-w-[250px] px-4 py-2 text-base tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`}>
                    <span>Rates & Remarks</span>

                    {show && <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5 mt-1 ml-2' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"></path>
                    </svg>}
                    {!show &&<svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5 mt-1 ml-2' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                    </svg>}
                  </button>                   
               </div>
                   
              </div>

              <div className='w-full flex justify-between items-center'>
                <div className='flex justify-start items-center gap-12 ml-1'>
                  <div className='flex justify-center items-center gap-1.5'>

                  <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-6 h-6 mt-1' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"></path>
                  </svg>
                  <h3>{deliveryMode}</h3>
                  {(destination || zipcode) && <RateBox item='rate' destination={destination} zipcode={zipcode}/>}

                  </div>

                  <div className='flex justify-center items-center gap-1.5'>
                  {/* {destination && 
                  <>
                  <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-6 h-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path>
                  </svg>
                
                  <p>{destination}</p>
                  </>
                  } */}
                  <div className='flex justify-center items-center ml-4 gap-1.5'>
                  {/* {zipcode && 
                  <>
                  <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-6 h-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z"></path>
                  </svg>
                  <p>{zipcode}</p>
                  </>
                  } */}
                  </div>
                
                  </div>
                  

                </div>
                <div className='flex justify-start items-start gap-2'>
                  <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-6 h-6 mt-1.5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"></path>
                  </svg>                     
                  <h3 className='text-sm text-gray-500 mt-2'>Valid until:</h3>
                  <p className='mt-2 text-[14px]'>{vdate}</p>                
                </div>
              </div>
              

            </div>
            <div className='w-[10%]'>
              <div className='flex flex-col justify-center items-end mr-2 gap-2'>
           
                <svg fill="none" stroke="currentColor" stroke-width="1.5" onClick={()=>setEditRateSch(true)} className='w-10 h-10 cursor-pointer p-2.5 bg-blue-500 rounded-md text-white font-bold' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                </svg>
                <svg fill="none" stroke="currentColor" stroke-width="1.5" onClick={()=>DelRate(id)} className='w-10 h-10 p-2.5 cursor-pointer bg-red-500 rounded-md text-white font-bold' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                </svg>

              </div>

            </div>
         </div>

         {show && 
         <>
            <div className='h-0.5 bg-gray-300 w-full my-1 px-4'></div>
            <div className='w-full flex justify-center items-center'>
                <div className='w-1/2 flex justify-center items-start flex-col px-4'>
                <p className=' font-semibold my-2'>Rates:</p>
                {rates.map((rat,index)=>(
                    <div className='w-full flex justify-start items-center gap-x-20 gap-y-2' key={index}>
                      <div className='flex justify-start items-center gap-3'>
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"></path>
                        </svg>
                        <p>{rat.containerType}</p>

                      </div>
                  
                      <p>$ {rat.rate}</p>

                    </div>
                ))}

                </div>

                <div className='w-1/2 flex justify-center items-start flex-col px-4'>
                  <p className=' font-semibold my-2'>Remarks:</p>
                  {arr.map((remark,index)=>(
                    <div className='w-full flex justify-start items-center gap-x-4 gap-y-2' key={index}>
                      <p className='text-sm text-justify'>* {remark}.</p>
                    </div>
                  ))}
                </div>
            </div>
         </>
         }

        <EditRatesSchedule show={editRateSch} title='Edit rates' id={id} validDate={vdate} ldetails={ldetails} rates={rates} close={()=>setEditRateSch(false)} options={ldetails} val={shipline} handleShipline={e=> e.target.value}/>

    </div>
  )
}

export const EditRatesSchedule = ({show,close,title,id,rates,placeholder,ldetails,val,validDate,label1}) => {
  const ref1 = useRef();
  const [shipVal, setShipVal] = useState(val)
  const [fetchDate, setfetchDate] = useState(validDate)
  const [rateVal, setrateVal] = useState(rates)
  var http = process.env.REACT_APP_BASE_URL;

  // const UPDATEDRAT = {
  //   ship:'',
  //   validD: null,
  //   rates: []
  // }
  console.log(id)

  const send = ()=>{
    // UPDATEDRAT.ship = shipVal
    // UPDATEDRAT.validD = fetchDate
    // UPDATEDRAT.rates = rateVal
    const EdittedRate = {
      shipline: shipVal,
      validDate: fetchDate,
      rates: rateVal

      // editRates: UPDATEDRAT
    }
    //console.log(UPDATEDRAT)

    axios
    .put(`${http}/api/rate/update/${id}`,EdittedRate)
    .then((res) => {
      console.log(res.data);
    });

    //navigate("/viewrates")
    //window.location.reload(false)

  }

  let objectDate = new Date();

  let day = objectDate.getDate();

  let month = objectDate.getMonth();

  let year = objectDate.getFullYear();

  //let format3 = `${year}-${month+1}-${day}`
  let Imonth = month>9? (month+1) : `0${(month+1)}`

  let format4 = `${year}-${Imonth}-${day}`
  console.log(val)

  // const updateState = (index) => (e) => {
  //   const newArray = rateVal.map((item, i) => {
  //     if (index === i) {
  //       return { ...item, [e.target.name]: e.target.value };
  //     } else {
  //       return item;
  //     }
  //   });
  //   setrateVal(newArray);
  // };

  const updateState = index => e => {
    //console.log('index: ' + index);
    //console.log('property name: '+ e.target.name);
    let newArr = [...rateVal]; // copying the old datas array
    // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
    newArr[index].rate = e.target.value; // replace e.target.value with whatever you want to change it to
  
    setrateVal(newArr);
  }
  //https://stackoverflow.com/questions/55987953/how-do-i-update-states-onchange-in-an-array-of-object-in-react-hooks

  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 bg-opacity-50 w-full z-20 flex justify-center items-center md:ml-20`}>
    <div className={`flex flex-col bg-white max-w-screen-md gap-4 rounded-lg shadow-lg`}>
      <h3 className='text-lg font-semibold text-center p-2 bg-sky-700 text-white'>{title}</h3>
      <div className='w-full flex flex-col justify-center items-center p-4'>
        
      <div className='w-full flex justify-between items-center'>
        <div className='flex justify-center items-center'>
          <p className="min-w-[100px] text-[13.5px] font-semibold">Shipline:</p>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Line</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={shipVal}
              label="Age"
              className='w-[250px]'
              onChange={e=> setShipVal(e.target.value)}
            >
             {ldetails.map((r,index)=>
                <MenuItem value={r.LineName} key={index}>{r.LineName}</MenuItem>
                )}
            </Select>
          </FormControl>
        </div>

        <div className='flex justify-center items-center'>
          <p className="min-w-[100px] text-[13.5px] font-semibold ml-4">Valid Until:</p>
          <input className="z-20 p-3 border rounded-md flex"
            type="text"
            onFocus={() => (ref1.current.type = "date")}
            onBlur={() => (ref1.current.type = "text")}      
            min={format4}
            ref={ref1}
            inputFormat="DD/MM/YYYY"
            value={fetchDate}
            placeholder={label1}
            onChange={e=> setfetchDate(e.target.value)}
          />
        </div>
      </div>

     

      <div className='w-full flex flex-col justify-center items-start my-4'>
        <p className="min-w-[100px] text-[13.5px] font-semibold mb-2">Rates</p>
        {rateVal.map((rat,index)=>
          <div className='w-full my-2'>
              <div className='flex flex-col gap-2 w-full justify-center items-start' key={index}>
                <div className='w-full flex justify-start items-center'>
                  <p className="min-w-[100px] text-[13.5px] font-semibold">{rat.containerType}</p>
                  <Box
                      component="form"
                      sx={{width: '50%'}}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField 
                        id="outlined-basic" 
                        variant="outlined" 
                        placeholder={placeholder}   
                        value={rat.rate}
                        className='w-full'
                        onChange={updateState(index)}/>
                    </Box>
                </div>

              
              </div>
          </div>
        )}
      </div>

          

      </div>

      <div className='flex w-full justify-center gap-5 items-center mb-2'>
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

    </div>
  )
}
