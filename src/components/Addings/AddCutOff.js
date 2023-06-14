import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { BasicDateTimePicker } from '../TextUI/BasicDateTimePicker'
import { useNavigate } from 'react-router-dom';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';

const AddCutOff = ({show,close,title,id,data}) => {
    const isURL = useSelector((state)=> state.url.isURL);
    var http = isURL;  

    const navigate = useNavigate();
    const [etdCol, setetdCol] = useState(null)
    const [fclClo, setfclClo] = useState(null)
    const [blClo, setblClo] = useState(null)
    const [vgmClo, setvgmClo] = useState(null)
  
    var CUTOFF = {
      ETDCOL:'',
      FCLCLO:'',
      BLCLO:'',
      VGMCLO:'',
    }

    const [Data, setData] = useState({});
    let ctf = []
    ctf.push(data)

    useEffect(() => {
      setData(data)
    }, [data]);

    console.log(Data)

    const sendRequest = async() =>{
        CUTOFF.ETDCOL = etdCol;
        CUTOFF.FCLCLO = fclClo;
        CUTOFF.BLCLO = blClo;
        CUTOFF.VGMCLO = vgmClo;
        // cutoffs.push(CUTOFF)
        // console.log(cutoffs)

        const addCUTOFF = { 
            cutoff: CUTOFF,
            // cutoffs.map((item) => ({
            //     ETDColombo: item.ETDCOL,
            //     FCLClosing: item.FCLCLO,
            //     BLClosing: item.BLCLO,
            //     VGMClosing: item.VGMCLO
            // })),
            id: id,
            status: 'b/l pending'

        }        
        axios
        .put(`${http}/api/fclquery/addCutOff/${id}`,addCUTOFF)
        .then((res) => {
          //console.log(res.data);
    
        //setlDetails(res.data.lines)
        navigate('/dashboard')
      });
  }

    const send = () =>{
      if(etdCol!==null && fclClo!==null && blClo!==null && vgmClo!==null ){
        sendRequest();
        close();
    }
  }

  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 bg-opacity-50 w-full z-20 flex justify-center items-center md:ml-20`}>
    <div className={`flex flex-col bg-white w-1/3 gap-4 rounded-lg shadow-lg`}>
    <h3 className='text-lg font-semibold text-center p-4 bg-sky-700 text-white'>{title}</h3>
    <div className='w-full flex justify-center items-center'>

        {ctf?.length===0 && 
        <div className='w-3/4 flex flex-col justify-center items-center gap-2'>

          <BasicDateTimePicker label={"B/L Cutoff"} setDateTime={setblClo}/>
          {blClo===null && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add B/L CutOff here!</p>}

          <BasicDateTimePicker label={"FCL Closing"} setDateTime={setfclClo}/>
          {fclClo===null && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add FCL Closing here!</p>}

          <BasicDateTimePicker label={"VGM Cutoff"} setDateTime={setvgmClo}/>
          {vgmClo===null && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add VGM CutOff here!</p>}

          <BasicDateTimePicker label={"ETD Colombo"} setDateTime={setetdCol}/>
          {etdCol===null && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add ETD Colombo here!</p>}

        </div>}

        {ctf?.length>0 && 
        <div className='w-3/4 flex flex-col justify-center items-center gap-2'>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label={'Add B/L CutOff here!'}
              value={Data?.BLCLO}
              minDate={new Date()}
              className='w-full'
              onChange={(newValue) => {
                setData({ ...Data, BLCLO: newValue })

              }}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label={'Add FCL Closing here!'}
              value={Data?.FCLCLO}
              minDate={new Date()}
              className='w-full'
              onChange={(newValue) => {
                // setValue(newValue);
                setData({ ...Data, FCLCLO: newValue })

              }}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label={'Add VGM CutOff here!'}
              value={Data?.VGMCLO}
              minDate={new Date()}
              className='w-full'
              onChange={(newValue) => {
                // setValue(newValue);
                setData({ ...Data, VGMCLO: newValue })

              }}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label={'Add ETD Colombo here!'}
              value={Data?.ETDCOL}
              minDate={new Date()}
              className='w-full'
              onChange={(newValue) => {
                // setValue(newValue);
                setData({ ...Data, ETDCOL: newValue })

              }}
            />
          </LocalizationProvider>

        </div>}

    </div>

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

</div>
  )
}

export default AddCutOff